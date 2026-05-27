import Link from "next/link";
import type { ReactNode } from "react";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-baseline gap-2 min-w-0">
            <span className="text-lg font-semibold text-ink truncate">
              AI User Personas
            </span>
            <span className="text-xs text-muted">v0.1</span>
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-3">
            <Link
              href="/personas/new"
              className="inline-flex items-center rounded-md bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-ink-soft transition"
            >
              + New persona
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      </main>
      <footer className="border-t border-line bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-3 text-xs text-muted">
          Local-first workspace. Fixture data shown until persistence lands.
        </div>
      </footer>
    </div>
  );
}
