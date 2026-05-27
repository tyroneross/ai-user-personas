# AI User Personas Data Contracts

## Bottom Line

The first UI should build against one canonical `Persona` JSON contract plus a
thin repository/API boundary. The UI can use fixture data immediately, then swap
in persistence without changing component-level data assumptions.

Canonical schema:

- `schemas/persona.schema.json`

## Persona Entity

Required fields:

| Field | Type | Notes |
| --- | --- | --- |
| `schema_version` | string | Current value: `1.0.0`. |
| `id` | string | Stable id, format `persona_<slug>_<8hex>`. |
| `status` | enum | `draft`, `active`, or `archived`. |
| `name` | string | Display name for the persona. |
| `archetype` | string | Short persona category, for example `Operations skeptic`. |
| `role` | string | Job, user role, or audience role. |
| `summary` | string | One-paragraph overview. |
| `primary_goal` | string | Main outcome the user is trying to achieve. |
| `goals` | array | User goals, at least one item. |
| `frustrations` | array | User pains, at least one item. |
| `motivations` | array | Drivers behind behavior. |
| `behaviors` | array | Observed or inferred behavior patterns. |
| `needs` | array | Product needs or support needs. |
| `scenarios` | array | Contexts where this persona uses the product. |
| `evidence` | array | Source-backed evidence items, at least one item. |
| `confidence` | number | `0` to `1`. |
| `tags` | array | UI filtering and grouping labels. |
| `created_at` | string | ISO 8601 date-time. |
| `updated_at` | string | ISO 8601 date-time. |

Optional fields:

| Field | Type | Notes |
| --- | --- | --- |
| `quote` | string | Representative quote. |
| `channels` | array | Preferred communication or discovery channels. |
| `tech_comfort` | enum | `low`, `medium`, or `high`. |
| `decision_style` | enum | `fast`, `deliberate`, `consensus`, or `authority-led`. |
| `notes` | string | Internal working notes. |

## Evidence Item

Each evidence item explains why the persona exists.

Required fields:

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Stable id, format `evidence_<slug>_<8hex>`. |
| `source_type` | enum | `interview`, `survey`, `analytics`, `support`, `sales`, `desk_research`, or `synthetic`. |
| `summary` | string | What this evidence supports. |
| `confidence` | number | `0` to `1`. |

Optional fields:

| Field | Type | Notes |
| --- | --- | --- |
| `title` | string | Source title. |
| `source_uri` | string | Link or local reference. |
| `quote` | string | Short source excerpt or paraphrase. |
| `observed_at` | string | ISO 8601 date-time. |

Synthetic evidence is allowed for early prototyping, but it must be labeled with
`source_type: "synthetic"` so UI and exports can distinguish it from real
research.

## Persona Summary

List views should not require full persona payloads.

```ts
type PersonaSummary = Pick<
  Persona,
  | "id"
  | "status"
  | "name"
  | "archetype"
  | "role"
  | "summary"
  | "primary_goal"
  | "confidence"
  | "tags"
  | "updated_at"
>;
```

## Filters

```ts
type PersonaFilters = {
  search?: string;
  status?: Array<"draft" | "active" | "archived">;
  tags?: string[];
  role?: string;
  minConfidence?: number;
  sourceType?: Array<
    "interview" | "survey" | "analytics" | "support" | "sales" | "desk_research" | "synthetic"
  >;
};
```

## Repository Contract

```ts
type PersonaRepository = {
  listPersonas(filters?: PersonaFilters): Promise<PersonaSummary[]>;
  getPersona(id: string): Promise<Persona | null>;
  createPersona(input: PersonaCreateInput): Promise<Persona>;
  updatePersona(id: string, input: PersonaUpdateInput): Promise<Persona>;
  archivePersona(id: string): Promise<Persona>;
  exportPersonas(ids?: string[]): Promise<PersonaExport>;
};
```

Create and update inputs should accept editable fields only. The repository owns
`id`, `schema_version`, `created_at`, and `updated_at`.

## Storage Contract

V1 should use local file-backed JSON once persistence is implemented.

Storage path:

- `data/personas.json`

Shape:

```json
{
  "schema_version": "1.0.0",
  "personas": []
}
```

Rules:

