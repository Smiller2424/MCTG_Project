// lib/traders.ts
// Shared mock trader dataset used by the leaderboard and trader profile
// pages until a real backend endpoint (e.g. GET /traders/:username) exists.
// TODO: replace with a real API call once the backend team ships it.

export type RecentTrade = {
  market: string;
  side: "YES" | "NO";
  amount: number;
  date: string;
};

export type TraderProfile = {
  username: string;
  name: string;
  bio: string;
  winRate: number;
  totalVolume: number;
  totalPnl: number;
  followers: number;
  recentTrades: RecentTrade[];
};

export const traders: TraderProfile[] = [
  {
    username: "ElectionEdge",
    name: "Election Edge",
    bio: "Focused on political and macro markets. Highest ranked trader this month.",
    winRate: 71,
    totalVolume: 482000,
    totalPnl: 142300,
    followers: 1893,
    recentTrades: [
      { market: "Will the bill pass by Q3?", side: "YES", amount: 2500, date: "2026-07-24" },
      { market: "Fed rate cut in September?", side: "NO", amount: 1800, date: "2026-07-22" },
      { market: "State election runoff outcome", side: "YES", amount: 4200, date: "2026-07-18" },
    ],
  },
  {
    username: "MacroMike",
    name: "Macro Mike",
    bio: "Rates, inflation, and macro event trader.",
    winRate: 64,
    totalVolume: 310500,
    totalPnl: 58900,
    followers: 742,
    recentTrades: [
      { market: "CPI print above 3%?", side: "NO", amount: 1200, date: "2026-07-25" },
      { market: "Recession call for 2026?", side: "NO", amount: 900, date: "2026-07-20" },
    ],
  },
  {
    username: "CryptoQueen",
    name: "Crypto Queen",
    bio: "On-chain markets and crypto price predictions.",
    winRate: 58,
    totalVolume: 275800,
    totalPnl: 39250,
    followers: 1204,
    recentTrades: [
      { market: "ETH above $5k by EOY?", side: "YES", amount: 3000, date: "2026-07-26" },
    ],
  },
  {
    username: "SportsSharp",
    name: "Sports Sharp",
    bio: "Sports outcomes and championship markets.",
    winRate: 66,
    totalVolume: 198400,
    totalPnl: 27100,
    followers: 588,
    recentTrades: [],
  },
  {
    username: "TechTrader",
    name: "Tech Trader",
    bio: "Product launches, earnings, and tech-sector markets.",
    winRate: 61,
    totalVolume: 152300,
    totalPnl: 18400,
    followers: 401,
    recentTrades: [
      { market: "New product announced this quarter?", side: "YES", amount: 700, date: "2026-07-21" },
    ],
  },
];

export function getTraderByUsername(username: string) {
  return traders.find((t) => t.username === username);
}
