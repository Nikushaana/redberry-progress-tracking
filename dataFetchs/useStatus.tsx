"use client";

import { useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";

const useStatus = () => {
  const [statusData, setStatusData] = useState<Status[]>([]);

  const fetchStatus = () => {
    axiosUser
      .get("statuses")
      .then((res) => {
        setStatusData(res.data);
      })
      .catch(() => {
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return {
    statusData,
    fetchStatus,
  };
};

export default useStatus;