- `personas` contains canonical `Persona[]` records.
- Writes should validate each persona against `schemas/persona.schema.json`.
- Updates should replace one persona by `id`, not rewrite ids.
- Archive should set `status: "archived"` and update `updated_at`.
- The UI may use static fixture data before this file exists.

ID rules:

- Persona ids: `persona_<slug>_<8hex>`.
- Evidence ids: `evidence_<slug>_<8hex>`.
- Slugs are lowercase, hyphen-separated, and derived from display text.
- The hex suffix is generated at creation time and remains stable.

## HTTP Contract

If the app uses API routes, use these shapes.

### `GET /api/personas`

Query parameters:

- `search`
- `status`
- `tag`
- `role`
- `minConfidence`
- `sourceType`

Response:

```json
{
  "personas": []
}
```

`personas` contains `PersonaSummary[]`.

### `POST /api/personas`

Request body:

```json
{
  "persona": {}
}
```

`persona` contains `PersonaCreateInput`.

Response:

```json
{
  "persona": {}
}
```

`persona` contains the created `Persona`.

### `GET /api/personas/:id`

Response when found:

```json
{
  "persona": {}
}
```

Response when missing:

```json
{
  "error": {
    "code": "not_found",
    "message": "Persona not found."
  }
}
```

### `PUT /api/personas/:id`

Request body:

```json
{
  "persona": {}
}
```

`persona` contains `PersonaUpdateInput`.

Response:

```json
{
  "persona": {}
}
```

### `DELETE /api/personas/:id`

Archives the persona in V1.

Response:

```json
{
  "persona": {}
}
```

### Error Shape

```ts
type ApiError = {
  error: {
    code: "validation_error" | "not_found" | "conflict" | "repository_error";
    message: string;
    fields?: Record<string, string>;
  };
};
```

## Example Persona

```json
{
  "schema_version": "1.0.0",
  "id": "persona_ops-skeptic_a1b2c3d4",
  "status": "active",
  "name": "Morgan Lee",
  "archetype": "Operations skeptic",
  "role": "RevOps lead",
  "summary": "Morgan wants automation that reduces manual reporting work without hiding the source data or creating brittle workflows.",
  "primary_goal": "Trust the weekly operating view without rebuilding it by hand.",
  "goals": [
    "Reduce recurring spreadsheet cleanup",
    "Give leadership a reliable view of pipeline health"
  ],
  "frustrations": [
    "AI summaries that cannot cite the underlying record",
    "Dashboards that drift from the source system"
  ],
  "motivations": [
    "Protect forecast accuracy",
    "Save time without losing auditability"
  ],
  "behaviors": [
    "Checks source records before sharing executive updates",
    "Prefers reversible workflow changes"
  ],
  "needs": [
    "Visible provenance",
    "Draft review before automation takes action"
  ],
  "scenarios": [
    {
      "title": "Weekly forecast review",
      "description": "Morgan reviews AI-generated account risk notes before the Monday leadership meeting."
    }
  ],
  "evidence": [
    {
      "id": "evidence_forecast-review_a1b2c3d4",
      "source_type": "synthetic",
      "title": "Initial product hypothesis",
      "summary": "Persona seeded from the product thesis for audit-friendly AI workflows.",
      "confidence": 0.45
    }
  ],
  "confidence": 0.45,
  "tags": ["operations", "forecasting", "auditability"],
  "channels": ["Slack", "email", "CRM dashboard"],
  "tech_comfort": "high",
  "decision_style": "deliberate",
  "notes": "Replace synthetic evidence with interview data when available.",
  "created_at": "2026-05-27T06:20:00Z",
  "updated_at": "2026-05-27T06:20:00Z"
}
```

## UI Requirements From The Contract

Claude should implement the first shell with these assumptions:

- List cards need `name`, `archetype`, `role`, `summary`, `primary_goal`,
  `confidence`, `status`, and `tags`.
- Detail pages need grouped sections for overview, goals, frustrations,
  motivations, behaviors, needs, scenarios, evidence, and notes.
- Editor fields should handle repeatable string lists and repeatable scenarios.
- Evidence entry is required before a persona can become active.
- The UI should visually distinguish synthetic evidence from real research.
- Archive should be available, but hard delete should not be prominent in V1.
- Empty state should guide the user to create or import the first persona.
- Validation errors should keep unsaved form data intact.
