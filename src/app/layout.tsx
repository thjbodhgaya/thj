import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SplashScreen from "../components/common/SplashScreen"; // We will create this below

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Tibetan Handicrafts Jewellery",
  description: "Authentic Tibetan handicrafts and jewellery",
  icons: {
    icon: "/logo.png",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        {/* The Splash Screen will overlay everything initially */}
        <SplashScreen />
        
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}