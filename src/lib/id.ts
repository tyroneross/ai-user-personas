/**
 * ID helpers per docs/data-contracts.md.
 *   persona_<slug>_<8hex>
 *   evidence_<slug>_<8hex>
 */

export function slugify(input: string): string {
  const base = input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "untitled";
}

function hex8(): string {
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function personaId(name: string): string {
  return `persona_${slugify(name)}_${hex8()}`;
}

export function evidenceId(title: string): string {
  return `evidence_${slugify(title)}_${hex8()}`;
}
