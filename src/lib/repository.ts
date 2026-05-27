import type {
  Persona,
  PersonaCreateInput,
  PersonaExport,
  PersonaFilters,
  PersonaSummary,
  PersonaUpdateInput,
} from "./persona";
import { fixturePersonas } from "./fixtures";
import { personaId } from "./id";

/**
 * Repository contract from docs/architecture.md.
 * V1 ships a fixture adapter. A file-backed adapter (data/personas.json)
 * lands in the next pass and replaces this module without changing the UI.
 */
export type PersonaRepository = {
  listPersonas(filters?: PersonaFilters): Promise<PersonaSummary[]>;
  getPersona(id: string): Promise<Persona | null>;
  createPersona(input: PersonaCreateInput): Promise<Persona>;
  updatePersona(id: string, input: PersonaUpdateInput): Promise<Persona>;
  archivePersona(id: string): Promise<Persona>;
  exportPersonas(ids?: string[]): Promise<PersonaExport>;
};

const store: Persona[] = [...fixturePersonas];

function toSummary(p: Persona): PersonaSummary {
  return {
    id: p.id,
    status: p.status,
    name: p.name,
    archetype: p.archetype,
    role: p.role,
    summary: p.summary,
    primary_goal: p.primary_goal,
    confidence: p.confidence,
    tags: p.tags,
    updated_at: p.updated_at,
  };
}

function matches(p: Persona, filters: PersonaFilters): boolean {
  if (filters.status && filters.status.length > 0 && !filters.status.includes(p.status)) {
    return false;
  }
  if (filters.role && p.role.toLowerCase() !== filters.role.toLowerCase()) {
    return false;
  }
  if (typeof filters.minConfidence === "number" && p.confidence < filters.minConfidence) {
    return false;
  }
  if (filters.tags && filters.tags.length > 0) {
    const set = new Set(p.tags.map((t) => t.toLowerCase()));
    const wanted = filters.tags.map((t) => t.toLowerCase());
    if (!wanted.every((t) => set.has(t))) return false;
  }
  if (filters.sourceType && filters.sourceType.length > 0) {
    const present = new Set(p.evidence.map((e) => e.source_type));
    if (!filters.sourceType.some((t) => present.has(t))) return false;
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    const hay = [p.name, p.archetype, p.role, p.summary, p.primary_goal, ...p.tags]
      .join(" ")
      .toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
}

export const fixtureRepository: PersonaRepository = {
  async listPersonas(filters = {}) {
    return store
      .filter((p) => matches(p, filters))
      .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
      .map(toSummary);
  },
  async getPersona(id) {
    return store.find((p) => p.id === id) ?? null;
  },
  async createPersona(input) {
    const now = new Date().toISOString();
    const persona: Persona = {
      ...input,
      schema_version: "1.0.0",
      id: personaId(input.name),
      created_at: now,
      updated_at: now,
    };
    store.unshift(persona);
    return persona;
  },
  async updatePersona(id, input) {
    const idx = store.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error(`Persona ${id} not found`);
    const now = new Date().toISOString();
    const next = { ...store[idx], ...input, updated_at: now } as Persona;
    store[idx] = next;
    return next;
  },
  async archivePersona(id) {
    return this.updatePersona(id, { status: "archived" });
  },
  async exportPersonas(ids) {
    const subset = ids ? store.filter((p) => ids.includes(p.id)) : store;
    return { schema_version: "1.0.0", personas: subset };
  },
};

export const repository: PersonaRepository = fixtureRepository;
