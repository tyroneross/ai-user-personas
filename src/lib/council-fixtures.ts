import type {
  PersonaAssignment,
  PersonaFinding,
  PersonaMeasurementPlan,
  PersonaReviewRun,
  PersonaSynthesis,
  OutcomeComparison,
  PromptVersion,
  RepoPersonaRoster,
  RosterPersona,
  RunEvent,
} from "./council";

const createdAt = "2026-06-09T19:37:40Z";

export const fixtureRosterPersonas: RosterPersona[] = [
  {
    id: "persona_ops-skeptic_a1b2c3d4",
    name: "Morgan Lee",
    lens: "operator",
    role: "RevOps lead",
    job_to_be_done: "Trust the weekly operating view without rebuilding it by hand.",
    decision_power: "Can block workflows that hide source data or create audit risk.",
    failure_modes: ["Untraceable claims", "Automation without review", "Dashboard drift"],
    evidence_expectations: ["Source URI for real records", "Confidence split", "Audit trail"],
    default_use_cases: ["ui_test", "decision", "architecture"],
  },
  {
    id: "persona_design-lead_b2c3d4e5",
    name: "Priya Shah",
    lens: "design",
    role: "Principal designer",
    job_to_be_done: "Defend design choices with persona claims that cite research.",
    decision_power: "Can reject UX decisions that cannot cite user evidence.",
    failure_modes: ["Stale persona decks", "Unlinked claims", "Subtle synthetic badges"],
    evidence_expectations: ["Claim-level evidence ids", "Real quotes", "Visible synthetic warning"],
    default_use_cases: ["ui_test", "research", "decision"],
  },
  {
    id: "persona_support-veteran_c3d4e5f6",
    name: "Dee Carter",
    lens: "support",
    role: "Senior support engineer",
    job_to_be_done: "Map escalations to patterns backed by real support evidence.",
    decision_power: "Can flag personas that ignore ticket reality.",
    failure_modes: ["Abstract archetypes", "No ticket samples", "No drift signal"],
    evidence_expectations: ["Support ticket snippets", "Coverage count", "Drift notes"],
    default_use_cases: ["ui_test", "research", "architecture"],
  },
  {
    id: "persona_competitive-intel-lead_d4e5f6a7",
    name: "Elena Martinez",
    lens: "revenue",
    role: "Market intelligence manager",
    job_to_be_done: "Keep competitive claims current, sourced, and segment-specific.",
    decision_power: "Can reject battlecard language without traceable source context.",
    failure_modes: ["Stale claims", "Competitor names omitted", "No freshness metadata"],
    evidence_expectations: ["Competitor name", "Observed date", "Approved-language status"],
    default_use_cases: ["competitive", "strategy", "decision"],
  },
  {
    id: "persona_pmm-switcher_e5f6a7b8",
    name: "Marcus Chen",
    lens: "product",
    role: "Product marketing lead",
    job_to_be_done: "Turn competitive losses into switching narratives buyers recognize.",
    decision_power: "Can block messaging that lacks switching-trigger evidence.",
    failure_modes: ["Generic grids", "No objection taxonomy", "No buyer segment"],
    evidence_expectations: ["Win-loss notes", "Buyer segment", "Objection taxonomy"],
    default_use_cases: ["competitive", "strategy", "prompt"],
  },
  {
    id: "persona_field-ae_f6a7b8c9",
    name: "Nadia Brooks",
    lens: "revenue",
    role: "Enterprise account executive",
    job_to_be_done: "Use persona evidence in live deals without overclaiming.",
    decision_power: "Can reject outputs that cannot be used safely in buyer conversations.",
    failure_modes: ["Overconfident claims", "No deal-stage context", "No approved response"],
    evidence_expectations: ["Deal stage", "Buyer role", "Approved language", "Evidence confidence"],
    default_use_cases: ["competitive", "decision", "strategy"],
  },
  {
    id: "persona_accessibility-reviewer_a7b8c9d0",
    name: "Asha Patel",
    lens: "risk",
    role: "Accessibility reviewer",
    job_to_be_done: "Find UI states that exclude keyboard, screen reader, or low-vision users.",
    decision_power: "Can block releases with inaccessible forms or warnings.",
    failure_modes: ["Color-only errors", "Unlabelled controls", "Weak focus states"],
    evidence_expectations: ["Affected component", "Expected ARIA behavior", "Keyboard path"],
    default_use_cases: ["ui_test", "architecture", "decision"],
  },
  {
    id: "persona_privacy-counsel_b8c9d0e1",
    name: "Tomas Rivera",
    lens: "risk",
    role: "Privacy and compliance counsel",
    job_to_be_done: "Expose privacy, disclosure, and PII risks in persona workflows.",
    decision_power: "Can require disclosure and data-handling changes before launch.",
    failure_modes: ["Hidden synthetic status", "PII leakage", "Unclear source rights"],
    evidence_expectations: ["Disclosure policy", "Data provenance", "PII handling note"],
    default_use_cases: ["decision", "research", "architecture"],
  },
  {
    id: "persona_first-week-pm_c9d0e1f2",
    name: "Jamie Park",
    lens: "product",
    role: "First-week product manager",
    job_to_be_done: "Create a trustworthy review without already knowing the evidence rules.",
    decision_power: "Can reveal onboarding gaps that cause low-trust persona creation.",
    failure_modes: ["No first-run guidance", "Single evidence entry", "No examples"],
    evidence_expectations: ["Inline explanation", "Example real vs synthetic evidence", "Readiness checklist"],
    default_use_cases: ["ui_test", "research", "prompt"],
  },
  {
    id: "persona_research-methodologist_d0e1f2a3",
    name: "Lena Fischer",
    lens: "data",
    role: "Research methodologist",
    job_to_be_done: "Separate evidence quality from synthesis quality before decisions.",
    decision_power: "Can downgrade or reject reviews without pre-registered measurement.",
    failure_modes: ["Blended confidence", "No predicted outcome", "No validity tracking"],
    evidence_expectations: ["Measurement plan", "Evidence confidence", "Synthesis confidence"],
    default_use_cases: ["research", "decision", "strategy"],
  },
];

