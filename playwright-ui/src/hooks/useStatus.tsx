import { useState } from "react";

// useStatus() is a custom hook that allows managing a status message
// with predefined options and a timed reset feature
export const useStatus = () => {
  const [status, setStatus] = useState("");

  // Predefined status options
  const statusOptions = {
    fetched: "Already fetched!",
    loading: "Loading...",
    error: "Something went wrong.",
  };

  // setTimedStatus() sets a status message and clears it after a delay
  const setTimedStatus = (newStatus: string) => {
    setStatus(newStatus);
    setTimeout(() => {
      setStatus("");
    }, 500);
  };

  return { status, setStatus, statusOptions, setTimedStatus };
};
