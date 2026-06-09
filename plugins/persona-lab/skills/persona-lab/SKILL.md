---
name: persona-lab
description: Use when the user asks to spin up personas, test UI through AI user personas, review a product from multiple perspectives, or turn a request into a task-specific persona panel with plan, measurement, launch, and report-back.
---

# Persona Lab

## Objective

Turn a user query or request into a focused persona panel that can review a UI,
product, workflow, feature plan, API surface, or research artifact.

This skill is not a replacement for real user research. It is a structured
synthetic review method for finding likely product, usability, business,
technical, and risk issues before or between real research cycles.

## Workflow

### 1. Capture the Request

Restate the request in one sentence.

Identify:

- Target artifact: app, screen, workflow, PRD, repo files, screenshot, data,
  logs, design, or prompt.
- Decision being supported: ship, revise, prioritize, scope, test, debug,
  compare, or explain.
- Primary user outcome.
- Constraints: timeline, platform, audience, business model, compliance,
  existing plan, or implementation limits.

### 2. Select Persona Perspectives

Pick 4 to 7 perspectives unless the user specifies a different count.

Selection rules:

- Use roles that match the request, not a fixed roster.
- Each persona must represent a distinct lens: user, buyer, operator,
  product, design, engineering, data, revenue, risk, support, executive, or
  domain expert.
- Prefer roles with decision power over generic labels. For example:
  `Enterprise security admin` is better than `IT person`.
- Include at least one skeptical or failure-seeking perspective for UI and
  product review.
- Include accessibility or inclusive-design review when the artifact is a UI,
  workflow, form, onboarding path, dashboard, or content-heavy surface.
- Use internet research when role choice or context depends on current market,
  company, competitor, regulation, pricing, trend, or domain facts.
- Avoid demographic stereotypes. Base personas on goals, constraints,
  expertise, incentives, and failure modes.

Use `references/persona-selection.md` for the role catalog and default
selection heuristics.

### 3. Check Task, Intent, And Execution Access

Before launching the review, verify what is available.

Check for:

- Files or repo paths to inspect.
- Running app URL or local dev server.
- Screenshots, recordings, analytics, logs, support tickets, survey data, or
  research notes.
- Browser, shell, web, or data access.
- User-provided success criteria.

If access is missing but the review can proceed, label the review as synthetic
and list access gaps. If access is required to avoid a misleading answer, ask
one concise blocking question.

Do not claim that you tested a UI, searched the web, inspected analytics, or
verified behavior unless the relevant tool was used or the evidence was
provided.

### 4. Plan Steps And Measurement

Define measurement before the persona passes.

Use this minimum measurement set:

- Task completion: can the persona complete the intended action?
- Comprehension: does the persona understand what to do and why?
- Friction: what slows, blocks, or confuses the persona?
- Trust: what makes the persona doubt the product, data, or next step?
- Risk: what could create privacy, security, legal, operational, or brand harm?
- Business fit: does the experience support the desired product outcome?

For each persona, define:

- Primary question.
- Success signal.
- Failure signal.
- Evidence to inspect.

### 5. Launch The Persona Panel

Use independent passes.

Preferred launch path when subagents are available:

1. Use `persona-panel-orchestrator` to select personas and measurement.
2. Launch `persona-perspective-reviewer` once per persona with the assigned
   persona, artifact, and measurement criteria.
3. Keep each review independent until synthesis.

Fallback launch path:

1. Run sequential persona passes in the main conversation.
2. Reset assumptions between passes.
3. Keep notes separated by persona before synthesis.

For UI work, inspect actual files and use browser/screenshot verification when
the app is available. For strategy, market, regulated, or competitor-sensitive
work, research current sources before making current-state claims.

### 6. Report Back

Use bottom-line-first structure.

Required report:

```text
Bottom line:
What was inspected:
Persona roster:
Measurement:
Priority findings:
Persona-specific findings:
Access gaps and assumptions:
Recommended next actions:
```

Findings should include:

- Severity: critical, high, medium, or low.
- Evidence: file, screen, quote, source, screenshot, command, or observed
  behavior.
- Impact: why the persona cares.
- Fix: concrete recommendation.
- Confidence: high, medium, or low.

Keep the synthesis decisive. Preserve dissenting views when one persona finds a
critical issue that others do not.

## Helper Script

For a fast first pass, run:

```bash
node plugins/persona-lab/scripts/persona-plan.mjs "<request>"
```

The script selects a deterministic roster, inferred task intent, access needs,
and measurement plan. Treat its output as a starting point, not as the final
review.
