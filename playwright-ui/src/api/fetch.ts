const target =
  import.meta.env.VITE_NODE_ENV === "development"
    ? import.meta.env.VITE_LOCALHOST
    : import.meta.env.VITE_ON_RENDER;

export const fetchArticles = async () => {
  const url = JSON.stringify({ url: "https://news.ycombinator.com/" });
  try {
    const response = await fetch(`${target}/api/articles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: url,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "failed to fetch articles"
    );
  }
};
