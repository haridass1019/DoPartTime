import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Do Part Time",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} page-wrapper`}>
        <div className="navbar">
          <Navbar/>
        </div>
        <main className="flex-1 overflow-y-auto" style={{ backgroundColor: '#F2F2F4' }}>
          <div className="homepage-wrapper">
            {children}
          </div>
        </main>
        <Footer/>
      </body>
    </html>
  );
}
