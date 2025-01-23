import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useStatus } from "../src/hooks";

const statusOptions = {
  fetched: "Already fetched!",
  loading: "Loading...",
  undefined,
};

describe("useStatus hook", () => {
  it("should set status correctly", () => {
    // Call the hook with a predefined status
    for (const option in statusOptions) {
      const { result } = renderHook(() => useStatus());
      act(() => {
        result.current.setStatus(result.current.statusOptions[option]);
      });

      // Expect the result to equal the predefined status
      expect(result.current.status).toBe(statusOptions[option]);
    }
  });
});
