// lib/wagmi.ts
// Wagmi + RainbowKit configuration.
//
// Polymarket settles on Polygon, so Polygon is the primary chain; Ethereum
// mainnet is included so users can bridge/view mainnet-held assets too.
//
// NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID must be set in .env.local. Get a free
// project ID at https://cloud.reown.com (formerly WalletConnect Cloud).

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon } from "wagmi/chains";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  // Non-fatal in dev so `next dev` doesn't crash before .env.local is set up,
  // but wallet connections will fail without a real project ID.
  console.warn(
    "[wagmi] NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. Get one at https://cloud.reown.com and add it to .env.local"
  );
}

export const wagmiConfig = getDefaultConfig({
  appName: "MCTG Polymarket Platform",
  projectId: projectId || "MISSING_WALLETCONNECT_PROJECT_ID",
  chains: [polygon, mainnet],
  ssr: true,
});
