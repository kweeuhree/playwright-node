import React from "react";
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

  // it("displays correct status on click of 'Click me' button", async () => {
  //   render(<App />);

  //   const button = screen.getByText("Click me");
  //   fireEvent.click(button);
  //   const loading = screen.findByText("Loading...");
  //   expect(loading).toBeInTheDocument();
  // });
});
