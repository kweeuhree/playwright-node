import { test, expect } from "@playwright/test";
import { baseUrl, clickMe } from "./testdata";

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test.describe("Page", () => {
  test("has title", async ({ page }) => {
    const title = "Scrape with Playwright";
    // Expect page to have a relevant title
    await expect(page).toHaveTitle(title);
  });

  test("has header", async ({ page }) => {
    const h2Element = await page.locator("h2");
    const h2InnerHTML = "Get YCombinator articles!";
    // Expect page to have an h2 element with relevant text
    await expect(h2Element).toHaveText(h2InnerHTML);
  });

  test("has `Click me` button", async ({ page }) => {
    // Expect the "Click me" button to be visible
    await expect(page.getByRole("button", { name: clickMe })).toBeVisible();
  });
});
