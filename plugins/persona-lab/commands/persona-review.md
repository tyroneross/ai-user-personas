---
description: Launch a task-specific persona panel for UI, product, or workflow review.
---

Use the `persona-lab` skill to run a persona panel for the request below.

Request:

```text
$ARGUMENTS
```

Execution rules:

- Select 4 to 7 distinct persona perspectives based on the request.
- Use current web research when role selection, market context, competitor
  references, regulations, pricing, or current company context could have
  changed.
- Verify what you can actually inspect: repo files, browser target, screenshots,
  data, logs, analytics, or user-provided artifacts.
- Do not claim UI testing, data inspection, or live research unless you ran the
  relevant tool or were given the artifact.
- Define measurements before launching the persona reviews.
- If subagents are available, launch one pass per persona. If not, run separate
  sequential passes and keep their notes independent.
- Report back with the bottom line first, then findings, evidence, assumptions,
  and next actions.
