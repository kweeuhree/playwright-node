// format() takes in string as an argument and
// splits each item in the string into title:url pairs
// returns an array of objects with strings
export const format = (string: string) => {
  // Split the string by newlines to get an array of title-url pairs
  const articles = string.split("\n").map((item) => {
    const [title, url] = item.split(",-,");
    return { title, url };
  });

  return articles;
};
