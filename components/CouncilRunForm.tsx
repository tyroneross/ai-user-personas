import type { RepoPersonaRoster } from "@lib/council";
import { councilTypeLabels, reviewLevelLabels } from "@lib/council";
import { createCouncilRunAction } from "@/app/councils/actions";

const councilTypes = Object.entries(councilTypeLabels);
const reviewLevels = Object.entries(reviewLevelLabels);

export default function CouncilRunForm({ rosters }: { rosters: RepoPersonaRoster[] }) {
  const roster = rosters[0];
  const defaultPersonas = new Set(roster?.default_levels.medium ?? []);

  return (
    <form action={createCouncilRunAction} className="space-y-8">
      <input type="hidden" name="roster_id" value={roster?.id ?? ""} />

      <section className="rounded-md border border-line bg-surface p-5">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase text-muted">First-run setup</p>
          <h1 className="mt-2 text-2xl font-semibold text-ink">Plan a persona review</h1>
          <p className="mt-2 text-sm leading-6 text-ink-soft">
            Medium and high runs need a complete measurement plan before launch.
            Synthetic and mixed evidence remains disclosed in the output.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <div className="space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-ink">Review request</span>
            <textarea
              name="request"
              required
              minLength={10}
              rows={5}
              className="mt-2 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink focus:outline-2 focus:outline-offset-2 focus:outline-current"
              defaultValue="Review the councils workflow for evidence trust, synthetic disclosure, and launch readiness."
            />
          </label>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <label className="block">
              <span className="text-sm font-medium text-ink">Council type</span>
              <select
                name="council_type"
                className="mt-2 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink"
                defaultValue="ui_test"
              >
                {councilTypes.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink">Level</span>
              <select
                name="level"
                className="mt-2 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink"
                defaultValue="medium"
              >
                {reviewLevels.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink">Coordination</span>
              <select
                name="coordination_mode"
                className="mt-2 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink"
                defaultValue="rally"
              >
                <option value="local">Local</option>
                <option value="host_subagents">Host subagents</option>
                <option value="rally">Rally</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-ink">Target artifacts</span>
            <textarea
              name="target_artifacts"
              rows={4}
              className="mt-2 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink focus:outline-2 focus:outline-offset-2 focus:outline-current"
              defaultValue={"app/councils\nsrc/lib/council.ts\ndocs/plans/persona-review-capability.md"}
            />
          </label>
        </div>

        <aside className="rounded-md border border-line bg-surface p-4">
          <h2 className="text-sm font-semibold text-ink">Roster</h2>
          <p className="mt-1 text-sm text-muted">{roster?.repo_slug ?? "No roster"}</p>
          <div className="mt-4 space-y-3">
            {roster?.personas.map((persona) => (
              <label key={persona.id} className="flex gap-3 text-sm text-ink-soft">
                <input
                  type="checkbox"
                  name="persona_ids"
                  value={persona.id}
                  defaultChecked={defaultPersonas.has(persona.id)}
                  className="mt-1"
                />
                <span>
                  <span className="block font-medium text-ink">{persona.name}</span>
                  <span className="block text-xs text-muted">{persona.lens} / {persona.role}</span>
                </span>
              </label>
            ))}
          </div>
        </aside>
      </section>

      <section className="rounded-md border border-line bg-surface p-5">
        <h2 className="text-lg font-semibold text-ink">Measurement plan</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-ink">Decision supported</span>
            <input
              name="decision_supported"
              className="mt-2 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink"
              defaultValue="Decide whether this workflow is ready for a medium-depth persona review."
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">Reviewer quality gate</span>
            <input
              name="reviewer_quality_gate"
              className="mt-2 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink"
              defaultValue="Evidence gaps and dissent must be visible before completion."
            />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-ink">Success signals</span>
            <textarea
              name="success_signals"
              rows={3}
              className="mt-2 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink"
              defaultValue={"Persona findings cite evidence or assumptions\nSynthetic status is visible\nRecommended actions are specific"}
            />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-ink">Failure signals</span>
            <textarea
              name="failure_signals"
              rows={3}
              className="mt-2 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink"
              defaultValue={"Findings cannot be traced to evidence\nSynthetic claims read as real-user evidence\nNo clear next action"}
            />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-ink">Evidence required</span>
            <textarea
              name="evidence_required"
              rows={3}
              className="mt-2 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink"
              defaultValue={"Target files\nPersona roster\nPrior panel findings"}
            />
          </label>
        </div>
        <label className="mt-5 flex items-center gap-3 text-sm text-ink-soft">
          <input name="use_planner" type="checkbox" defaultChecked />
          Use the deterministic persona-plan adapter to prefill review discipline.
        </label>
      </section>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-ink px-5 py-2 text-sm font-medium text-white hover:bg-ink-soft"
        >
          Create draft run
        </button>
      </div>
    </form>
  );
}
