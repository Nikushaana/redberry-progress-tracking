import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header/header";

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
        <div>
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
