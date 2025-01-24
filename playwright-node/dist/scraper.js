"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Extract chromium from Playwright
const { chromium } = require("playwright");
// Define and declare asynchronous function that takes url as an argument
const scraper = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scrapedStr = yield scrape(url);
        if (scrapedStr) {
            const articles = prettify(scrapedStr);
            return articles;
        }
    }
    catch (error) {
        throw new Error("failed to scrape");
    }
});
// Define and declare asynchronous function that takes url as an argument
const scrape = (url) => __awaiter(void 0, void 0, void 0, function* () {
    // Launch a headless browser instance
    const browser = yield chromium.launch({ headless: true });
    const context = yield browser.newContext();
    // Open a new page
    const page = yield context.newPage();
    // Go to the specified url
    yield page.goto(url);
    // Evaluate page
    const links = yield page.evaluate(() => {
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
});
const prettify = (string) => {
    // Split the string by newlines to get an array of title-url pairs
    const articles = string.split("\n").map((item) => {
        const [title, url] = item.split(",-,");
        return { title, url };
    });
    return articles;
};
module.exports = scraper;
