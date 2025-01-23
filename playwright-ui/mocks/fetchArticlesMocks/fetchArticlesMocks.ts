interface MockResponse {
  title: string;
  url: string;
}

export const fetchArticlesMocks: MockResponse[] = [
  { title: "Article 111", url: "https://scrape.com" },
  { title: "Article 222", url: "https://news.com" },
  { title: "Article 333", url: "https://ycombinator.com" },
];
