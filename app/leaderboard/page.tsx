// Types
type Trader = {
  rank: number;
  name: string;
  username: string;
  markets: string;
  winRate: number;
  pnl: number;
  followers: number;
};

// Data
const leaderboardStats = [
  {
    label: "Top Trader",
    value: "ElectionEdge",
    detail: "Highest ranked this month",
  },
  {
    label: "Highest Profit",
    value: "$142,300",
    detail: "Earned over the past 30 days",
  },
  {
    label: "Active Traders",
    value: "250+",
    detail: "Updated daily from Polymarket",
  },
  {
    label: "Markets Tracked",
    value: "5",
    detail: "Politics • Sports • Crypto • Economics • Global Events",
  },
];

const traders: Trader[] = [
  {
    rank: 1,
    name: "ElectionEdge",
    username: "@electionedge",
    markets: "Politics",
    winRate: 71,
    pnl: 142300,
    followers: 1254,
  },
  {
    rank: 2,
    name: "MacroMax",
    username: "@macromax",
    markets: "Economics",
    winRate: 68,
    pnl: 98750,
    followers: 1041,
  },
  {
    rank: 3,
    name: "SportsSharp",
    username: "@sportssharp",
    markets: "Sports",
    winRate: 65,
    pnl: 76410,
    followers: 932,
  },
  {
    rank: 4,
    name: "CryptoVision",
    username: "@cryptovision",
    markets: "Crypto",
    winRate: 63,
    pnl: 58220,
    followers: 861,
  },
  {
    rank: 5,
    name: "WorldWatch",
    username: "@worldwatch",
    markets: "Global Events",
    winRate: 61,
    pnl: 42100,
    followers: 715,
  },
];

// Helper Functions
function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

// Reusable Components
function PnlText({ value }: { value: number }) {
  const isPositive = value >= 0;

  return (
    <span className={isPositive ? "text-emerald-400" : "text-red-400"}>
      {isPositive ? "+" : ""}
      {formatCurrency(value)}
    </span>
  );
}

function RankBadge({ rank }: { rank: number }) {
  const styles = {
    1: "bg-yellow-500/10 text-yellow-400 ring-yellow-500/20",
    2: "bg-slate-500/10 text-slate-300 ring-slate-500/20",
    3: "bg-orange-500/10 text-orange-400 ring-orange-500/20",
  };

  const defaultStyle =
    "bg-cyan-500/10 text-cyan-400 ring-cyan-500/20";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${
        styles[rank as keyof typeof styles] ?? defaultStyle
      }`}
    >
      #{rank}
    </span>
  );
}

function FollowButton() {
  return (
    <button className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400 ring-1 ring-cyan-500/20 transition hover:bg-cyan-500/20">
      Follow
    </button>
  );
}

// Main Page
export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Page Header */}
        <section className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/20 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-cyan-400">
              Leaderboard
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Top Polymarket Traders
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Track the highest-performing traders, compare their performance,
              and discover successful trading strategies across multiple prediction markets.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Last Updated
            </p>

            <p className="mt-1 text-lg font-semibold text-white">
              Updated Daily
            </p>
          </div>
        </section>
        {/* Summary Stats */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {leaderboardStats.map((stat) => (
            <div
              key={stat.label}
              className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <p className="text-sm text-slate-400">{stat.label}</p>

              <p className="mt-2 text-2xl font-bold text-white">
                {stat.value}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {stat.detail}
              </p>
            </div>
          ))}
        </section>
        {/* Leaderboard Table */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
                
              <h2 className="text-lg font-semibold text-white">
                Trader Rankings
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Browse the highest-performing traders across all tracked
                Polymarket markets.
              </p>
            </div>

            <button
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 transition hover:bg-cyan-500/20"
            >
                ↻ Refresh Rankings
                </button>
                </div>

        
                {/* Search and Sort */}
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-lg">
             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
             🔍
             </span>
             <input
             type="text"
             placeholder="Search traders..."
             className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 pl-10 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
             />
             </div>
           
          <select className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none">
            <option>Sort By: Win Rate</option>
            <option>Sort By: Profit</option>
            <option>Sort By: Followers</option>
            <option>Sort By: Rank</option>
          </select>
        </div>
          <div className="mt-8 overflow-hidden rounded-xl border border-slate-800">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-800">
                <thead className="bg-slate-950">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                      Rank
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                      Trader
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
                      Market
                    </th>

                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-slate-500">
                      Win Rate
                    </th>

                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-slate-500">
                      30-Day P/L
                    </th>

                    <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-slate-500">
                      Followers
                    </th>

                    <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wide text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800 bg-slate-900">
                  {traders.map((trader) => (
                    <tr
                      key={trader.rank}
                      className="transition hover:bg-slate-800/60"
                    >
                      <td className="whitespace-nowrap px-4 py-4">
                        <RankBadge rank={trader.rank} />
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <div>
                          <p className="text-sm font-medium text-white">
                            {trader.name}
                          </p>

                          <p className="text-xs text-slate-500">
                            {trader.username}
                          </p>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-300">
                        {trader.markets}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right text-sm text-white">
                        {trader.winRate}%
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right">
                        <PnlText value={trader.pnl} />
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right text-sm text-slate-300">
                        {trader.followers.toLocaleString()}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-center">
                        <FollowButton />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}