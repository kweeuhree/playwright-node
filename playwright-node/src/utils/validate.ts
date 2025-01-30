export const validateSort = (dateStrings: string[]) => {
  // If date strings is a single string, it means it holds an error, return
  if (typeof dateStrings === "string") {
    return false;
  }
  // Verify order of dates
  return dateStrings.every((element, index, arr) => {
    if (index === 0) return true;
    return arr[index - 1] >= element;
  });
};
