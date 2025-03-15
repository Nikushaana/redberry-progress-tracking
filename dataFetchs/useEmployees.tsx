"use client";

import { useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";

const useEmployees = () => {
  const [employeesData, setEmployeesData] = useState<Employee[]>([]);

  const fetchEmployees = () => {
    axiosUser
      .get("employees")
      .then((res) => {
        setEmployeesData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employeesData,
    fetchEmployees,
  };
};

export default useEmployees;
