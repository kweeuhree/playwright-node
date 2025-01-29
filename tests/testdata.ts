// Define base user-facing application url
export const baseUrl = "https://playwright-ui.onrender.com";

// Predefined status options
export const statusOptions = {
  fetched: "Already fetched!",
  loading: "Loading...",
  error: "Something went wrong.",
};

// Button name
export const clickMe = "Click me";

// Articles endpoint
export const articlesApi = "/api/articles";

// Mock successful server response
export const successfulResponse = {
  articles: [{ title: "Article 1", url: "https://scrape.com" }],
  validation: "valid",
};
