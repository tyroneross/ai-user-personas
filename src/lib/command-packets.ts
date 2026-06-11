import type { CommandPacket, PersonaReviewBundle } from "./council";

function quote(value: string): string {
  return `"${value.replace(/"/g, '\\"')}"`;
}

export function buildCommandPacket(bundle: PersonaReviewBundle): CommandPacket {
  const run = bundle.run;
  const targetList = run.target_artifacts.map(quote).join(" ");
  const warnings: string[] = [];

  if (run.level === "high") {
    warnings.push("High-depth runs should be launched in waves if agent count exceeds host concurrency.");
  }
  if (bundle.findings.some((finding) => finding.behavior_source !== "real_users")) {
    warnings.push("Synthetic or mixed findings must remain disclosed in downstream reports.");
  }
  if (bundle.measurement_plan.evidence_required.length === 0) {
    warnings.push("Measurement plan is missing evidence requirements.");
  }

  const commands =
    run.coordination_mode === "rally"
      ? [
          'export RALLY="${RALLY:-/Users/tyroneross/dev/git-folder/agent-rally-point/target/release/rally}"',
          `"${"$"}RALLY" room --json`,
          `"${"$"}RALLY" say claim --tool codex --subject ${quote(`run ${run.id} persona review`)} --path ${quote(`run:${run.id}`)} --json`,
          `node plugins/persona-lab/scripts/persona-plan.mjs --json --count ${run.persona_ids.length} ${quote(run.request)}`,
          `# Targets: ${targetList || "(none)"}`,
        ]
      : [
          `node plugins/persona-lab/scripts/persona-plan.mjs --json --count ${run.persona_ids.length} ${quote(run.request)}`,
          `# Review level: ${run.level}`,
          `# Targets: ${targetList || "(none)"}`,
        ];

  return {
    run_id: run.id,
    coordination_mode: run.coordination_mode,
    title: `${run.level} ${run.council_type} review`,
    commands,
    warnings,
  };
}
