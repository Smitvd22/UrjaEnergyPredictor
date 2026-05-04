"use client";

import { useState, useEffect } from "react";

export function useReportStream(initialInputs) {
  const [inputs, setInputs] = useState(initialInputs);
  const [liveStatus, setLiveStatus] = useState("connected");
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    if (initialInputs) {
      setInputs(initialInputs);
    }
  }, [initialInputs]);

  useEffect(() => {
    setLastUpdated(new Date());
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return { inputs, liveStatus, lastUpdated };
}
