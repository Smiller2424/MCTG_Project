// lib/useWallet.ts
// Thin convenience wrapper over wagmi's hooks so the rest of the app reads
// wallet state from one place instead of importing several wagmi hooks
// everywhere. Wagmi/RainbowKit already manage the underlying global state
// (connection, active account, chain) via the WagmiProvider set up in
// app/providers.tsx — this hook just exposes a simpler shape.
"use client";

import { useAccount, useBalance, useDisconnect } from "wagmi";

export function useWallet() {
  const { address, isConnected, isConnecting, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  return {
    address,
    isConnected,
    isConnecting,
    chain,
    balance,
    disconnect,
  };
}
