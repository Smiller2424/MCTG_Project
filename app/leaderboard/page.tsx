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

// Components
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