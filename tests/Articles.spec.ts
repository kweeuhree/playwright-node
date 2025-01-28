import { test, expect } from "@playwright/test";
import { baseUrl, clickMe, articlesApi } from "./testdata";

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test.describe("Articles", () => {
  test("10 articles total", async ({ page }) => {
    test.slow();
    // Start waiting for the response before clicking the button
    const responsePromise = page.waitForResponse((response) =>
      response.url().includes(articlesApi)
    );
    // Click the "Click me" button
    await page.getByRole("button", { name: clickMe }).click();
    await responsePromise;
    // Locate articles by their className property
    const articles = page.locator("div.white-bd");
    // Expect the page to have ten articles
    await expect(articles).toHaveCount(10);
  });

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
    const articles = await response.json();
    // Expect each article to have `url` and `title` attributes
    for (const article of articles) {
      await expect(page.getByText(article.title)).toBeVisible();
      await expect(
        page.getByRole("link", { name: article.url })
      ).toHaveAttribute("href", article.url);
    }
  });

  test("open in a new tab", async ({ page }) => {
    // Start waiting for the response before clicking the button
    const responsePromise = page.waitForResponse((response) =>
      response.url().includes(articlesApi)
    );
    // Click the "Click me" button
    await page.getByRole("button", { name: clickMe }).click();
    // Await and parse the response
    const response = await responsePromise;
    const articles = await response.json();
    for (const article of articles) {
      // Locate the article's link element
      const link = page.getByRole("link", { name: article.url });
      // Start waiting for new tab before clicking the link
      const newPagePromise = page.context().waitForEvent("page");
      // Click the article link
      await link.click();
      // Await new page
      const newPage = await newPagePromise;
      // Ensure the new tab is opened and contains the correct url
      await expect(newPage).toHaveURL(article.url);
      // Close the page
      await newPage.close();
    }
  });
});
