// app/not-found.test.tsx
// Scenario 5: User navigates to a trader username (or any route) that isn't
// tracked, sees the custom 404 page, and can click through to Home or the
// Leaderboard instead of hitting Next.js's default blank error page.
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import NotFound from "./not-found";

describe("NotFound", () => {
  it("renders the 404 message with links back into the app", () => {
    render(<NotFound />);

    expect(screen.getByText(/this page doesn't exist/i)).toBeInTheDocument();

    const backHome = screen.getByRole("link", { name: /back home/i });
    expect(backHome).toHaveAttribute("href", "/landing");

    const leaderboard = screen.getByRole("link", {
      name: /view leaderboard/i,
    });
    expect(leaderboard).toHaveAttribute("href", "/leaderboard");
  });
});
