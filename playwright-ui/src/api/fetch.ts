const errorResponse = "Something went wrong.";

export const fetchArticles = async () => {
  const url = JSON.stringify({ url: "https://news.ycombinator.com/" });
  try {
    const response = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: url,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : errorResponse);
  }
};
