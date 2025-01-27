import { useState } from "react";

import { useStatus } from "./hooks";
import { fetchArticles } from "./api";

import "./App.css";

interface Article {
  title: string;
  url: string;
}

export const App = () => {
  const { status, setStatus, statusOptions, setTimedStatus } = useStatus();
  const [display, setDisplay] = useState<Article[]>([]);

  const fetched = display.length > 0;

  const alreadyFetched = () => {
    setTimedStatus("");
  };

  const getArticles = async () => {
    setStatus(statusOptions.loading);
    try {
      const articles = await fetchArticles();
      if (articles) {
        setDisplay(articles);
        setStatus("");
      }
    } catch {
      setStatus(statusOptions.error);
    }
  };

  const handleClick = () => {
    return fetched ? alreadyFetched() : getArticles();
  };

  return (
    <div>
      <header>
        <h2>Get YCombinator articles!</h2>
      </header>
      <button className={fetched ? "gray" : ""} onClick={handleClick}>
        Click me
      </button>
      <div>{status !== "" && status}</div>
      {display &&
        display.map((art) => (
          <div key={art.url} className="white-bd white-hover pd-2 m-02">
            <p>{art.title}</p>
            <a href={art.url} target="blank">
              {art.url}
            </a>
          </div>
        ))}
    </div>
  );
};
