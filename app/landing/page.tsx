// app/landing/page.tsx
// MCTG Polymarket Platform — Landing Page
// Route: /landing (app/page.tsx is currently Carter's Portfolio page — this
// lives at /landing until the team decides on final root routing).
// Stack: Next.js (App Router) + Tailwind CSS v4
// Wallet connect button is wired for RainbowKit's <ConnectButton /> — swap in the
// import below once RainbowKitProvider is set up in app/layout.tsx.

import Link from "next/link";

// import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Nav */}
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg font-bold tracking-tight text-emerald-400">
            MCTG
          </span>
          <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
            <Link href="#rankings" className="hover:text-white">
              Rankings
            </Link>
            <Link href="#features" className="hover:text-white">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-white">
              How It Works
            </Link>
          </nav>
          {/* Replace with <ConnectButton /> once RainbowKit is wired up */}
          <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400">
            Connect Wallet
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
          Trade Polymarket{" "}
          <span className="text-emerald-400">smarter</span>, together.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          Track top Polymarket traders, analyze their performance, and
          automatically copy or fade their trades — in real time, straight
          from your wallet.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <button className="rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400">
            Get Started
          </button>
          <Link
            href="#how-it-works"
            className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition hover:border-slate-500"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Feature grid */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold">
          Everything you need to trade like the top 1%
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="mb-4 text-2xl">{f.icon}</div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rankings preview */}
      <section
        id="rankings"
        className="mx-auto max-w-6xl px-6 py-16 text-center"
      >
        <h2 className="text-3xl font-bold">Live Trader Rankings</h2>
        <p className="mt-3 text-slate-400">
          Pulled directly from the Polymarket API and updated continuously.
        </p>
        <div className="mt-8 overflow-hidden rounded-xl border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900 text-slate-400">
              <tr>
                <th className="px-6 py-3">Rank</th>
                <th className="px-6 py-3">Trader</th>
                <th className="px-6 py-3">P&L (30d)</th>
                <th className="px-6 py-3">Win Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {sampleTraders.map((t) => (
                <tr key={t.rank} className="hover:bg-slate-900/60">
                  <td className="px-6 py-3">#{t.rank}</td>
                  <td className="px-6 py-3 font-medium">{t.name}</td>
                  <td className="px-6 py-3 text-emerald-400">{t.pnl}</td>
                  <td className="px-6 py-3">{t.winRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold">How It Works</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="text-center">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 font-bold text-slate-950">
                {i + 1}
              </div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h2 className="text-3xl font-bold">Ready to trade smarter?</h2>
        <p className="mt-3 text-slate-400">
          Connect your wallet and follow your first trader in under a minute.
        </p>
        <button className="mt-8 rounded-lg bg-emerald-500 px-8 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400">
          Connect Wallet
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
        MCTG Polymarket Platform — Georgia State University Capstone Project
      </footer>
    </main>
  );
}

const features = [
  {
    icon: "📊",
    title: "Trader Analytics",
    description:
      "Deep-dive into any trader's history, performance, and behavioral patterns using live Polymarket data.",
  },
  {
    icon: "🔁",
    title: "Copy & Fade Trading",
    description:
      "Automatically replicate a trader's positions, or take the inverse side, with minimal latency.",
  },
  {
    icon: "👛",
    title: "Web3 Wallet Sync",
    description:
      "Securely connect your wallet via RainbowKit — no private keys ever touch our servers.",
  },
  {
    icon: "🏆",
    title: "Trader Rankings",
    description:
      "See who's winning right now with leaderboards computed from real trade and market data.",
  },
  {
    icon: "📈",
    title: "Portfolio Tracking",
    description:
      "Monitor your own performance alongside the traders you follow, all in one dashboard.",
  },
  {
    icon: "🔔",
    title: "Real-Time Alerts",
    description:
      "Get notified the moment a followed trader opens or closes a position.",
  },
];

const steps = [
  {
    title: "Connect Your Wallet",
    description: "Sync your Web3 wallet in seconds with RainbowKit.",
  },
  {
    title: "Find a Trader",
    description: "Browse rankings and analytics to find a strategy you trust.",
  },
  {
    title: "Copy or Fade",
    description: "Automate your trades based on their activity — your call.",
  },
];

const sampleTraders = [
  { rank: 1, name: "0x7f...3a2e", pnl: "+$142,300", winRate: "71%" },
  { rank: 2, name: "0x9c...81b4", pnl: "+$98,750", winRate: "64%" },
  { rank: 3, name: "0x2d...f0c1", pnl: "+$76,410", winRate: "68%" },
];
