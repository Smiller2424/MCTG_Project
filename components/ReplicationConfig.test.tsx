// components/ReplicationConfig.test.tsx
// Scenario 3: User opens a trader's profile, leaves the mode on Copy, sets
// position size and max amount, and clicks Start Replicating. An Active badge
// appears and the button label updates.
// Scenario 4: User switches the mode toggle to Fade, adjusts settings, and
// saves. The Active badge confirms the fade configuration.
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { ReplicationConfig } from "./ReplicationConfig";

describe("ReplicationConfig", () => {
  it("defaults to Copy mode with no Active badge until saved", () => {
    render(<ReplicationConfig traderName="ElectionEdge" />);

    expect(screen.queryByText("Active")).toBeNull();
    expect(
      screen.getByRole("button", { name: /start replicating/i })
    ).toBeInTheDocument();
  });

  it("saves a Copy configuration and shows the Active badge", () => {
    render(<ReplicationConfig traderName="ElectionEdge" />);

    fireEvent.change(screen.getByLabelText(/max amount per trade/i), {
      target: { value: "750" },
    });
    fireEvent.click(screen.getByRole("button", { name: /start replicating/i }));

    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /update replication settings/i })
    ).toBeInTheDocument();
  });

  it("switches to Fade mode and still saves successfully", () => {
    render(<ReplicationConfig traderName="ElectionEdge" />);

    fireEvent.click(screen.getByRole("button", { name: /^fade \(inverse\)$/i }));
    fireEvent.click(screen.getByRole("button", { name: /start replicating/i }));

    expect(screen.getByText("Active")).toBeInTheDocument();
  });
});
