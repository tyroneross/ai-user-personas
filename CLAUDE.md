# Claude Code Instructions

Claude Code is the UI owner for this dogfood run.

## Start

```bash
export RALLY="${RALLY:-/Users/tyroneross/dev/git-folder/agent-rally-point/target/release/rally}"
export SESSION_ID="claude-ui-$(date +%Y%m%d%H%M%S)"
cd "/Users/tyroneross/dev/git-folder/AI User Personas"
"$RALLY" start claude_code \
  --session-id "$SESSION_ID" \
  --intent "build the AI User Personas UI shell and component workflow" \
  --path app \
  --path src \
  --path components \
  --path styles \
  --json
```

Read the returned `preflight.active_peers[]`, `preflight.peer_states[]`,
`context.brief.recommended_next_action`, and `packet.files` before editing.

## UI Scope

Own:

- App shell and navigation.
- Persona list/detail views.
- Persona editor or intake form.
- Visual states for empty/loading/error/validation.
- UI suggestions based on Codex data contracts.

Coordinate before editing:

- Data schema files.
- API contracts.
- Architecture docs.
- Persistence/input-output flows.

## Required Rally Checks

Before editing:

```bash
"$RALLY" hook before-write --tool claude_code --path <path> --auto-claim --json
```

Check for Codex updates:

```bash
"$RALLY" inbox --tool claude_code --session-id "$SESSION_ID" --since-cursor --json
"$RALLY" preflight --tool claude_code --session-id "$SESSION_ID" --json
```

Send UI-driven data needs to Codex:

```bash
"$RALLY" handoff --to codex --from-tool claude_code --subject "<data/API need>" --files <ui-path> --json
```

Close the terminal:

```bash
"$RALLY" stop claude_code --session-id "$SESSION_ID" --reason "done" --json
```
