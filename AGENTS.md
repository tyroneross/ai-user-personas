# AI User Personas Agent Instructions

This directory is the dogfood workspace for testing Agent Rally Point with two
coding agents working on the same app.

## Current Objective

Build the first version of the AI User Personas app while testing whether Rally
keeps agent state, file ownership, intent, handoffs, and stop state visible
across terminals.

Initial split:

- `claude_code`: UI owner. Focus on layout, interaction design, screens,
  components, visual hierarchy, and frontend implementation.
- `codex`: architecture and data owner. Focus on agent architecture, data
  inputs/outputs, schemas, state flow, persistence/API boundaries, and UI
  additions as handoffs to Claude.

## Rally Access

Use the local Rally binary unless `rally` is already installed on `PATH`.

```bash
export RALLY="${RALLY:-/Users/tyroneross/dev/git-folder/agent-rally-point/target/release/rally}"
cd "/Users/tyroneross/dev/git-folder/AI User Personas"
"$RALLY" --help
```

If the local binary is missing, build it from the Rally checkout:

```bash
cd "/Users/tyroneross/dev/git-folder/agent-rally-point"
cargo build --workspace --release
```

## Required Agent Loop

Start every terminal with a stable session id and a clear intent.

Codex / ChatGPT terminal:

```bash
export RALLY="${RALLY:-/Users/tyroneross/dev/git-folder/agent-rally-point/target/release/rally}"
export SESSION_ID="codex-arch-$(date +%Y%m%d%H%M%S)"
cd "/Users/tyroneross/dev/git-folder/AI User Personas"
"$RALLY" start codex \
  --session-id "$SESSION_ID" \
  --intent "define app architecture and data input/output contracts; suggest UI additions" \
  --path docs/architecture.md \
  --path docs/data-contracts.md \
  --path schemas \
  --json
```

Claude Code terminal:

```bash
export RALLY="${RALLY:-/Users/tyroneross/dev/git-folder/agent-rally-point/target/release/rally}"
export SESSION_ID="claude-ui-$(date +%Y%m%d%H%M%S)"
cd "/Users/tyroneross/dev/git-folder/AI User Personas"
"$RALLY" start claude_code \
  --session-id "$SESSION_ID" \
  --intent "build the UI shell, screens, and component interaction model" \
  --path app \
  --path src \
  --path components \
  --path styles \
  --json
```

At every meaningful boundary:

```bash
"$RALLY" preflight --tool <codex|claude_code> --session-id "$SESSION_ID" --json
"$RALLY" inbox --tool <codex|claude_code> --session-id "$SESSION_ID" --since-cursor --json
"$RALLY" next --tool <codex|claude_code> --json
```

Before editing a path:

```bash
"$RALLY" hook before-write --tool <codex|claude_code> --path <path> --auto-claim --json
```

When handing work to the other agent:

```bash
"$RALLY" handoff --to <codex|claude_code> --from-tool <codex|claude_code> --subject "<specific request>" --files <path> --json
```

When receiving a handoff:

```bash
"$RALLY" ack --tool <codex|claude_code> <handoff-id> --summary "<what changed or what was verified>" --json
```

When ending a terminal:

```bash
"$RALLY" stop <codex|claude_code> --session-id "$SESSION_ID" --reason "done" --json
```

## Ownership Rules

- Claude owns UI implementation paths by default: `app/`, `src/`,
  `components/`, `styles/`, and frontend tests once created.
- Codex owns architecture/data paths by default: `docs/architecture.md`,
  `docs/data-contracts.md`, `schemas/`, data ingestion, API contracts, and
  integration docs.
- Either agent may suggest changes outside its area by handoff instead of
  editing directly.
- If a path is claimed by the other agent, stop and coordinate before editing.
- Keep Rally output JSON visible in the terminal when making coordination
  decisions so the other agent can audit the state later with `replay`.

## First Milestone

1. Codex writes the architecture and data contract proposal.
2. Codex handoffs UI requirements to Claude.
3. Claude builds or sketches the first UI shell.
4. Claude handoffs any missing data/API needs to Codex.
5. Both agents stop cleanly and verify the stopped peer state remains visible in
   `peer_states[]`.
