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
  {
    schema_version: "1.0.0",
    id: "persona_competitive-intel-lead_d4e5f6a7",
    status: "active",
    name: "Elena Martinez",
    archetype: "Competitive intelligence lead",
    role: "Market intelligence manager",
    summary:
      "Elena tracks competitor positioning and needs persona records that turn scattered market signals into evidence-backed battlecard updates.",
    primary_goal: "Keep sales and product aligned on where competitors are winning.",
    goals: [
      "Map competitor claims to buyer objections",
      "Spot product gaps before they appear in late-stage deals",
    ],
    frustrations: [
      "Win-loss notes that never connect back to personas",
      "Battlecards that repeat old competitor claims after the market shifts",
    ],
    motivations: ["Protect differentiation", "Make competitive updates easy to audit"],
    behaviors: [
      "Compares sales notes against public competitor launches",
      "Tags every research claim by source quality and freshness",
    ],
    needs: [
      "Evidence freshness by competitor",
      "Persona-linked objection patterns",
      "Clear confidence labels before sharing claims",
    ],
    scenarios: [
      {
        title: "Battlecard refresh",
        description:
          "Elena reviews recent competitor mentions and updates the segment-specific talk track before the sales enablement meeting.",
      },
    ],
    evidence: [
      {
        id: "evidence_battlecard-review_d4e5f6a7",
        source_type: "desk_research",
        title: "Competitor launch and pricing review",
        summary:
          "Three recent competitor launches emphasized faster onboarding, but only one published proof for enterprise governance needs.",
        confidence: 0.68,
        observed_at: "2026-06-03T15:00:00Z",
      },
    ],
    confidence: 0.68,
    tags: ["competitive-research", "battlecards", "positioning", "market-intel"],
    quote: "If we cannot trace the claim, it should not go into the battlecard.",
    channels: ["Slack", "CRM notes", "enablement docs"],
    tech_comfort: "high",
    decision_style: "deliberate",
    notes:
      "Useful default persona for competitor-claim triage and battlecard freshness workflows.",
    created_at: "2026-06-07T06:35:00Z",
    updated_at: "2026-06-07T06:35:00Z",
  },
  {
    schema_version: "1.0.0",
    id: "persona_pmm-switcher_e5f6a7b8",
    status: "active",
    name: "Marcus Chen",
    archetype: "Switching narrative owner",
    role: "Product marketing lead",
    summary:
      "Marcus builds switching narratives and needs competitive research personas that separate emotional switching triggers from feature-by-feature comparison.",
    primary_goal: "Turn competitive losses into segment-specific switching stories.",
    goals: [
      "Identify why buyers choose a competitor despite weaker fit",
      "Shape landing-page claims around real switching triggers",
    ],
    frustrations: [
      "Generic competitor grids that do not explain buyer anxiety",
      "Interview notes that bury the decisive switching moment",
    ],
    motivations: ["Clarify the why-now story", "Give sales language buyers recognize"],
    behaviors: [
      "Clusters win-loss notes by anxiety, urgency, and proof needs",
      "Tests new positioning against the strongest competitor objection",
    ],
    needs: [
      "Buyer-trigger themes",
      "Segmented proof gaps",
      "Copy-ready language with source context",
    ],
    scenarios: [
      {
        title: "Launch narrative review",
        description:
          "Marcus checks whether the new campaign answers the top switching concern for buyers comparing two named competitors.",
      },
    ],
    evidence: [
      {
        id: "evidence_switching-notes_e5f6a7b8",
        source_type: "sales",
        title: "Win-loss switching notes",
        summary:
          "Recent sales notes show buyers cite implementation risk more often than price when choosing the incumbent competitor.",
        confidence: 0.72,
        observed_at: "2026-06-04T17:30:00Z",
      },
    ],
    confidence: 0.72,
    tags: ["competitive-research", "positioning", "win-loss", "pmm"],
    quote: "The comparison table is not the story. The switching fear is the story.",
    channels: ["win-loss notes", "campaign briefs", "sales calls"],
    tech_comfort: "medium",
    decision_style: "consensus",
    created_at: "2026-06-07T06:36:00Z",
    updated_at: "2026-06-07T06:36:00Z",
  },
  {
    schema_version: "1.0.0",
    id: "persona_field-strategist_f6a7b8c9",
    status: "draft",
    name: "Nadia Brooks",
    archetype: "Field objection strategist",
    role: "Enterprise account executive",
    summary:
      "Nadia needs fast competitive readouts that connect persona pain points to the competitor objections she hears in active enterprise deals.",
    primary_goal: "Answer competitor objections without overstating evidence.",
    goals: [
      "Find the strongest proof for a deal-specific objection",
      "Flag when a competitor claim needs research follow-up",
    ],
    frustrations: [
      "Research summaries that arrive after the deal has moved on",
      "Internal claims that sound confident but lack source context",
    ],
    motivations: ["Protect deal trust", "Use competitive claims responsibly"],
    behaviors: [
      "Asks for source-backed talk tracks before sending follow-up notes",
      "Records competitor mentions immediately after customer calls",
    ],
    needs: [
      "Deal-stage objection summaries",
      "Approved language for uncertain claims",
      "Fast escalation path for missing proof",
    ],
    scenarios: [
      {
        title: "Late-stage competitor objection",
        description:
          "Nadia prepares a same-day follow-up that addresses a competitor's migration claim without inventing proof.",
      },
    ],
    evidence: [
      {
        id: "evidence_field-objections_f6a7b8c9",
        source_type: "sales",
        title: "Enterprise objection sample",
        summary:
          "Five recent enterprise opportunities mentioned competitor migration speed, but only two included enough context to reuse in approved talk tracks.",
        confidence: 0.58,
        observed_at: "2026-06-05T18:15:00Z",
      },
    ],
    confidence: 0.58,
    tags: ["competitive-research", "field-sales", "objections", "enterprise"],
    quote: "I need the strongest honest answer, not the loudest one.",
    channels: ["CRM notes", "customer calls", "Slack"],
    tech_comfort: "medium",
    decision_style: "fast",
    notes:
      "Draft until field-research examples are replaced with named opportunity evidence.",
    created_at: "2026-06-07T06:37:00Z",
    updated_at: "2026-06-07T06:37:00Z",
  },
];
