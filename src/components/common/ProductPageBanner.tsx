"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Props = {
  category?: string;
  product?: string;
};

export default function ProductPageBanner({
  category = "Shop",
  product = "Decor",
}: Props) {
  return (
    <div className="relative w-full h-[80px] sm:h-[100px] mt-20 lg:mt-30 overflow-hidden shadow-sm">
      
      {/* Background with subtle zoom effect on load */}
      <Image
        src="/contact-banner.png"
        alt="Product Banner"
        fill
        className="object-cover opacity-90"
        priority
      />
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />

      {/* Content Container */}
      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-[100px] flex items-center">
        
        <nav className="flex items-center gap-2 sm:gap-4 text-[13px] sm:text-[14px] lg:text-[15px] tracking-wide text-stone-800">
          
          {/* Home Link */}
          <Link href="/" className="text-stone-500 hover:text-amber-800 transition-colors duration-300 font-medium">
            Home
          </Link>

          <ChevronRight size={14} className="text-stone-400" strokeWidth={2.5} />

          {/* Category Link */}
          <Link href="/products" className="text-stone-500 hover:text-amber-800 transition-colors duration-300 font-medium">
            {category}
          </Link>

          {/* Decorative Separator Pipe */}
          <div className="h-6 w-[1.5px] bg-stone-300 mx-1 sm:mx-2 hidden sm:block" />

          {/* Current Product - More prominent */}
          <span className="font-semibold text-stone-900 border-stone-800 tracking-normal truncate max-w-[150px] sm:max-w-none">
            {product}
          </span>
        </nav>
      </div>
    </div>
  );
}