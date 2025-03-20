import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header/header";
import AddEmployeeModal from "./components/modals/addEmployeeModal";
import { SharedStatesProvider } from "../../dataFetchs/sharedStates";
import { ToastContainer } from "react-toastify";
import { EmployeesContextProvider } from "../../dataFetchs/useEmployees";
import { TasksContextProvider } from "../../dataFetchs/useTasks";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Redberry Progress Tracking",
  description: "Developed By Nikusha",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div></div>}>
          <SharedStatesProvider>
            <EmployeesContextProvider>
              <TasksContextProvider>
                <div>
                  <Header />
                  {children}
                  <AddEmployeeModal />
                </div>
              </TasksContextProvider>
            </EmployeesContextProvider>
          </SharedStatesProvider>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="light"
          />
        </Suspense>
      </body>
    </html>
  );
}
