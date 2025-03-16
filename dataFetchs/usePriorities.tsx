"use client";

import { useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";

const usePriorities = () => {
  const [prioritiesData, setPrioritiesData] = useState<Priority[]>([]);

  const fetchPriorities = () => {
    axiosUser
      .get("priorities")
      .then((res) => {
        setPrioritiesData(res.data);
      })
      .catch(() => {
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchPriorities();
  }, []);

  return {
    prioritiesData,
    fetchPriorities,
  };
};

export default usePriorities;
