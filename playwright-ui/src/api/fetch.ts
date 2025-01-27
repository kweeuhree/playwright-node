// Determine the target API endpoint based on the environment
const target =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_LOCALHOST // Local development server
    : import.meta.env.VITE_ON_RENDER; // Production server

// fetchArticles() attempts to fetch articles from the API
export const fetchArticles = async () => {
  // Prepare the request string
  const url = JSON.stringify({ url: "https://news.ycombinator.com/" });
  try {
    // Attempt sending a POST request to the remote server
    const response = await fetch(`${target}/api/articles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: url,
    });

    // Check if the response is successful
    if (response.ok) {
      // Parse the JSON response
      const data = await response.json();
      return data;
    }
  } catch (error) {
    // Catch and handle errors
    throw new Error(
      error instanceof Error ? error.message : "failed to fetch articles"
    );
  }
};
