# Node.js Scraping Service

This Node.js application provides an API endpoint to run 2 scraping scripts. The first will scrape the first 100 articles from Hacker News and validates that the articles are sorted from newest to oldest. The second will scrape titles and urls of the first 10 articles. The service returns a validation confirmation and the 10 articles.

The server uses Express.js and Playwright for scraping. It features error handling, logging, and CORS configuration to control access.

The service is running off a Docker image and is deployed on Render.

Deployed service: [Node.js Scraping Service on Render](https://playwright-app.onrender.com)

## ❇️ Features

- Scrapes posting dates the first 100 articles from Hacker News.
- Scrapes titles and urls of the first ten articles from YCombinator.
- Validates and shows a message confirming the correct order of the first 100 articles.
- Uses Vitest for testing the application.

## 🔍 Prerequisites

Ensure that the following dependencies are installed on your machine:

- Node.js
- npm

Make sure the backend server is running locally before starting the frontend app.

## 💡API Specification

### Endpoint: Get articles data

- Path: `/api/articles`
- Method: `POST`
- Body: a url to Hacker News.
- Response: JSON containing an array of articles and a validation message.

Description:

Returns a JSON object with an array of articles, containing titles and urls, and a message validating that the first 100 articles are ordered from oldest to newest.

Example Request:

```json
{ "url": "https://news.ycombinator.com/newest" };
```

Example Response:

```json
{
  articles: [{ title: "Article 1", url: "https://scrape.com" }],
  validation: "EXACTLY the first 100 articles are sorted from newest to oldest",
};
```

## ▶️ Usage

- Clone or fork this repository;
- In the project folder, run the following command:

```bash
npm install
tsx ./src/index.ts
```

Make sure the backend server is running locally before running the local frontend application.

## 🚀 Testing

This project includes node runner tests for validateSort and throwError functions.
To run the tests, in the project folder, run the following command:

```bash
node --test ./tests
```
