"use client";


import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { usePathname } from "next/navigation";
import StoreProvider from './StoreProvider';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/register" || pathname === "/login";

  return (
    <html lang="en" suppressHydrationWarning={false}>
      <body suppressHydrationWarning={false}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>

          {!isAuthPage && <Header />}
          {children}
          {!isAuthPage && <Footer />}
          </StoreProvider>
      </body>
    </html>
  );
}
