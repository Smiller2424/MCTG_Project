// components/ConnectWalletButton.test.tsx
// Scenario 1: User opens the app, clicks Connect Wallet in the nav, selects a
// wallet in the RainbowKit modal, and connects. The button then shows the
// truncated address/balance instead of "Connect Wallet".
//
// RainbowKit's <ConnectButton.Custom> is mocked so the test can drive its
// render-prop directly with a "disconnected" and a "connected" state, instead
// of needing a live wallet/WagmiProvider.
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

const openConnectModal = vi.fn();
const openAccountModal = vi.fn();
const openChainModal = vi.fn();

vi.mock("@rainbow-me/rainbowkit", () => ({
  ConnectButton: {
    Custom: ({ children }: { children: (args: any) => React.ReactNode }) =>
      children((globalThis as any).__mockConnectButtonState__),
  },
}));

import { ConnectWalletButton } from "./ConnectWalletButton";

function setMockState(state: Partial<Record<string, unknown>>) {
  (globalThis as any).__mockConnectButtonState__ = {
    account: undefined,
    chain: undefined,
    mounted: true,
    openConnectModal,
    openAccountModal,
    openChainModal,
    ...state,
  };
}

describe("ConnectWalletButton", () => {
  it("shows 'Connect Wallet' and opens the connect modal when disconnected", () => {
    setMockState({});

    render(<ConnectWalletButton />);

    const button = screen.getByRole("button", { name: /connect wallet/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(openConnectModal).toHaveBeenCalledTimes(1);
  });

  it("shows the wallet address/balance and opens the account modal once connected", () => {
    setMockState({
      account: { displayName: "0xAB12...9F3D", displayBalance: "2.4 ETH" },
      chain: { unsupported: false },
    });

    render(<ConnectWalletButton />);

    const button = screen.getByRole("button", {
      name: /0xAB12\.\.\.9F3D \(2\.4 ETH\)/i,
    });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(openAccountModal).toHaveBeenCalledTimes(1);
  });
});
