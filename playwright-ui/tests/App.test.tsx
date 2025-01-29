import React from "react";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { App } from "../src/App";

describe("App component", () => {
  it("renders without crashing", () => {
    render(<App />);
  });

  it("displays header correctly", () => {
    render(<App />);

    const header = screen.getByText("Get YCombinator articles!");
    expect(header).toBeInTheDocument();
  });

  it("displays 'Click me' button correctly", () => {
    render(<App />);

    const button = screen.getByText("Click me");
    expect(button).toBeInTheDocument();
  });
});
