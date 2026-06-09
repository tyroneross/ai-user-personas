# Persona Lab

Persona Lab is a dual-host Claude Code and Codex plugin for turning a user
request into a focused AI persona panel.

It codifies this workflow:

1. Capture the user query or request.
2. Select the most likely persona perspectives for the request.
3. Identify the task, intent, access, data, and tool requirements.
4. Plan steps and measurement criteria.
5. Launch independent persona reviews and report back with evidence.

## Structure

```text
persona-lab/
  .claude-plugin/plugin.json
  .codex-plugin/plugin.json
  commands/persona-review.md
  agents/persona-panel-orchestrator.md
  agents/persona-perspective-reviewer.md
  skills/persona-lab/SKILL.md
  skills/persona-lab/references/persona-selection.md
  scripts/persona-plan.mjs
```

The shared content is intentionally host-neutral. Claude Code and Codex can load
the same plugin root and discover the same command, agents, skill, references,
and helper script.

## Local Use

Claude Code:

```bash
claude --plugin-dir ./plugins/persona-lab
```

Codex:

```bash
codex --plugin-dir ./plugins/persona-lab
```

Slash command:

```text
/persona-lab:persona-review Review the onboarding flow for a founder persona.
```

Helper script:

```bash
node plugins/persona-lab/scripts/persona-plan.mjs "Review the settings UI for enterprise admins"
```

Use the script for a deterministic first-pass roster and measurement plan. Use
the skill and agents for the full review loop.
