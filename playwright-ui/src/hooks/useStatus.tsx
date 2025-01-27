import { useState } from "react";

export const useStatus = () => {
  const statusOptions = {
    fetched: "Already fetched!",
    loading: "Loading...",
    error: "Something went wrong.",
  };

  const [status, setStatus] = useState("");

  const setTimedStatus = (newStatus: string) => {
    setStatus(newStatus);
    setTimeout(() => {
      setStatus("");
    }, 500);
  };

  return { status, setStatus, statusOptions, setTimedStatus };
};
