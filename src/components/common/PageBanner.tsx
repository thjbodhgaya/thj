"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Cormorant_Garamond, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400"] });

interface PageBannerProps {
  title: string;
  breadcrumb?: string;
  imageSrc: string;
  overlayOpacity?: number;
}

export default function PageBanner({
  title,
  breadcrumb,
  imageSrc,
  overlayOpacity = 0.4,
}: PageBannerProps) {
  return (
    <section className="relative w-full h-[350px] md:h-[450px] overflow-hidden flex items-center justify-center bg-stone-900 mt-15">
      
      {/* BACKGROUND IMAGE WITH PARALLAX EFFECT */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          className="object-cover opacity-60 grayscale-[30%]"
        />
        {/* Subtle Dark Gradient for text readability */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-transparent to-stone-900/60" 
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 w-full max-w-[1440px] px-6 lg:px-16 flex flex-col items-center text-center">
        
        {/* SMALL TOP LABEL (Optional Kinetic Element) */}
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${jost.className} text-[10px] uppercase tracking-[0.6em] text-amber-500/80 mb-4`}
        >
          Tibetan Arts Archive
        </motion.span>

        {/* MAIN TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`${cormorant.className} text-white text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight`}
        >
          {title}
        </motion.h1>

        {/* BREADCRUMB */}
        {breadcrumb && (
          <motion.nav 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`${jost.className} flex items-center gap-4 mt-8 text-white/60 text-[11px] uppercase tracking-[0.3em]`}
          >
            <Link
              href="/"
              className="hover:text-amber-500 transition-colors duration-300"
            >
              Studio
            </Link>

            <ChevronRight size={12} className="text-white/30" strokeWidth={1} />

            <span className="text-white/90 font-light">{breadcrumb}</span>
          </motion.nav>
        )}

        {/* KINETIC DECORATIVE LINE */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "40px" }}
          transition={{ delay: 0.8, duration: 1 }}
          className="h-[1px] bg-amber-500 mt-10"
        />
      </div>

      {/* BOTTOM MASK (For smooth transition to page content) */}
      {/* <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#fcfaf7] to-transparent" /> */}
    </section>
  );
}