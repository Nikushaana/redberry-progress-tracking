"use client";

import { createContext, useEffect, useState } from "react";

export type SharedStatesType = {
  addEmployeeModalStatus: boolean;
  setAddEmployeeModalStatus: (status: boolean) => void;
};

export const SharedStates = createContext<SharedStatesType>({
  addEmployeeModalStatus: false,
  setAddEmployeeModalStatus: () => {},
});

export const SharedStatesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [addEmployeeModalStatus, setAddEmployeeModalStatus] = useState(false);

  useEffect(() => {
    if (addEmployeeModalStatus) {
      document.body.classList.add("popup-open");
    } else {
      document.body.classList.remove("popup-open");
    }
  }, [addEmployeeModalStatus]);

  return (
    <SharedStates.Provider
      value={{ addEmployeeModalStatus, setAddEmployeeModalStatus }}
    >
      {children}
    </SharedStates.Provider>
  );
};
