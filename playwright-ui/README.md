# Scrape with Playwright

This is a simple React application using TypeScript and Vite. The page includes a button that, when clicked, sends an HTTP POST request to a remote server. The server will run two scraping scripts and, upon a successful response, the app displays the first ten articles from YCombinator. Additionally, it shows a message validating the correct order of the first 100 YCombinator articles.

The project is using Vitest for basic testing of the application.

Deployed service: [React application on Render](https://playwright-ui.onrender.com)

## ❇️ Features

- Sends an HTTP POST request to a remote server.
- Displays the first ten articles from YCombinator.
- Validates and shows a message confirming the correct order of the first 100 articles.
- Uses Vitest for testing the application.

## 🔍 Prerequisites

Ensure that the following dependencies are installed on your machine:

- Node.js
- npm

Make sure the backend server is running locally before starting the frontend app.

## ▶️ Usage

- Clone or fork this repository;
- In the project folder, run the following command:

```bash
npm install
npm run dev
```

Make sure the backend server is running locally before running `npm run dev`.

## 🚀 Testing

This project includes basic testing using Vitest.
To run the tests, in the project folder, run the following command:

```bash
npm run test
```
