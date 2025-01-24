import { chromium } from "playwright";

// scraper() takes in url as an argument and returns an array of articles or an error
export const scraper = async (url: string) => {
  try {
    console.log("attempting to scrape");
    const scrapedStr = await scrape(url);
    console.log("scraped");
    if (scrapedStr) {
      console.log("attempting to prettify");
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
  console.log("Chromium Executable Path:", chromium.executablePath());
  // Launch a headless browser instance in a cloud mode
  console.log("attempting to launch chromium");
  try {
    const browser = await chromium.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--single-process",
        "--disable-gpu",
      ],
    });
    console.log("Chromium launched successfully!");
    console.log("attempting to create new context");
    const context = await browser.newContext();
    // Open a new page
    console.log("attempting to open a new page");
    const page = await context.newPage();
    console.log("attempting to go to page");
    // Go to the specified url
    await page.goto(url, { timeout: 60000 });
    console.log("attempting to evaluate");
    // Evaluate page
    const links = await page.evaluate(() => {
      // Get all anchors that are children of 'titleline' spans
      const anchors = document.querySelectorAll("span.titleline > a");
      const result: string[][] = [];

      // Loop through anchors
      anchors.forEach((anchor) => {
        const anch = anchor as HTMLAnchorElement;
        // If result array length is less than ten push new element
        result.length < 10
          ? result.push([anch.innerHTML, "-", anch.href])
          : null;
      });

      return result.join("\n");
    });

    // Close browser instance
    browser.close();

    return links;
  } catch (error) {
    console.error("Failed to launch Chromium:", error);
  }
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
