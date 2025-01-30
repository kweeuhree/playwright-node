import { test, expect } from "@playwright/test";
import { baseUrl, clickMe, articlesApi } from "../testdata/testdata";

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test.describe.configure({ mode: "parallel" });

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

  test("displays 11 objects total", async ({ page }) => {
    test.setTimeout(120_000);
    // Start waiting for the response before clicking the button
    const responsePromise = page.waitForResponse((response) =>
      response.url().includes(articlesApi)
    );
    // Click the "Click me" button
    await page.getByRole("button", { name: clickMe }).click();
    await responsePromise;
    await page.waitForTimeout(2000);
    // Locate articles by their className property
    const articles = page.locator("div.bd-white");
    // Expect the page to have ten articles
    await expect(articles).toHaveCount(11), { timeout: 120_000 };
  });
});
