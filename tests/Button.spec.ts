import { test, expect } from "@playwright/test";
import { baseUrl, clickMe, articlesApi, successfulResponse } from "./testdata";

test.describe("`Click me` button", () => {
  test("`Click me` button changes color to gray after successful server response", async ({
    page,
  }) => {
    await page.goto(baseUrl);
    // Define the "Click me" button
    const clickMebutton = page.getByRole("button", { name: clickMe });
    // Mock successful server response
    await page.route(`*/**${articlesApi}`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(successfulResponse),
      });
    });

    // Click the "Click me" button
    await clickMebutton.click();
    // Expect button to change style
    await expect(clickMebutton).toHaveClass(/gray/);
  });
});
