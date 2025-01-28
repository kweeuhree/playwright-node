import { test, expect } from "@playwright/test";
import { baseUrl, clickMe, statusOptions, articlesApi } from "./testdata";

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test.describe("Status", () => {
  test("displays `Loading...` correctly", async ({ page }) => {
    // Click the "Click me" button
    await page.getByRole("button", { name: clickMe }).click();
    // Expect page to have text "Loading..."
    await expect(page.getByText(statusOptions.loading)).toBeVisible();
  });

  test("displays `Already fetched!` correctly", async ({ page }) => {
    // Define the "Click me" button
    const clickMebutton = page.getByRole("button", { name: clickMe });
    // Mock successful server response
    await page.route(`*/**${articlesApi}`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(
          Array.from([{ title: "Article 1", url: "https://scrape.com" }])
        ),
      });
    });
    // Click the "Click me" button to send request
    await clickMebutton.click();
    // Click the "Click me" button to trigger `Already fetched!` message
    await clickMebutton.click();
    // Expect page to have text "Already fetched!"
    await expect(page.getByText(statusOptions.fetched)).toBeVisible();
  });

  test("displays error message correctly", async ({ page }) => {
    await page.route(`*/**${articlesApi}`, async (route) => {
      await route.abort();
    });

    // Click the "Click me" button
    await page.getByRole("button", { name: clickMe }).click();

    await expect(page.getByText(statusOptions.error)).toBeVisible();
  });
});
