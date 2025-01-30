import { test, expect } from "@playwright/test";
import { baseUrl, clickMe, articlesApi, successfulResponse } from "./testdata";

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test.describe.configure({ mode: "parallel" });

test.describe("Articles", () => {
  test("are rendered with `url` and `title` attributes", async ({ page }) => {
    test.slow();
    // Start waiting for the response before clicking the button
    const responsePromise = page.waitForResponse((response) =>
      response.url().includes(articlesApi)
    );
    // Click the "Click me" button
    await page.getByRole("button", { name: clickMe }).click();
    // Await and parse the response
    const response = await responsePromise;
    const data = await response.json();
    // Expect each article to have `url` and `title` attributes
    for (const article of data.articles) {
      await expect(page.getByText(article.title)).toBeVisible();
      await expect(
        page.getByRole("link", { name: article.url })
      ).toHaveAttribute("href");
    }
  });

  test("open in a new tab", async ({ page }) => {
    // Mock successful server response
    await page.route(`*/**${articlesApi}`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(successfulResponse),
      });
    });
    // Click the "Click me" button
    await page.getByRole("button", { name: clickMe }).click();
    // Await and parse the response

    for (const article of successfulResponse.articles) {
      // Locate the article's link element
      const link = page.getByRole("link", { name: article.url });
      // Start waiting for new tab before clicking the link
      const newPagePromise = page.context().waitForEvent("page");
      // Click the article link
      await link.click();
      // Await new page
      const newPage = await newPagePromise;
      // Ensure that new page has time to load properly
      await newPage.waitForLoadState("load");
      // Ensure the new tab is opened and contains the correct url
      await expect(newPage).toHaveURL(article.url);
      // Close the page
      await newPage.close();
    }
  });
});
