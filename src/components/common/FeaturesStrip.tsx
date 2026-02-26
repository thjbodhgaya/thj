"use client";

import {
  Trophy,
  ShieldCheck,
  Truck,
  Headphones,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Trophy,
    title: "Master Craft",
    subtitle: "Authentic Himalayan Materials",
  },
  {
    icon: ShieldCheck,
    title: "Secure Archive",
    subtitle: "Insured Global Handling",
  },
  {
    icon: Truck,
    title: "Global Reach",
    subtitle: "Complimentary over ₹10,000",
  },
  {
    icon: Headphones,
    title: "Artisan Support",
    subtitle: "Direct Expert Consultation",
  },
];

export default function FeaturesStrip() {
  return (
    <section className="w-full bg-[#f3f1ee] py-16 lg:py-24 border-t border-stone-200">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-6 group"
              >
                {/* ICON WITH KINETIC HOVER */}
                <div className="relative">
                  <div className="w-12 h-12 flex items-center justify-center relative z-10">
                    <Icon 
                      size={32} 
                      strokeWidth={1} 
                      className="text-stone-800 group-hover:text-amber-700 transition-colors duration-500" 
                    />
                  </div>
                  {/* Subtle Background Accent */}
                  <div className="absolute inset-0 bg-stone-400/5 rounded-full scale-150 group-hover:scale-110 transition-transform duration-700" />
                </div>

                {/* TEXT CONTENT */}
                <div className="flex flex-col space-y-1">
                  <span className="text-[14px] font-bold text-stone-900 uppercase tracking-[0.2em]">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-stone-400 uppercase tracking-widest leading-relaxed">
                    {item.subtitle}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}