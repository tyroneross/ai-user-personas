import "server-only";

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type {
  OutcomeComparison,
  PersonaFinding,
  PersonaMeasurementPlan,
  PersonaMeasurementPlanDraftInput,
  PersonaReviewBundle,
  PersonaReviewRun,
  PersonaReviewRunDraftInput,
  PersonaReviewRunFilters,
  PersonaReviewRunSummary,
  PersonaSynthesis,
  PromptVersion,
  RepoPersonaRoster,
  RepoPersonaRosterInput,
  RunEvent,
  RunStatusUpdateInput,
  ReviewRunStatus,
} from "./council";
import {
  createDefaultCouncilStore,
  createFixtureCouncilRepository,
  type CouncilRepository,
  type CouncilRepositoryStore,
} from "./council-repository";

type RosterFile = {
  schema_version: "1.0.0";
  rosters: RepoPersonaRoster[];
};

type RunsFile = {
  schema_version: "1.0.0";
  runs: PersonaReviewRun[];
  measurementPlans: PersonaMeasurementPlan[];
  assignments: CouncilRepositoryStore["assignments"];
  findings: PersonaFinding[];
  syntheses: PersonaSynthesis[];
  promptVersions: PromptVersion[];
  outcomeComparisons: OutcomeComparison[];
  events: RunEvent[];
};

const dataDir = path.join(process.cwd(), "data");
const rostersPath = path.join(dataDir, "council-rosters.json");
const runsPath = path.join(dataDir, "council-runs.json");

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await readFile(filePath, "utf8")) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return fallback;
    throw error;
  }
}

function defaultRosterFile(): RosterFile {
  return { schema_version: "1.0.0", rosters: createDefaultCouncilStore().rosters };
}

function defaultRunsFile(): RunsFile {
  const store = createDefaultCouncilStore();
  return {
    schema_version: "1.0.0",
    runs: store.runs,
    measurementPlans: store.measurementPlans,
    assignments: store.assignments,
    findings: store.findings,
    syntheses: store.syntheses,
    promptVersions: store.promptVersions,
    outcomeComparisons: store.outcomeComparisons,
    events: store.events,
  };
}

async function readStore(): Promise<CouncilRepositoryStore> {
  const rosterFile = await readJson<RosterFile>(rostersPath, defaultRosterFile());
  const runsFile = await readJson<RunsFile>(runsPath, defaultRunsFile());
  const seeded = createDefaultCouncilStore();
  return {
    rosters: rosterFile.rosters.length > 0 ? rosterFile.rosters : seeded.rosters,
    runs: runsFile.runs.length > 0 ? runsFile.runs : seeded.runs,
    measurementPlans:
      runsFile.measurementPlans.length > 0 ? runsFile.measurementPlans : seeded.measurementPlans,
    assignments: runsFile.assignments.length > 0 ? runsFile.assignments : seeded.assignments,
    findings: runsFile.findings.length > 0 ? runsFile.findings : seeded.findings,
    syntheses: runsFile.syntheses.length > 0 ? runsFile.syntheses : seeded.syntheses,
    promptVersions:
      runsFile.promptVersions.length > 0 ? runsFile.promptVersions : seeded.promptVersions,
    outcomeComparisons:
      runsFile.outcomeComparisons.length > 0
        ? runsFile.outcomeComparisons
        : seeded.outcomeComparisons,
    events: runsFile.events.length > 0 ? runsFile.events : seeded.events,
  };
}

async function writeJson(filePath: string, data: unknown): Promise<void> {
  await mkdir(dataDir, { recursive: true });
  const tempPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(tempPath, `${JSON.stringify(data, null, 2)}\n`);
  await rename(tempPath, filePath);
}

async function writeStore(store: CouncilRepositoryStore): Promise<void> {
  await writeJson(rostersPath, {
    schema_version: "1.0.0",
    rosters: store.rosters,
  } satisfies RosterFile);
  await writeJson(runsPath, {
    schema_version: "1.0.0",
    runs: store.runs,
    measurementPlans: store.measurementPlans,
    assignments: store.assignments,
    findings: store.findings,
    syntheses: store.syntheses,
    promptVersions: store.promptVersions,
    outcomeComparisons: store.outcomeComparisons,
    events: store.events,
  } satisfies RunsFile);
}

async function withRead<T>(fn: (repo: CouncilRepository) => Promise<T>): Promise<T> {
  const store = await readStore();
  return fn(createFixtureCouncilRepository(store));
}

async function withWrite<T>(fn: (repo: CouncilRepository) => Promise<T>): Promise<T> {
  const store = await readStore();
  const result = await fn(createFixtureCouncilRepository(store));
  await writeStore(store);
  return result;
}

export const fileCouncilRepository: CouncilRepository = {
  listRosters: () => withRead((repo) => repo.listRosters()),
  getRoster: (id) => withRead((repo) => repo.getRoster(id)),
  createRoster: (input: RepoPersonaRosterInput) => withWrite((repo) => repo.createRoster(input)),
  listRuns: (filters?: PersonaReviewRunFilters) => withRead((repo) => repo.listRuns(filters)),
  getRunBundle: (id: string) => withRead((repo) => repo.getRunBundle(id)),
  createRun: (input: PersonaReviewRunDraftInput, plan: PersonaMeasurementPlanDraftInput) =>
    withWrite((repo) => repo.createRun(input, plan)),
  updateRunStatus: (update: RunStatusUpdateInput) =>
    withWrite((repo) => repo.updateRunStatus(update)),
  addFinding: (finding: PersonaFinding) => withWrite((repo) => repo.addFinding(finding)),
  setSynthesis: (synthesis: PersonaSynthesis) => withWrite((repo) => repo.setSynthesis(synthesis)),
  listPromptVersions: (runId?: string) => withRead((repo) => repo.listPromptVersions(runId)),
  addPromptVersion: (prompt: PromptVersion) => withWrite((repo) => repo.addPromptVersion(prompt)),
  setOutcomeComparison: (comparison: OutcomeComparison) =>
    withWrite((repo) => repo.setOutcomeComparison(comparison)),
  appendRunEvent: (event: Omit<RunEvent, "schema_version" | "id" | "created_at">) =>
    withWrite((repo) => repo.appendRunEvent(event)),
};
