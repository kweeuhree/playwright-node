import { useState } from "react";

export const useStatus = () => {
  const statusOptions = {
    fetched: "Already fetched!",
    loading: "Loading...",
  };

  const [status, setStatus] = useState("");

  return { status, setStatus, statusOptions };
};