export const fixtureCouncilRoster: RepoPersonaRoster = {
  schema_version: "1.0.0",
  id: "roster_ai-user-personas_20260609",
  repo_path: "/Users/tyroneross/dev/git-folder/AI User Personas",
  repo_slug: "ai-user-personas",
  source_summary:
    "Generated from persona fixtures, persona-lab workflow docs, and the haiku-scale-20260609-01 panel report.",
  personas: fixtureRosterPersonas,
  default_levels: {
    low: ["persona_design-lead_b2c3d4e5", "persona_research-methodologist_d0e1f2a3"],
    medium: [
      "persona_ops-skeptic_a1b2c3d4",
      "persona_design-lead_b2c3d4e5",
      "persona_support-veteran_c3d4e5f6",
      "persona_accessibility-reviewer_a7b8c9d0",
      "persona_research-methodologist_d0e1f2a3",
    ],
    high: fixtureRosterPersonas.map((persona) => persona.id),
  },
  generated_from: [
    "src/lib/fixtures.ts",
    "plugins/persona-lab/scripts/persona-plan.mjs",
    "councils/runs/haiku-scale-20260609-01/PANEL-REPORT.md",
  ],
  user_overrides: [],
  created_at: createdAt,
  updated_at: createdAt,
};

export const fixtureMeasurementPlan: PersonaMeasurementPlan = {
  schema_version: "1.0.0",
  id: "measurement_haiku-scale-20260609-01",
  run_id: "run_haiku-scale_20260609",
  decision_supported:
    "Decide whether AI User Personas should productize persona review councils and scale beyond 10 agents.",
  target_artifact: "AI User Personas workspace and persona-lab council workflow",
  success_signals: [
    "Independent personas converge on concrete product gaps",
    "Findings include evidence provenance and synthetic-disclosure requirements",
    "Rally lineage reconstructs all assignments",
  ],
  failure_signals: [
    "Findings are generic or cannot be mapped to implementation work",
    "Synthetic status is hidden or ambiguous",
    "Reviewer confidence blends evidence quality with synthesis quality",
  ],
  evidence_required: [
    "Panel report synthesis",
    "Per-persona artifact files",
    "Rally fact lineage",
  ],
  confidence_policy:
    "Track evidence confidence and synthesis confidence separately; downgrade findings with missing source detail.",
  synthetic_policy:
    "Disclose synthesized personas and mark synthetic-heavy outputs as draft until accepted.",
  reviewer_quality_gate:
    "High-depth runs require a measurement plan, dissent capture, and outcome tracking.",
  predicted_outcomes: [
    "Evidence provenance will be the primary trust gap",
    "High-depth runs need wave control before 100-agent scale",
  ],
  pre_registered_at: createdAt,
  updated_at: createdAt,
};

