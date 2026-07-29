// components/NavBar.test.tsx
// Scenario 2: On a mobile-width screen, the desktop link row is hidden. User
// taps the hamburger icon, sees the mobile menu with all nav links, then taps
// the toggle again and the menu closes.
//
// The desktop <nav> is always present in the DOM (Tailwind's "hidden md:flex"
// only hides it via CSS at real breakpoints, which jsdom doesn't render), so
// tests target the mobile panel specifically via its "Mobile navigation"
// aria-label rather than by link text alone.
//
// next/navigation's usePathname and the wallet button are mocked so the test
// only exercises NavBar's own open/close behavior, not routing or wagmi.
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  usePathname: () => "/landing",
}));

vi.mock("@/components/ConnectWalletButton", () => ({
  ConnectWalletButton: () => <button>Connect Wallet</button>,
}));

import { NavBar } from "./NavBar";

describe("NavBar", () => {
  it("opens the mobile menu on toggle and lists all nav links", () => {
    render(<NavBar />);

    // The mobile panel (and its <nav aria-label="Mobile navigation">) isn't
    // rendered at all until opened.
    expect(screen.queryByLabelText("Mobile navigation")).toBeNull();

    const toggle = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });
    fireEvent.click(toggle);

    const mobileNav = screen.getByLabelText("Mobile navigation");
    expect(within(mobileNav).getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(within(mobileNav).getByRole("link", { name: "Dashboard" })).toBeInTheDocument();
    expect(within(mobileNav).getByRole("link", { name: "Leaderboard" })).toBeInTheDocument();
    expect(within(mobileNav).getByRole("link", { name: "About" })).toBeInTheDocument();
  });

  it("closes the mobile menu when the toggle is clicked again", () => {
    render(<NavBar />);

    const toggle = screen.getByRole("button", {
      name: /toggle navigation menu/i,
    });
    fireEvent.click(toggle); // open
    expect(screen.getByLabelText("Mobile navigation")).toBeInTheDocument();

    fireEvent.click(toggle); // close
    expect(screen.queryByLabelText("Mobile navigation")).toBeNull();
  });
});
