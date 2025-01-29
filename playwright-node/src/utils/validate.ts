export const validateSort = (dateStrings: string[]) => {
  if (typeof dateStrings === "string") {
    return dateStrings;
  }
  return dateStrings.every((element, index, arr) => {
    if (index === 0) return true;
    return arr[index] >= element;
  });
};
