"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Cormorant_Garamond } from "next/font/google";
import Image from "next/image";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function SplashScreen() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // ensure first paint happens

    const hasSeenSplash = sessionStorage.getItem("seenSplash");

    if (hasSeenSplash) {
      // small delay so animations mount at least once
      setTimeout(() => setLoading(false), 600);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("seenSplash", "true");
    }, 3000);

    document.body.style.overflow = "unset";

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#fcfaf7]"
        >
          {/* LOGO */}
          <div className="relative flex items-center justify-center">
            <motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
  className="absolute w-40 h-40 border-t border-b border-amber-600/20 rounded-full"
/>


           <motion.div
  initial={{ scale: 0.7, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 5, ease: [0.22, 1, 0.36, 1] }}
  className="relative w-32 h-32"
>

              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>

          {/* TEXT */}
          <div className="mt-12 text-center px-4">
           <motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 5, ease: [0.22, 1, 0.36, 1] }}
  className={`${cormorant.className} text-2xl md:text-3xl tracking-[0.4em] text-stone-900 uppercase`}
>

              Tibetan Archive
            </motion.h1>

            <motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 5, ease: "easeInOut" }}
  className="text-[10px] uppercase tracking-[0.2em] text-amber-700 mt-4 font-sans font-semibold"
>

              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Curating Sacred Artifacts...
              </motion.span>
            </motion.p>
          </div>

          {/* PROGRESS LINE */}
          <div className="absolute bottom-24 w-64 h-[1px] bg-stone-200 overflow-hidden">
         <motion.div
  initial={{ x: "-100%" }}
  animate={{ x: "0%" }}
  transition={{ duration: 5, ease: "easeInOut" }}
  className="w-full h-full bg-amber-800"
/>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
