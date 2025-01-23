import { vi, it, describe, expect } from "vitest";
import { fetchArticles } from "../src/api";
import { fetchArticlesMocks } from "../mocks/fetchArticlesMocks";

vi.mock("../src/api", () => ({
  fetchArticles: vi.fn(),
}));

describe("fetchArticles function", () => {
  it("should fetch articles if request response is ok", async () => {
    // Per each mock
    for (const mock of fetchArticlesMocks) {
      // Call fetch articles with a predefined response
      vi.mocked(fetchArticles).mockResolvedValueOnce(mock);
      const response = await fetchArticles();
      // Expect response to equal the mock
      expect(response).toEqual(mock);
    }
  });

  it("should throw an error if request fails", async () => {
    vi.mocked(fetchArticles).mockRejectedValueOnce(
      new Error("Internal Server Error")
    );

    await expect(fetchArticles()).rejects.toThrow("Internal Server Error");
  });
});
