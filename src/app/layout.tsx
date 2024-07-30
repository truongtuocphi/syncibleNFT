import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TW_ENGINE_URL",
  description:
    "TW_ENGINE_URL starter template for using thirdweb SDK with Next.js App router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThirdwebProvider>
        <body
          className={`${inter.className} w-full min-h-screen bg-custom-image bg-cover bg-center`}
        >
          <Navbar />
          {children}
          <Footer />
        </body>
      </ThirdwebProvider>
    </html>
  );
}
