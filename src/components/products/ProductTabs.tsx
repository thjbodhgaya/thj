"use client";

import { useState } from "react";
import Image from "next/image";
//import { Product } from "../../lib/products";
import { motion, AnimatePresence } from "framer-motion";
import { Cormorant_Garamond, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"] });

type Product = {
  _id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  sku: string;
  tags?: string[];
  sizes?: string[];
  rating?: number;
  reviewsCount?: number;
};

export default function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<"description" | "info" | "reviews">("description");


  const tags = product.tags && product.tags.length > 0
    ? product.tags.join(", ")
    : product.category;

  const sizes = product.sizes && product.sizes.length > 0
    ? product.sizes.join(" / ")
    : "Standard";

  const rating = product.rating ?? 5;
  const reviews = product.reviewsCount ?? 0;

  const tabs = [
    { key: "description", label: "The Story" },
    { key: "info", label: "Craftsmanship" },
    { key: "reviews", label: `Reviews (${product.reviewsCount})` },
  ];



  return (
    <section className={`w-full bg-[#fcfaf7] border-t border-stone-200 ${jost.className}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 py-20">
        
        {/* ===== TAB SELECTOR ===== */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 mb-16 border-b border-stone-200 pb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className="relative py-2 group"
            >
              <span className={`text-[12px] uppercase tracking-[0.4em] transition-colors duration-500 ${
                activeTab === tab.key ? "text-stone-900 font-bold" : "text-stone-400 group-hover:text-stone-600"
              }`}>
                {tab.label}
              </span>
              {activeTab === tab.key && (
                <motion.div 
                  layoutId="activeTabUnderline"
                  className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-amber-700" 
                />
              )}
            </button>
          ))}
        </div>

        {/* ===== TAB CONTENT ===== */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === "description" && (
              <motion.div
                key="description"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-16"
              >
                <div className="max-w-3xl mx-auto">
                  <p className={`${cormorant.className} text-xl md:text-2xl text-stone-600 leading-relaxed text-center italic font-light`}>
                    "{product.description}"
                  </p>
                </div>

                {/* VISUAL BREAK */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1, 2].map((_, i) => (
                    <div
                      key={i}
                      className="relative w-full aspect-[16/10] bg-[#f3f1ee] overflow-hidden group"
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-[3000ms] group-hover:scale-110 grayscale hover:grayscale-0"
                      />
                      <div className="absolute inset-0 border-[15px] border-[#fcfaf7]/10 pointer-events-none" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "info" && (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
              >
                <div className="grid grid-cols-1 gap-6 divide-y divide-stone-200">
                  <InfoRow label="Identifier" value={product.sku} />
                  <InfoRow label="Collection" value={product.category} />
                  <InfoRow label="Artisan Tags" value={tags} />
                  <InfoRow label="Dimensions" value={sizes} />
                </div>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-xl mx-auto text-center space-y-6"
              >
                <div className="text-4xl text-amber-700 font-light">{product.rating} ★</div>
                <p className="text-stone-500 uppercase tracking-widest text-[10px]">
                  Based on {product.reviewsCount} verified artisan evaluations
                </p>
                <div className="pt-8">
                   <button className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-stone-900 pb-2 hover:text-amber-700 hover:border-amber-700 transition-colors">
                     Submit a Review
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-6 group cursor-default">
      <span className="text-[10px] uppercase tracking-[0.4em] text-stone-400 group-hover:text-amber-700 transition-colors">
        {label}
      </span>
      <span className="text-sm text-stone-900 font-medium">
        {value}
      </span>
    </div>
  );
}