export const fixtureCouncilRun: PersonaReviewRun = {
  schema_version: "1.0.0",
  id: "run_haiku-scale_20260609",
  repo_path: "/Users/tyroneross/dev/git-folder/AI User Personas",
  request:
    "What would make this persona workspace more effective at producing useful, trustworthy synthetic-user feedback?",
  council_type: "ui_test",
  level: "high",
  target_artifacts: [
    "docs/architecture.md",
    "docs/data-contracts.md",
    "src/lib/fixtures.ts",
    "components/PersonaForm.tsx",
    "components/PersonaDetail.tsx",
  ],
  roster_id: fixtureCouncilRoster.id,
  persona_ids: fixtureRosterPersonas.map((persona) => persona.id),
  measurement_plan_id: fixtureMeasurementPlan.id,
  status: "complete",
  coordination_mode: "rally",
  created_at: createdAt,
  updated_at: createdAt,
};

export const fixtureAssignments: PersonaAssignment[] = fixtureRosterPersonas.map((persona, index) => ({
  schema_version: "1.0.0",
  id: `assignment_haiku-scale_20260609_p${String(index + 1).padStart(2, "0")}`,
  run_id: fixtureCouncilRun.id,
  persona_id: persona.id,
  model_tier: "haiku",
  status: "landed",
  output_path:
    index < 10
      ? `councils/runs/haiku-scale-20260609-01/p${String(index + 1).padStart(2, "0")}-${persona.name.toLowerCase().replace(/[^a-z]+/g, "-").replace(/-$/, "")}.json`
      : undefined,
  evidence_gaps: [],
  created_at: createdAt,
  updated_at: createdAt,
  started_at: createdAt,
  completed_at: createdAt,
}));

export const fixtureFindings: PersonaFinding[] = [
  {
    schema_version: "1.0.0",
    id: "finding_evidence-provenance_20260609",
    run_id: fixtureCouncilRun.id,
    assignment_id: "assignment_haiku-scale_20260609_p10",
    persona_id: "persona_research-methodologist_d0e1f2a3",
    severity: "critical",
    claim: "Evidence provenance is the primary effectiveness gap for persona reviews.",
    evidence_ids: [],
    source_uris: ["councils/runs/haiku-scale-20260609-01/PANEL-REPORT.md"],
    assumptions: [],
    evidence_confidence: 0.9,
    synthesis_confidence: 0.88,
    behavior_source: "mixed",
    is_synthetic_disclosed: true,
    recommended_action:
      "Require source_uri for real-source evidence and add claim-to-evidence links before high-stakes runs.",
    created_at: createdAt,
  },
  {
    schema_version: "1.0.0",
    id: "finding_synthetic-disclosure_20260609",
    run_id: fixtureCouncilRun.id,
    assignment_id: "assignment_haiku-scale_20260609_p08",
    persona_id: "persona_privacy-counsel_b8c9d0e1",
    severity: "high",
    claim: "Synthetic evidence needs explicit disclosure and visual weighting.",
    evidence_ids: [],
    source_uris: ["councils/runs/haiku-scale-20260609-01/PANEL-REPORT.md"],
    assumptions: [],
    evidence_confidence: 0.82,
    synthesis_confidence: 0.84,
    behavior_source: "synthesized",
    is_synthetic_disclosed: true,
    recommended_action:
      "Add behavior_source, is_synthetic_disclosed, and a structured warning for synthetic-heavy runs.",
    created_at: createdAt,
  },
  {
    schema_version: "1.0.0",
    id: "finding_measurement-plan_20260609",
    run_id: fixtureCouncilRun.id,
    assignment_id: "assignment_haiku-scale_20260609_p10",
    persona_id: "persona_research-methodologist_d0e1f2a3",
    severity: "high",
    claim: "Medium and high councils need pre-registered measurement plans to evaluate predictive validity.",
    evidence_ids: [],
    source_uris: ["councils/runs/haiku-scale-20260609-01/PANEL-REPORT.md"],
    assumptions: [],
    evidence_confidence: 0.86,
    synthesis_confidence: 0.86,
    behavior_source: "mixed",
    is_synthetic_disclosed: true,
    recommended_action:
      "Create PersonaMeasurementPlan records before launch and track outcomes against later real evidence.",
    created_at: createdAt,
  },
];

