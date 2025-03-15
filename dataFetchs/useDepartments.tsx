"use client";

import { useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";

const useDepartments = () => {
  const [departmentsData, setDepartmentsData] = useState<Department[]>([]);

  const fetchDepartments = () => {
    axiosUser
      .get("departments")
      .then((res) => {
        setDepartmentsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return {
    departmentsData,
    fetchDepartments,
  };
};

export default useDepartments;
