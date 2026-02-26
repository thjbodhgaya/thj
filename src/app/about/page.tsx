"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import PageBanner from "../../components/common/PageBanner";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cormorant_Garamond, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "600"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "600"] });

export default function AboutPage() {
  const [data, setData] = useState<any>(null);
   /* ================= FETCH FROM BACKEND ================= */
  useEffect(() => {
    axios
      .get("https://thj-backend.onrender.com/api/about")
      .then((res) => setData(res.data))
      .catch((err) => console.error("About fetch failed", err));
  }, []);

  /* ================= SAFETY GUARD ================= */
  if (!data) {
    return (
      <div className="h-[600px] flex items-center justify-center text-stone-400 italic">
        Loading About Page…
      </div>
    );
  }
  return (
    <div className={`bg-[#fcfaf7] ${jost.className}`}>
     <PageBanner
        title={data.banner.title}
        breadcrumb={data.banner.breadcrumb}
        imageSrc={data.banner.image}
      />

      <section className="py-20 lg:py-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* LEFT: STORYTELLING CONTENT */}
            <div className="lg:col-span-5 space-y-8">
              <header className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.5em] text-amber-700 font-bold">
                  {data.intro.tag}
                </span>
                <h2 className={`${cormorant.className} text-5xl lg:text-7xl text-stone-900 leading-[1.1]`}>
                 {data.intro.heading1} <br /> 
                  <span className="italic">{data.intro.heading2}</span>
                </h2>
              </header>

              <div className="space-y-6 text-stone-500 text-lg leading-relaxed font-light">
                <p>
                  {data.intro.para1}
                </p>
                <p>
                  {data.intro.para2}
                </p>
              </div>

              <div className="pt-8">
                <Link
                  href={data.intro.buttonLink}
                  className="inline-flex items-center justify-center px-10 py-5 bg-stone-900 text-white text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-amber-800 transition-all duration-500 group shadow-xl"
                >
                    {data.intro.buttonText}
                  <motion.span 
                    animate={{ x: [0, 5, 0] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="ml-4"
                  >
                    →
                  </motion.span>
                </Link>
              </div>
            </div>

            {/* RIGHT: KINETIC IMAGE GRID */}
            <div className="lg:col-span-7 relative">
              <div className="grid grid-cols-12 gap-4">
                
                {/* Large Featured Image */}
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="col-span-8 relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl"
                >
                  <Image src={data.images.main}  alt="Artisan Work" fill className="object-cover" />
                </motion.div>

                {/* Floating Secondary Image */}
                <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="col-span-4 self-end space-y-4"
                >
                  <div className="relative aspect-square rounded-sm overflow-hidden shadow-xl border-4 border-white">
                    <Image src={data.images.square} alt="Tibetan Bowl" fill className="object-cover" />
                  </div>
                  
                  {/* The "Experience" Card */}
                  <div className="bg-amber-700 p-8 text-white shadow-2xl">
                    <h4 className="text-4xl font-light mb-1 italic">{data.experience.years}</h4>
                    <p className="text-[9px] uppercase tracking-[0.3em] opacity-80">{data.experience.label}</p>
                  </div>
                </motion.div>

                {/* Wide Bottom Image */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="col-start-3 col-span-10 relative h-48 mt-4 rounded-sm overflow-hidden"
                >
                  <Image src={data.images.wide} alt="Detail View" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-stone-900/20" />
                </motion.div>

              </div>

              {/* Decorative Background Element */}
              <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-stone-200/50 rounded-full blur-3xl" />
            </div>

          </div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="bg-stone-900 py-24 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <h3 className={`${cormorant.className} text-4xl md:text-5xl italic`}>
            "{data.philosophy.quote}"
          </h3>
          <div className="w-20 h-[1px] bg-amber-500 mx-auto" />


          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
             {data.philosophy.blocks.map((b: any, i: number) => (
              <div key={i}>
                <p className="text-2xl mb-2 font-light">{b.title}</p>
                <p className="text-stone-400 text-sm">{b.text}</p>
              </div>
            ))}
            
          </div>
        </div>
      </section>
    </div>
  );
}