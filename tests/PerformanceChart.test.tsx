import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PerformanceChart from "../components/charts/PerformanceChart";

describe("PerformanceChart", () => {
  it("renders the chart title", () => {
    const mockData = [
      { name: "Trader1", value: 1000 },
      { name: "Trader2", value: 2000 },
    ];

    render(<PerformanceChart data={mockData} />);

    expect(screen.getByText("Trader Performance")).toBeInTheDocument();
  });
});