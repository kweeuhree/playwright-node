import { chromium, Page } from "playwright";

import { throwError, validateSort } from "./utils";

// Define desired length constants
export const ALMOST_DESIRED_LENGTH = 90;
export const DESIRED_LENGTH = 100;

const output = {
  success: "EXACTLY the first 100 articles are sorted from newest to oldest",
  failure: "failed to validate sorting",
};
// scraper() takes in url as an argument, launches a browser,
//  and returns an array of articles and order validation result or an error
export const scraper = async (url: string) => {
  // Launch browser
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const pageGetsArticles = await context.newPage();
  const pageValidatesOrder = await context.newPage();
  try {
    const [articles, dateStrings] = await Promise.all([
      scrapeArticles(pageGetsArticles, url),
      scrapeToValidate(pageValidatesOrder, url),
    ]);

    const validation =
      dateStrings && validateSort(dateStrings) === true
        ? output.success
        : output.failure;

    return { articles, validation };
  } catch (error: any) {
    throwError("failed at scraper", error.message);
  } finally {
    // Close browser instance
    await browser.close();
  }
};

// scrapeArticles() takes in url and a page as arguments, navigates to the specified url
// and scrapes first ten articles on the page
// returns an array of objects with strings
const scrapeArticles = async (page: Page, url: string) => {
  // Launch a headless browser instance
  try {
    // Go to the specified url
    await page.goto(url);
    // Evaluate page
    const links = await page.evaluate(() => {
      // Get all anchors that are children of 'titleline' spans
      const anchors = document.querySelectorAll("span.titleline > a");
      const result: { title: string; url: string }[] = [];

      // Loop through anchors
      anchors.forEach((anchor) => {
        const anch = anchor as HTMLAnchorElement;
        // If result array length is less than ten push new element
        result.length < 10
          ? result.push({ title: anch.innerHTML, url: anch.href })
          : null;
      });

      return result;
    });

    return links;
  } catch (error: any) {
    throwError("failed scraping artiles", error.message);
  }
};

// scrapeToValidate() takes in url and a page as arguments, navigates to the specified url
// and scrapes first 100 article date strings on the page
// returns an array with date strings
const scrapeToValidate = async (page: Page, url: string) => {
  try {
    // Go to Hacker News
    await page.goto(url);
    // Initalize dateStrings array that will hold the resultant date strings
    const dateStrings = [];
    // Use do...while loop to get the first 100 dateStrings
    do {
      // Get 30 articles per iteration
      const datesOf30Articles = await page.evaluate(() => {
        // Get all spans containing span with "age" attribute
        const ageSpans = document.querySelectorAll("span.age");
        // Initalize a datesArray array that will hold a datesArray of dateStrings
        const datesArray: string[] = [];
        ageSpans.forEach((span) => {
          const spanElement = span as HTMLSpanElement;
          // Get span's datetime string, split by space to remove milliseconds
          const date = spanElement.title.split(" ")[0];
          // Push new date into the array
          datesArray.push(new Date(date).toISOString());
        });
        // Return current datesArray of date strings
        return datesArray;
      });

      // In order to get exactly 100 dateStrings, push all strings or only push 10
      dateStrings.length !== ALMOST_DESIRED_LENGTH
        ? dateStrings.push(...datesOf30Articles)
        : dateStrings.push(...datesOf30Articles.slice(0, 10));

      // Do not click the button unless necessary
      if (dateStrings.length < DESIRED_LENGTH) {
        const loadPromise = page.waitForEvent("load");
        await page.waitForSelector("a.morelink", {
          state: "attached",
          timeout: 5000,
        });
        await page.locator("a.morelink").click({ force: true });
        await loadPromise;
      } else {
        break;
      }
      // Continue until dateStrings array achieves the desired length
    } while (dateStrings.length < DESIRED_LENGTH);

    return dateStrings;
  } catch (error: any) {
    console.log("failed scraping to validate", error.message);
    return error.message;
  }
};
