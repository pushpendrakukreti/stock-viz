import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; 

import DatePickers from ".";

// Sample props for the test
const mockFromDate = "2023-08-01";
const mockToDate = "2023-08-15";
const mockSetFromDate = jest.fn();
const mockSetToDate = jest.fn();

describe("DatePickers Component", () => {
  test("renders DatePicker compoenent with correct props", () => {
    const { getByLabelText } = render(
      <DatePickers
        fromDate={mockFromDate}
        toDate={mockToDate}
        setFromDate={mockSetFromDate}
        setToDate={mockSetToDate}
      />
    );

    const fromDateTextField = getByLabelText("From Date");
    expect(fromDateTextField).toBeInTheDocument();
    const toDateTextField = getByLabelText("To Date");
    expect(toDateTextField).toBeInTheDocument();
  });

  test("calls for setFromDate when changing the From Date", () => {
    const { getByLabelText } = render(
      <DatePickers
        fromDate={mockFromDate}
        toDate={mockToDate}
        setFromDate={mockSetFromDate}
        setToDate={mockSetToDate}
      />
    );

    const fromDateTextField = getByLabelText("From Date");

    const newFromDate = "2024-10-15";
    fireEvent.change(fromDateTextField, { target: { value: newFromDate } });

    expect(mockSetFromDate).toHaveBeenCalledTimes(1);
    expect(mockSetFromDate).toHaveBeenCalledWith(newFromDate);
  });

  test("calls for setToDate when changing the To Date", () => {
    const { getByLabelText } = render(
      <DatePickers
        fromDate={mockFromDate}
        toDate={mockToDate}
        setFromDate={mockSetFromDate}
        setToDate={mockSetToDate}
      />
    );

    const toDateTextField = getByLabelText("To Date");

    const newToDate = "2025-10-25";
    fireEvent.change(toDateTextField, { target: { value: newToDate } });

    expect(mockSetToDate).toHaveBeenCalledTimes(1);
    expect(mockSetToDate).toHaveBeenCalledWith(newToDate);
  });
});