export const fixtureSynthesis: PersonaSynthesis = {
  schema_version: "1.0.0",
  id: "synthesis_haiku-scale-20260609-01",
  run_id: fixtureCouncilRun.id,
  top_findings: [
    "Evidence provenance is the dominant trust gap.",
    "Synthetic evidence needs visible disclosure and confidence weighting.",
    "High-depth councils need measurement plans and outcome tracking.",
  ],
  dissent_map: [
    "Business and research lenses converged on provenance; accessibility focused on form state and ARIA gaps.",
    "Scale-test findings supported a 20-agent wave but recommended waves for larger runs.",
  ],
  evidence_gaps: [
    "Per-claim source_uri is not yet required for existing persona records.",
    "Evidence confidence and synthesis confidence are not yet split in the persona schema.",
  ],
  confidence_downgrade_reasons: [
    "Several personas are synthesized for lens coverage.",
    "Current evidence items may summarize sources rather than link exact samples.",
  ],
  recommended_next_actions: [
    "Add council contracts and validation guards.",
    "Add coordination UI with synthetic-warning blocks.",
    "Add command-packet launch before live agent execution.",
  ],
  decision_recommendation:
    "Proceed with a native-first council workflow and defer Agent Builder-style export until after the app stores runs and findings.",
  created_at: createdAt,
  updated_at: createdAt,
};

export const fixtureRunEvents: RunEvent[] = [
  {
    schema_version: "1.0.0",
    id: "event_haiku-scale-20260609-01_complete",
    run_id: fixtureCouncilRun.id,
    operation: "panel_synthesis",
    actor: "rally",
    status_before: "synthesizing",
    status_after: "complete",
    outcome: "success",
    message: "10/10 Haiku reviewers landed with zero failures and 59 findings.",
    created_at: createdAt,
  },
];

export const fixturePromptVersions: PromptVersion[] = [
  {
    schema_version: "1.0.0",
    id: "prompt_native-high-persona-review_20260609",
    run_id: fixtureCouncilRun.id,
    family: "assignment",
    variant: "high",
    model_tier: "haiku",
    source: "native",
    prompt_path: "plugins/persona-lab/agents/persona-perspective-reviewer.md",
    score: {
      clarity: 0.82,
      constraints: 0.78,
      determinism: 0.74,
      completeness: 0.8,
      model_tier_fit: 0.86,
      evidence_discipline: 0.68,
    },
    changelog: ["Seeded from persona-lab high-depth panel workflow."],
    created_at: createdAt,
    updated_at: createdAt,
  },
  {
    schema_version: "1.0.0",
    id: "prompt_prompt-builder-high-persona-review_20260609",
    run_id: fixtureCouncilRun.id,
    family: "assignment",
    variant: "high",
    model_tier: "haiku",
    source: "prompt_builder",
    prompt_path: "prompt-builder:persona-review/high",
    score: {
      clarity: 0.9,
      constraints: 0.86,
      determinism: 0.82,
      completeness: 0.88,
      model_tier_fit: 0.84,
      evidence_discipline: 0.9,
    },
    changelog: ["Planned comparison lane for scored prompt discipline."],
    created_at: createdAt,
    updated_at: createdAt,
  },
];

export const fixtureOutcomeComparison: OutcomeComparison = {
  schema_version: "1.0.0",
  id: "outcome_haiku-scale-20260609-01",
  run_id: fixtureCouncilRun.id,
  prompt_builder_run_id: "prompt_prompt-builder-high-persona-review_20260609",
  coverage_notes: "10 reviewers produced 59 findings with converged trust, evidence, accessibility, and measurement themes.",
  evidence_quality_notes:
    "Baseline run found strong gaps: missing source_uri, no claim-to-evidence links, and blended confidence semantics.",
  actionability_notes:
    "Findings mapped directly into contracts, validation, future UI warning blocks, measurement plans, and command-packet launch controls.",
  cost_time_notes: "10 Haiku reviewers completed in roughly 7 minutes, about 463K tokens total, with no observed ledger contention.",
  reuse_notes:
    "Native app state remains source of truth. Prompt Builder and Agent Builder-style outputs should remain comparison/export lanes.",
  created_at: createdAt,
  updated_at: createdAt,
};
