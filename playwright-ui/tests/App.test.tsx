import React from "react";
import { render } from "@testing-library/react";
import { it } from "vitest";

import { App } from "../src/App";

it("renders without crashing", () => {
  render(<App />);
});
