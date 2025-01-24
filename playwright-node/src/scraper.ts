import { chromium } from "playwright";

// scraper() takes in url as an argument and returns an array of articles or an error
export const scraper = async (url: string) => {
  try {
    const scrapedStr = await scrape(url);
    if (scrapedStr) {
      const articles = prettify(scrapedStr);
      return articles;
    }
  } catch (error) {
    throw new Error("failed to scrape");
  }
};

// scrape() takes in url as an argument, launches a new chromium window,
// navigates to the specified url and scrapes first ten articles on the page
// returns an array of objects with strings
const scrape = async (url: string) => {
  // Launch a headless browser instance
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  // Open a new page
  const page = await context.newPage();
  // Go to the specified url
  await page.goto(url);

  // Evaluate page
  const links = await page.evaluate(() => {
    // Get all anchors that are children of 'titleline' spans
    const anchors = document.querySelectorAll("span.titleline > a");
    const result: string[][] = [];

    // Loop through anchors
    anchors.forEach((anchor) => {
      const anch = anchor as HTMLAnchorElement;
      // If result array length is less than ten push new element
      result.length < 10 ? result.push([anch.innerHTML, "-", anch.href]) : null;
    });

    return result.join("\n");
  });

  // Close browser instance
  browser.close();

  return links;
};

// prettify() takes in string as an argument and
// splits each item in the string into title:url pairs
// returns an array of objects with strings
const prettify = (string: string) => {
  // Split the string by newlines to get an array of title-url pairs
  const articles = string.split("\n").map((item) => {
    const [title, url] = item.split(",-,");
    return { title, url };
  });

  return articles;
};
