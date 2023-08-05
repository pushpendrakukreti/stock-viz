import React from "react";
import { render, waitFor } from "@testing-library/react";

import Chart, { formatDateToMMDDYY } from ".";

const chartDataMock = [
  {
    date: new Date(),
    ASML: 19.57,
    BESIY: 622.735,
    ARCAY: 327,
  },
  {
    date: new Date(),
    ASML: 549.57,
    BESIY: 62.735,
    ARCAY: 67,
  },
];
const selectedStocksMock = ["ARCAY", "ASML", "BESIY"];

jest.mock("recharts", () => ({
  LineChart: ({ children }: any) => (
    <div data-testid="line-chart">{children}</div>
  ),
  Line: ({ children }: any) => <div data-testid="line">{children}</div>,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" role="tick" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  ResponsiveContainer: ({ children }: any) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  Legend: () => <div data-testid="legend" />,
}));

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserverMock;

describe("Chart Component", () => {
  test("renders chart with mock data", () => {
    const { getByTestId } = render(
      <Chart chartData={chartDataMock} selectedStocks={selectedStocksMock} />
    );
    waitFor(() => {
      const chartContainer = getByTestId("responsive-container");
      expect(chartContainer).toBeInTheDocument();
    });
  });

  it("should format date correctly", () => {
    const date = new Date("2023-08-01");
    const formattedDate = formatDateToMMDDYY(date);
    expect(formattedDate).toEqual("08-01-23");
  });
});
