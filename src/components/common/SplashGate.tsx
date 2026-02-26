"use client";

import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

export default function SplashGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("seenSplash");

    if (hasSeen) {
      setTimeout(() => setShowApp(true), 500);
      return;
    }

    setTimeout(() => {
      sessionStorage.setItem("seenSplash", "true");
      setShowApp(true);
    }, 5000); // HARD 5 seconds guaranteed
  }, []);

  if (!showApp) return <SplashScreen />;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
