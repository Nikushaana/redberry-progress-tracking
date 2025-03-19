"use client";

import { createContext, useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";

export type EmployeesContextType = {
  employeesData: Employee[];
  fetchEmployees: () => void;
};

export const Employees = createContext<EmployeesContextType>({
  employeesData: [],
  fetchEmployees: () => {},
});

export const EmployeesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [employeesData, setEmployeesData] = useState<Employee[]>([]);

  const fetchEmployees = () => {
    axiosUser
      .get("employees")
      .then((res) => {
        setEmployeesData(res.data);
      })
      .catch(() => {})
      .finally(() => {});
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <Employees.Provider value={{ employeesData, fetchEmployees }}>
      {children}
    </Employees.Provider>
  );
};
