"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  images: string[];
  title: string;
};

export default function Gallery({ images, title }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const index = Math.round(
      scrollRef.current.scrollLeft / scrollRef.current.clientWidth
    );
    setActiveIndex(index);
  };

  return (
    <div className="w-full">
      {/* ===== Mobile Slider ===== */}
      <div className="block md:hidden mb-6">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory aspect-[4/5] bg-[#f3f1ee] rounded-sm no-scrollbar"
        >
          {images.map((img, i) => (
            <div key={i} className="min-w-full relative flex items-center justify-center snap-center">
              <Image
                src={img}
                alt={`${title}-${i}`}
                fill
                className="object-cover p-4"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-3 mt-6">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-[1px] transition-all duration-500 ${
                activeIndex === i ? "w-8 bg-amber-700" : "w-4 bg-stone-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ===== Desktop Gallery ===== */}
      <div className="hidden md:flex gap-6 items-start">
        {/* Vertical Thumbnails */}
        <div className="flex flex-col gap-3 w-20">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative aspect-[1/1] bg-[#f3f1ee] transition-all duration-500 overflow-hidden group ${
                activeIndex === i ? "opacity-100 shadow-md" : "opacity-40 hover:opacity-70"
              }`}
            >
              <Image
                src={img}
                alt={`thumb-${i}`}
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              {activeIndex === i && (
                <div className="absolute inset-0 border border-amber-700/50" />
              )}
            </button>
          ))}
        </div>

        {/* Main Frame */}
        <div className="relative flex-1 bg-[#f3f1ee] aspect-[4/5] overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <Image
                src={images[activeIndex]}
                alt={title}
                fill
                priority
                className="object-cover p-8 transition-transform duration-[2000ms] group-hover:scale-110"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Subtle Corner Accents */}
          <div className="absolute top-4 left-4 w-4 h-[1px] bg-amber-700/30" />
          <div className="absolute top-4 left-4 h-4 w-[1px] bg-amber-700/30" />
        </div>
      </div>
    </div>
  );
}