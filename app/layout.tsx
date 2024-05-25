import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-toggle/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import AuthContext from "./context/AuthContext";
import ActiveStatus from "@/components/ActiveStatus";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatty",
  description: "Chatty | Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthContext>
            <Toaster />
            <ActiveStatus />
            {children}
          </AuthContext>
        </ThemeProvider>
      </body>
    </html>
  );
}
