"use client";

import { useState, useEffect, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { useRouter } from "next/navigation";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400"] });

type Item = {
  title: string;
  image: string;
  slug: string;
  order: number;
};

type CategorySlider = {
  heading: string;
  description: string;
  items: Item[];
};

export default function Category() {
  const [data, setData] = useState<CategorySlider | null>(null);
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    fetch("https://thj-backend.onrender.com/api/category-slider")
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!data) return null;

  const items = [...data.items].sort((a, b) => a.order - b.order);

  const next = () => setActive(p => (p + 1) % items.length);
  const prev = () => setActive(p => (p - 1 + items.length) % items.length);

  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -60 || velocity < -600) next();
    else if (offset > 60 || velocity > 600) prev();

  };

  return (
    <section
      ref={sectionRef}
      className={`pt-12 pb-16 overflow-hidden bg-[#ffffff] ${jost.className}`}
    >
      {/* Title */}
      <div className="text-center mb-10 sm:mb-12 md:mb-14 px-4">

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-amber-700 text-[11px] uppercase tracking-[0.4em] font-bold block mb-4"
        >
          Collections
        </motion.span>
        <h2 className={`${cormorant.className} text-stone-900 text-4xl md:text-5xl lg:text-6xl mb-6`}>
          Shop by <span className="italic font-light text-stone-500">Category</span>
        </h2>
        <p className="max-w-2xl mx-auto text-stone-500 text-base md:text-lg leading-relaxed font-light">
          {data.description}
        </p>
      </div>

      {/* Slider */}
      <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center">

        {!isMobile && (
          <button onClick={prev}
            className="group relative z-20 overflow-hidden flex items-center justify-center w-14 h-14 rounded-full bg-[#2E2E2E] text-white transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:scale-[0.97] absolute left-4"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        {/* Slides */}
        <div className="relative w-full h-[400px] sm:h-[420px] md:h-[440px] flex items-center justify-center touch-pan-y">
          {items.map((item, i) => {
            const prevIndex = (active - 1 + items.length) % items.length;
            const nextIndex = (active + 1) % items.length;

            let state: "center" | "left" | "right" | "hidden" = "hidden";

            if (i === active) state = "center";
            else if (i === prevIndex) state = "left";
            else if (i === nextIndex) state = "right";

            return (
              <motion.div
                key={i}

                onClick={() => router.push(`/products?category=${item.slug}`)}

                animate={state}

                drag={isMobile ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}

                dragElastic={0.18}

                dragMomentum={true}

                dragTransition={{
                  power: 0.25,
                  timeConstant: 220,
                  modifyTarget: target => Math.round(target)
                }}

                onDragEnd={onDragEnd}
                whileTap={{ scale: isMobile ? 0.96 : 1 }}
                whileHover={
                  !isMobile
                    ? { scale: state === "center" ? 1.18 : 0.92 }
                    : undefined
                }
                variants={
                  isMobile
                    ? {
                        center: {
                          x: 0,
                          scale: 1,
                          opacity: 1,
                          zIndex: 10,
                          transition: {
                            type: "spring",
                            stiffness: 180,
                            damping: 24,
                            mass: 0.9
                          }
                        },

                        left: {
                          x: "-110%",
                          scale: 0.92,
                          opacity: 0.4,
                          zIndex: 5,
                          transition: {
                            type: "spring",
                            stiffness: 180,
                            damping: 26
                          }
                        },

                        right: {
                          x: "110%",
                          scale: 0.92,
                          opacity: 0.4,
                          zIndex: 5,
                          transition: {
                            type: "spring",
                            stiffness: 180,
                            damping: 26
                          }
                        },

                        hidden: {
                          opacity: 0,
                          scale: 0.85,
                          transition: { duration: 0.25 }
                        }
                      }
                    : {
                        center: { x: 0, scale: 1.15, opacity: 1, zIndex: 10 },
                        left: { x: -340, scale: 0.85, opacity: 0.9, zIndex: 1 },
                        right: { x: 340, scale: 0.85, opacity: 0.9, zIndex: 1 },
                        hidden: { x: 0, opacity: 0, scale: 0.7, zIndex: 0 },
                      }
                }
                transition={
                  isMobile
                    ? undefined
                    : state === "center"
                    ? { type: "spring", stiffness: 260, damping: 18, bounce: 0.45 }
                    : { duration: 0.5, ease: "easeInOut" }
                }

                className={`absolute ${
                  isMobile && state !== "center"
                    ? "pointer-events-none"
                    : "cursor-grab active:cursor-grabbing"
                }`}

                style={{
                  zIndex: state === "center" ? 10 : 0,
                  willChange: "transform"
                }}
              >

                <div className={`relative w-[260px] sm:w-[300px] h-[340px] sm:h-[380px] rounded-[10px] overflow-hidden transition-all duration-300 bg-white ${
                  state === "center"
                    ? "shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
                    : "shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
                }`}>

                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover pointer-events-none"
                    priority={i === active}
                  />

                </div>

                {(!isMobile || state === "center") && (
                  <p className="text-center mt-5 text-[20px] font-semibold text-[#333333]">
                    {item.title}
                  </p>
                )}
            </motion.div>
            );
          })}
        </div>

        {!isMobile && (
          <button onClick={next}
            className="group relative z-20 overflow-hidden flex items-center justify-center w-14 h-14 rounded-full bg-[#2E2E2E] text-white transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:scale-[0.97] absolute right-4"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>
    </section>
  );
}