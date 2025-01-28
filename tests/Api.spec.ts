import { test, expect } from "@playwright/test";
import { baseUrl, clickMe, articlesApi } from "./testdata";

test.beforeEach(async ({ page }) => {
  await page.goto(baseUrl);
});

test.describe("Api", () => {
  test("sets correct headers", async ({ page }) => {
    // Start waiting for the request before clicking the button
    const requestPromise = page.waitForRequest((request) =>
      request.url().includes(articlesApi)
    );
    // Click the "Click me" button
    await page.getByRole("button", { name: clickMe }).click();
    // Wait for the request to proceed
    const request = await requestPromise;
    // Check headers
    const headers = request.headers();
    expect(headers["content-type"]).toEqual("application/json"); // Check the content-type header
  });

  test("receives correct headers", async ({ page }) => {
    // Start waiting for the response before clicking the button
    const responsePromise = page.waitForResponse((response) =>
      response.url().includes(articlesApi)
    );
    // Click the "Click me" button
    await page.getByRole("button", { name: clickMe }).click();
    const response = await responsePromise;
    // Expect request header to equal "application/json"
    const headers = response.headers();
    expect(headers["content-type"]).toEqual("application/json; charset=utf-8");
  });
});
