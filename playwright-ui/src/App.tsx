import { useState } from "react";

import { useStatus } from "./hooks";
import { fetchArticles } from "./api";

import "./App.css";

// Define Article interface
interface Article {
  title: string;
  url: string;
}

// Article displays url and title of an article
const Article = ({ url, title }: Article) => {
  return (
    <div key={url} className="white-bd white-hover pd-2 m-02">
      <p>{title}</p>
      {/* Open url in a new tab */}
      <a href={url} target="_blank">
        {url}
      </a>
    </div>
  );
};

// Main component
export const App = () => {
  // useStatus() will provide relevant fetching status, and allow to set the status
  const { status, setStatus, statusOptions, setTimedStatus } = useStatus();
  // Set state that will track display of fetched data
  const [display, setDisplay] = useState<Article[]>([]);
  // Define a variable that will track whether data for display is fetched
  const fetched = display.length > 0;

  // alreadyFetched() sets a relevant status if data has been already fetched
  const alreadyFetched = () => {
    setTimedStatus(statusOptions.fetched);
  };

  // getArticles() attempts to make a call to the remove server and sets a relevant operation status
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

  // handleClick() determines whether articles should be fetched or no
  const handleClick = () => {
    return fetched ? alreadyFetched() : getArticles();
  };

  return (
    <div>
      <header>
        <h2>Get YCombinator articles!</h2>
      </header>
      {/* If data has been fetched, change button color to gray */}
      <button className={fetched ? "gray" : ""} onClick={handleClick}>
        Click me
      </button>
      {/* Display operation status if exists */}
      <div>{status !== "" && status}</div>
      {/* Display an Article component per each object in state */}
      {display && display.map((article) => <Article {...article} />)}
    </div>
  );
};
