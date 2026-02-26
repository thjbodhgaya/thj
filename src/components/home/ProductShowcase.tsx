"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Cormorant_Garamond, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["600", "700"] });
const jost = Jost({ subsets: ["latin"], weight: ["400", "500", "700"] });

// type Item = {
//   id: string;
//   category: string;
//   title: string;
//   image: string;
// };

// const items: Item[] = [
//   { id: "01", category: "Pottery", title: "Hand-Thrown Vessel", image: "/Pot.png" },
//   { id: "02", category: "Sculpture", title: "Ancient Deity", image: "/Statues.png" },
//   { id: "03", category: "Artifact", title: "Ritual Bowl", image: "/Bowl.png" },
//   { id: "04", category: "Mask", title: "Ceremonial Face", image: "/item.png" },
//   { id: "05", category: "Metalware", title: "Temple Bell", image: "/decore.png" },
// ];

export default function StackedSliderLoop() {
  const [active, setActive] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [data, setData] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);


  useEffect(() => {
  fetch("https://thj-backend.onrender.com/api/product-showcase")
    .then(res => res.json())
    .then(res => {
      setData(res);
      setItems(res.sliderItems || []);
      setActive(0); 
    })
    .catch(() => {
      console.warn("Using fallback data");
    });
}, []);

  useEffect(() => {
       if (isHovering || items.length === 0) return; 
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [active, isHovering]);

  const getIndex = (offset: number) => {
    if (items.length === 0) return 0; //
    return (active + offset + items.length) % items.length;
  };

  const handleCardClick = (index: number) => {
    setActive(index);
  };

  const cardVariants = {
    active: { x: 0, opacity: 1, scale: 1, left: "0%", zIndex: 30, originY: 0 },
    next: { x: 0, opacity: 1, scale: 0.85, left: "45%", zIndex: 20, originY: 0 },
    upcoming: { x: 0, opacity: 0.8, scale: 0.70, left: "75%", zIndex: 10, originY: 0 },
    enter: { x: 50, opacity: 0, scale: 0.6, left: "90%", originY: 0 },
    exit: { opacity: 0, zIndex: 0, originY: 0 },
  };

  return (
    <section className={`${jost.className} w-full min-h-screen bg-[#fcfaf7] flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden`}>
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-[35%_65%] gap-8 lg:gap-16 items-center">
        
        {/* --- LEFT COLUMN: EDITORIAL TEXT --- */}
        <div className="space-y-8 z-10 text-center lg:text-left order-1">
          <div className="space-y-4">
            <span className="text-amber-800 text-[10px] uppercase tracking-[0.5em] font-bold">
               {data?.label}
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${cormorant.className} text-[52px] lg:text-[72px] font-bold text-stone-900 leading-[1.1]`}
            >
              {data?.heading?.split("\n").map((line: string, i: number) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ))}
            </motion.h1>
            <div className="w-12 h-[1px] bg-amber-800/40 hidden lg:block" />
          </div>

          <p className="text-stone-500 text-[16px] lg:text-[18px] leading-relaxed max-w-sm mx-auto lg:mx-0 font-light">
           {data?.description}
          </p>
          <a href={data?.buttonLink || "#"}>
          <button
    style={{
      backgroundColor: data?.buttonBgColor,
      color: data?.buttonTextColor,
    }} className="group relative overflow-hidden inline-flex items-center justify-center w-[220px] h-[58px] bg-stone-900 text-white text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-500 hover:bg-amber-900">
            <span className="relative z-10">  {data?.buttonText}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-1000" />
          </button>
          </a>
        </div>

        {/* --- RIGHT COLUMN: THE STACKED SLIDER --- */}
        <div 
          className="relative h-[450px] md:h-[600px] w-full flex items-center order-2"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="relative w-full h-full">
            <div className="relative w-full h-full"> 
              <AnimatePresence initial={false} mode="popLayout">
                {items.length > 0 &&
              [0, 1, 2]
                 .filter((o) => o < items.length) // 🔧 FIX #3
                .map((offset) => {
                  const itemIndex = getIndex(offset);
                  const item = items[itemIndex];
                  
                 if (!item) return null;

                  let state = "enter";
                  if (offset === 0) state = "active";
                  else if (offset === 1) state = "next";
                  else state = "upcoming";

                  return (
                    <motion.div
                      key={item.id || itemIndex}
                      layoutId={`card-${item.id || itemIndex}`}
                      variants={cardVariants}
                      initial="enter"
                      animate={state}
                      exit="exit"
                      transition={{ 
                        type: "spring", stiffness: 120, damping: 20,
                        opacity: { duration: 0.4 }
                      }}
                      onClick={() => handleCardClick(itemIndex)}
                      className="absolute top-0 w-[280px] md:w-[380px] h-[380px] md:h-[540px] rounded-none overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)] border-[10px] border-white origin-top cursor-pointer bg-stone-100"
                    >
                      <div className="relative w-full h-full group/card">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover grayscale-[20%] group-hover/card:grayscale-0 transition-all duration-700"
                          priority={offset === 0}
                        />
                        
                        {/* THE GALLERY TAG (Active Only) */}
                        {offset === 0 && (
                          <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-6 left-0 right-0 flex justify-center z-40"
                          >
                            <div className="w-[85%] bg-white/90 backdrop-blur-md p-6 shadow-xl border border-stone-200/50">
                              <div className="flex items-center gap-2 text-[9px] font-bold tracking-[0.4em] uppercase mb-1 text-amber-800">
                                <span>{item.id}</span>
                                <span className="w-4 h-[1px] bg-amber-800/30"></span>
                                <span>{item.category}</span>
                              </div>
                              <h3 className={`${cormorant.className} text-3xl text-stone-900`}>
                                {item.title}
                              </h3>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* MINIMALIST BAR PAGINATION */}
            <div className="absolute bottom-[-40px] lg:bottom-[40px] left-0 lg:left-[55%] flex items-center gap-4 z-40">
                {items.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleCardClick(idx)}
                        className={`transition-all duration-700 h-[2px] ${
                            active === idx 
                            ? "w-12 bg-stone-900" 
                            : "w-4 bg-stone-300 hover:bg-stone-400"
                        }`}
                    />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}