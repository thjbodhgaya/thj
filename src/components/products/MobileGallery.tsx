"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function MobileGallery({ product }: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const galleryImages = [product.image, product.image, product.image];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      setActiveIndex(Math.round(scrollLeft / clientWidth));
    }
  };

  return (
    <div className="block md:hidden mb-6">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full overflow-x-auto snap-x snap-mandatory aspect-square bg-[#F9F1E7] rounded-[10px]"
      >
        {galleryImages.map((img, i) => (
          <div
            key={i}
            className="min-w-full h-full flex items-center justify-center snap-center"
          >
            <Image
              src={img}
              alt=""
              width={300}
              height={300}
              className="object-contain w-[90%] h-[90%]"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-4">
        {galleryImages.map((_, i) => (
          <div
            key={i}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === i
                ? "w-[30px] h-[3px] bg-[#B88E2F]"
                : "w-[8px] h-[8px] bg-[#D9D9D9]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
