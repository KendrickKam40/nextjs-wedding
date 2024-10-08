import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import UserProvider from "@/app/contextProvider"

import { AuthProvider } from '@/app/AuthContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Annissa & Kendrick",
  description: "Wedding RSVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
