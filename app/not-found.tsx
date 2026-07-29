// app/not-found.tsx
// Custom 404 shown for any unmatched route (e.g. a trader username that
// doesn't exist). Keeps the dark theme consistent instead of falling back to
// Next.js's default blank error page.
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center text-slate-100">
      <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-400">
        404
      </p>
      <h1 className="mb-3 text-3xl font-bold">This page doesn&apos;t exist.</h1>
      <p className="mb-8 max-w-md text-slate-400">
        The trader, market, or page you&apos;re looking for isn&apos;t available.
        It may have moved, or the link might be outdated.
      </p>
      <div className="flex gap-3">
        <Link
          href="/landing"
          className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
        >
          Back Home
        </Link>
        <Link
          href="/leaderboard"
          className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
        >
          View Leaderboard
        </Link>
      </div>
    </main>
  );
}
