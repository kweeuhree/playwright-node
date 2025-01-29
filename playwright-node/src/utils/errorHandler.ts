export const throwError = (message: string, err: Error) => {
  throw new Error(`ERROR\t${message}:\n\t${err}`);
};
