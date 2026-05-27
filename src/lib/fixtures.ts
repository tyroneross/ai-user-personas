import type { Persona } from "./persona";

/**
 * Static fixture personas for the first UI build.
 * Each record validates against schemas/persona.schema.json.
 */
export const fixturePersonas: Persona[] = [
  {
    schema_version: "1.0.0",
    id: "persona_ops-skeptic_a1b2c3d4",
    status: "active",
    name: "Morgan Lee",
    archetype: "Operations skeptic",
    role: "RevOps lead",
    summary:
      "Morgan wants automation that reduces manual reporting work without hiding the source data or creating brittle workflows.",
    primary_goal: "Trust the weekly operating view without rebuilding it by hand.",
    goals: [
      "Reduce recurring spreadsheet cleanup",
      "Give leadership a reliable view of pipeline health",
    ],
    frustrations: [
      "AI summaries that cannot cite the underlying record",
      "Dashboards that drift from the source system",
    ],
    motivations: ["Protect forecast accuracy", "Save time without losing auditability"],
    behaviors: [
      "Checks source records before sharing executive updates",
      "Prefers reversible workflow changes",
    ],
    needs: ["Visible provenance", "Draft review before automation takes action"],
    scenarios: [
      {
        title: "Weekly forecast review",
        description:
          "Morgan reviews AI-generated account risk notes before the Monday leadership meeting.",
      },
    ],
    evidence: [
      {
        id: "evidence_forecast-review_a1b2c3d4",
        source_type: "synthetic",
        title: "Initial product hypothesis",
        summary:
          "Persona seeded from the product thesis for audit-friendly AI workflows.",
        confidence: 0.45,
      },
    ],
    confidence: 0.45,
    tags: ["operations", "forecasting", "auditability"],
    quote: "Show me the row this came from.",
    channels: ["Slack", "email", "CRM dashboard"],
    tech_comfort: "high",
    decision_style: "deliberate",
    notes: "Replace synthetic evidence with interview data when available.",
    created_at: "2026-05-27T06:20:00Z",
    updated_at: "2026-05-27T06:20:00Z",
  },
  {
    schema_version: "1.0.0",
    id: "persona_design-lead_b2c3d4e5",
    status: "draft",
    name: "Priya Shah",
    archetype: "Design systems lead",
    role: "Principal designer",
    summary:
      "Priya needs a single source of truth for personas so design reviews stop relitigating who we are building for.",
    primary_goal: "Cut the time spent re-explaining target users in every review.",
    goals: [
      "Make personas discoverable inside design tools",
      "Tie persona quotes to real research clips",
    ],
    frustrations: [
      "Persona decks that go stale in two quarters",
      "No way to cite a persona claim in a Figma file",
    ],
    motivations: ["Ship designs that hold up to user research", "Defend design choices with data"],
    behaviors: ["Anchors every critique in a user need", "Pushes back on unsourced opinions"],
    needs: ["Linkable persona records", "Confidence levels per claim"],
    scenarios: [
      {
        title: "Design review citation",
        description:
          "Priya pastes a persona link into a Figma comment to justify a copy change.",
      },
    ],
    evidence: [
      {
        id: "evidence_design-survey_b2c3d4e5",
        source_type: "survey",
        title: "Q1 design team survey",
        summary:
          "Eleven of fourteen designers said persona decks become unreliable after a single planning cycle.",
        confidence: 0.7,
      },
    ],
    confidence: 0.6,
    tags: ["design", "research", "citations"],
    quote: "If I can't link to it, it doesn't exist.",
    tech_comfort: "high",
    decision_style: "consensus",
    created_at: "2026-05-27T06:21:00Z",
    updated_at: "2026-05-27T06:21:00Z",
  },
  {
    schema_version: "1.0.0",
    id: "persona_support-veteran_c3d4e5f6",
    status: "active",
    name: "Dee Carter",
    archetype: "Frontline support veteran",
    role: "Senior support engineer",
    summary:
      "Dee handles escalations and wants persona notes that map to the kinds of tickets they actually see, not abstract archetypes.",
    primary_goal: "Cut average time-to-context on escalated tickets.",
    goals: [
      "Match incoming tickets to a known persona pattern",
      "Capture new patterns before they become repeat incidents",
    ],
    frustrations: [
      "Personas that ignore the angry-customer edge case",
      "Tribal knowledge that lives only in Slack threads",
    ],
    motivations: ["Defend the team from repeat fires", "Make onboarding faster"],
    behaviors: ["Tags tickets by suspected persona", "Writes postmortems from support data"],
    needs: ["Evidence pulled from real ticket samples", "A way to flag persona drift"],
    scenarios: [
      {
        title: "Escalation triage",
        description:
          "Dee opens an escalation, sees the suggested persona, and reuses prior remediation notes.",
      },
    ],
    evidence: [
      {
        id: "evidence_support-tickets_c3d4e5f6",
        source_type: "support",
        title: "March escalation sample",
        summary:
          "Sampled forty-two escalations and found three recurring user patterns not covered by current personas.",
        confidence: 0.8,
      },
    ],
    confidence: 0.75,
    tags: ["support", "escalations", "patterns"],
    tech_comfort: "high",
    decision_style: "fast",
    created_at: "2026-05-27T06:22:00Z",
    updated_at: "2026-05-27T06:22:00Z",
  },
];
