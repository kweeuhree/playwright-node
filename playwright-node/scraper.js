// Extract chromium from Playwright
const { chromium } = require("playwright");

// Define and declare asynchronous function that takes url as an argument
const scraper = async (url) => {
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

// Define and declare asynchronous function that takes url as an argument
const scrape = async (url) => {
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
    const result = [];

    // Loop through anchors
    anchors.forEach((anchor) => {
      // If result array length is less than ten push new element
      result.length < 10
        ? result.push([anchor.innerHTML, "-", anchor.href])
        : null;
    });

    return result.join("\n");
  });

  // Close browser instance
  browser.close();

  return links;
};

const prettify = (string) => {
  // Split the string by newlines to get an array of title-url pairs
  const articles = string.split("\n").map((item) => {
    const [title, url] = item.split(",-,");
    return { title, url };
  });

  return articles;
};

module.exports = scraper;
