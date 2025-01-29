# 🌐 YCombinator Articles Scraper with Playwright Tests

This repository contains a simple full-stack application that scrapes first ten articles from YCombinator.
The goal of the project is to provide integration tests using Playwright to ensure that the application functions as expected.
The application is deployed on Render, with the backend being served from a Docker image.

Deployed frontend service: [React application on Render](https://playwright-ui.onrender.com)
Deployed backend service: [Node.js Scraping Service on Render](https://playwright-app.onrender.com)

## 🧱 Project structure

**Backend (Node.js+TypeScript, Docker)**: scrapes YCombinator's latest 10 articles.

**Frontend (React.js+TypeScript)**: displays the articles, provides a button to trigger the request, and displays relevant status messages.

**Playwright Tests**: ensure that the application works as expected.

## 🔍 Prerequisites

- Node.js
- npm

## ▶️ Usage

As the application is hosted on Render on a free tier, the Node **server requires up 60 seconds to spin up** after a period of inactivity.
Please, be advised, that due to the aformentioned reason, some Playwright tests may fail unless the React application is interacted with first.
To ensure that the tests pass, **follow the usage guide** below:

- Navigate to [React application](https://playwright-ui.onrender.com/);
- Click the `Click me` button;
- Await for the remote server to be spun up;
- Await for the successful response.

Now the Playwright tests can be run.

#### Run the Tests

- Make sure all necessary dependencies are installed;
- Clone or fork this repository;
- In the project folder, run the following command:

```bash
npm install
npx playwright test
```

## 🎭 Testing with Playwright

Tests are grouped into following files:

- **Api**: tests request and response headers;
- **Articles**: tests the amount and structure of displayed articles, ensures that each article opens in a new tab;
- **Button**: tests button style changes;
- **Page**: ensures that the main page has title, header, button, and displays all expected objects;
- **Status**: tests status message displayed to the user under various scenarios;
- **testdata**: abstracts data that is reused across tests.

Articles tests are run in parallel as they are slow.

## ⚙️ Continuous Integration

In order to automate the testing, a GitHub Actions workflow is set up. The workflow executes all existing tests on push to the master branch of the repository. This helps to ensure code quality and catch issues early on.
