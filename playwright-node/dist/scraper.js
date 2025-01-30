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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scraper = exports.DESIRED_LENGTH = exports.ALMOST_DESIRED_LENGTH = void 0;
var playwright_1 = require("playwright");
var utils_1 = require("./utils");
// Define desired length constants
exports.ALMOST_DESIRED_LENGTH = 90;
exports.DESIRED_LENGTH = 100;
var output = {
    success: "EXACTLY the first 100 articles are sorted from newest to oldest",
    failure: "failed to validate sorting",
};
// scraper() takes in url as an argument, launches a browser,
//  and returns an array of articles and order validation result or an error
var scraper = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var browser, context, pageGetsArticles, pageValidatesOrder, _a, articles, dateStrings, validation, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, playwright_1.chromium.launch({ headless: true })];
            case 1:
                browser = _b.sent();
                return [4 /*yield*/, browser.newContext()];
            case 2:
                context = _b.sent();
                return [4 /*yield*/, context.newPage()];
            case 3:
                pageGetsArticles = _b.sent();
                return [4 /*yield*/, context.newPage()];
            case 4:
                pageValidatesOrder = _b.sent();
                _b.label = 5;
            case 5:
                _b.trys.push([5, 7, 8, 10]);
                return [4 /*yield*/, Promise.all([
                        scrapeArticles(pageGetsArticles, url),
                        scrapeToValidate(pageValidatesOrder, url),
                    ])];
            case 6:
                _a = _b.sent(), articles = _a[0], dateStrings = _a[1];
                validation = dateStrings && (0, utils_1.validateSort)(dateStrings) === true
                    ? output.success
                    : output.failure;
                return [2 /*return*/, { articles: articles, validation: validation }];
            case 7:
                error_1 = _b.sent();
                (0, utils_1.throwError)("failed at scraper", error_1.message);
                return [3 /*break*/, 10];
            case 8: 
            // Close browser instance
            return [4 /*yield*/, browser.close()];
            case 9:
                // Close browser instance
                _b.sent();
                return [7 /*endfinally*/];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.scraper = scraper;
// scrapeArticles() takes in url and a page as arguments, navigates to the specified url
// and scrapes first ten articles on the page
// returns an array of objects with strings
var scrapeArticles = function (page, url) { return __awaiter(void 0, void 0, void 0, function () {
    var links, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                // Go to the specified url
                return [4 /*yield*/, page.goto(url)];
            case 1:
                // Go to the specified url
                _a.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        // Get all anchors that are children of 'titleline' spans
                        var anchors = document.querySelectorAll("span.titleline > a");
                        var result = [];
                        // Loop through anchors
                        anchors.forEach(function (anchor) {
                            var anch = anchor;
                            // If result array length is less than ten push new element
                            result.length < 10
                                ? result.push({ title: anch.innerHTML, url: anch.href })
                                : null;
                        });
                        return result;
                    })];
            case 2:
                links = _a.sent();
                return [2 /*return*/, links];
            case 3:
                error_2 = _a.sent();
                (0, utils_1.throwError)("failed scraping artiles", error_2.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// scrapeToValidate() takes in url and a page as arguments, navigates to the specified url
// and scrapes first 100 article date strings on the page
// returns an array with date strings
var scrapeToValidate = function (page, url) { return __awaiter(void 0, void 0, void 0, function () {
    var dateStrings, datesOf30Articles, loadPromise, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 10, , 11]);
                // Go to Hacker News
                return [4 /*yield*/, page.goto(url)];
            case 1:
                // Go to Hacker News
                _a.sent();
                dateStrings = [];
                _a.label = 2;
            case 2: return [4 /*yield*/, page.evaluate(function () {
                    // Get all spans containing span with "age" attribute
                    var ageSpans = document.querySelectorAll("span.age");
                    // Initalize a datesArray array that will hold a datesArray of dateStrings
                    var datesArray = [];
                    ageSpans.forEach(function (span) {
                        var spanElement = span;
                        // Get span's datetime string, split by space to remove milliseconds
                        var date = spanElement.title.split(" ")[0];
                        // Push new date into the array
                        datesArray.push(new Date(date).toISOString());
                    });
                    // Return current datesArray of date strings
                    return datesArray;
                })];
            case 3:
                datesOf30Articles = _a.sent();
                // In order to get exactly 100 dateStrings, push all strings or only push 10
                dateStrings.length !== exports.ALMOST_DESIRED_LENGTH
                    ? dateStrings.push.apply(dateStrings, datesOf30Articles) : dateStrings.push.apply(dateStrings, datesOf30Articles.slice(0, 10));
                if (!(dateStrings.length < exports.DESIRED_LENGTH)) return [3 /*break*/, 7];
                loadPromise = page.waitForEvent("load");
                return [4 /*yield*/, page.waitForSelector("a.morelink", {
                        state: "attached",
                        timeout: 5000,
                    })];
            case 4:
                _a.sent();
                return [4 /*yield*/, page.locator("a.morelink").click({ force: true })];
            case 5:
                _a.sent();
                return [4 /*yield*/, loadPromise];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7: return [3 /*break*/, 9];
            case 8:
                if (dateStrings.length < exports.DESIRED_LENGTH) return [3 /*break*/, 2];
                _a.label = 9;
            case 9: return [2 /*return*/, dateStrings];
            case 10:
                error_3 = _a.sent();
                console.log("failed scraping to validate", error_3.message);
                return [2 /*return*/, error_3.message];
            case 11: return [2 /*return*/];
        }
    });
}); };
