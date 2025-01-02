// src/layout/MainLayout.js
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Modern Todo App",
  description: "A modern todo app with dark mode and load testing features",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-gray-950">
      <body className={`${inter.className} text-white`}>
        {children}
      </body>
    </html>
  );
}
