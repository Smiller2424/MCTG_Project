// components/ConnectWalletButton.tsx
// Functional wallet connect button backed by RainbowKit/Wagmi. Renders
// RainbowKit's ConnectButton.Custom so it can be styled to match the app's
// existing dark/emerald button treatment instead of RainbowKit's default look.
"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function ConnectWalletButton({ full = false }: { full?: boolean }) {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: { opacity: 0, pointerEvents: "none", userSelect: "none" },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className={`rounded-lg bg-emerald-500 font-semibold text-slate-950 transition hover:bg-emerald-400 ${
                      full ? "w-full px-8 py-3" : "px-4 py-2 text-sm"
                    }`}
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className={`rounded-lg bg-red-500 font-semibold text-white transition hover:bg-red-400 ${
                      full ? "w-full px-8 py-3" : "px-4 py-2 text-sm"
                    }`}
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <button
                  onClick={openAccountModal}
                  type="button"
                  className={`rounded-lg border border-slate-700 bg-slate-900 font-semibold text-slate-100 transition hover:border-emerald-500 ${
                    full ? "w-full px-8 py-3" : "px-4 py-2 text-sm"
                  }`}
                >
                  {account.displayName}
                  {account.displayBalance ? ` (${account.displayBalance})` : ""}
                </button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
