type Trader = {
  rank: number;
  name: string;
  username: string;
  markets: string;
  winRate: number;
  pnl: number;
  followers: number;
};

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

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}