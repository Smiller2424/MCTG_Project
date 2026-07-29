// app/traders/[username]/page.tsx
// Trader profile / analytics detail page. Shows the trader's stats, recent
// trades, and a ReplicationConfig panel so a visitor could set up copy/fade
// trading against them (UI only — no backend CopySetting endpoint yet).
import { notFound } from "next/navigation";

import { getTraderByUsername, traders } from "@/lib/traders";
import { ReplicationConfig } from "@/components/ReplicationConfig";

export function generateStaticParams() {
  return traders.map((t) => ({ username: t.username }));
}

export default async function TraderProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const trader = getTraderByUsername(username);

  if (!trader) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <p className="text-sm font-medium text-emerald-400">@{trader.username}</p>
          <h1 className="text-3xl font-bold">{trader.name}</h1>
          <p className="mt-2 max-w-2xl text-slate-400">{trader.bio}</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label="Win Rate" value={`${trader.winRate}%`} />
              <Stat label="Total Volume" value={formatCurrency(trader.totalVolume)} />
              <Stat label="Total P&L" value={formatCurrency(trader.totalPnl)} positive />
              <Stat label="Followers" value={trader.followers.toLocaleString()} />
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h2 className="mb-4 text-sm font-semibold text-slate-100">Recent Trades</h2>
              {trader.recentTrades.length === 0 ? (
                <p className="text-sm text-slate-500">No recent trades to show.</p>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="pb-2">Market</th>
                      <th className="pb-2">Side</th>
                      <th className="pb-2">Amount</th>
                      <th className="pb-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trader.recentTrades.map((trade, i) => (
                      <tr key={i} className="border-t border-slate-800">
                        <td className="py-2 pr-4">{trade.market}</td>
                        <td className="py-2 pr-4">
                          <span
                            className={
                              trade.side === "YES"
                                ? "text-emerald-400"
                                : "text-rose-400"
                            }
                          >
                            {trade.side}
                          </span>
                        </td>
                        <td className="py-2 pr-4">{formatCurrency(trade.amount)}</td>
                        <td className="py-2 text-slate-400">{trade.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div>
            <ReplicationConfig traderName={trader.name} />
          </div>
        </div>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  positive,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p
        className={`mt-1 text-lg font-semibold ${
          positive ? "text-emerald-400" : "text-slate-100"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
