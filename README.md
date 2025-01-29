# 🌐 YCombinator Articles Scraper with Playwright Tests

This repository contains a simple full-stack application that scrapes articles from YCombinator.
The first ten articles are scraped for their titles and URLs, which are then displayed in the React application. The first 100 articles are scraped for their timestamps, and their order is validated.

The goal of this project is to implement integration tests using Playwright to ensure the application functions as expected.

The application is deployed on Render, with the backend running in a Docker container.

Deployed frontend service: [React application on Render](https://playwright-ui.onrender.com)

Deployed backend service: [Node.js Scraping Service on Render](https://playwright-app.onrender.com)

## Screenshots

<p align="center">
<img  width="600" src="https://github.com/kweeuhree/playwright-node/blob/master/screencapture/landing.png?raw=true" alt="Landing page" />
<img  width="600" src="https://github.com/kweeuhree/playwright-node/blob/master/screencapture/success.png?raw=true" alt="Successful response result" />
</p>

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

## 📚 Challenges and learning

**Playwright**
While scraping 100 articles, had some struggles with clicking on an element, which seems to be solved with forcing the click and awating the loading of the page:

```typescript
const loadPromise = page.waitForEvent("load");
await page.waitForSelector("a.morelink", {
  state: "attached",
  timeout: 5000,
});
await page.locator("a.morelink").click({ force: true });
await loadPromise;
```

**Docker**
This was my first time using Docker.

Initially, I tried to deploy the service without a Docker image, but the deployment failed due to issues installing Playwright browsers and necessary dependencies in the cloud. I would run into request timeout issues or authorization issues.

The solution was to create an environment that will contain all of the necessary dependencies. The official Playwright image builds blazingly fast compared to manually installing the dependencies.

The service is using the latest official Playwright image, which is deployed on Render on a free tier.
