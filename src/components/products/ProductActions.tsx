"use client";

import { useState } from "react";
import ContactInfoModal from "../contact/ContactInfoModal";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

type Product = {
  _id: string;
  title: string;
  price: number;
  sizes?: string[];
  colors?: string[];
};

export default function ProductActions({ product }: { product: Product }) {

  const sizes =
    product.sizes && product.sizes.length > 0
      ? product.sizes
      : ["Standard"];

  const colors =
    product.colors && product.colors.length > 0
      ? product.colors
      : [];

  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col gap-10 w-full">

      {/* SELECTION ROW */}
      <div className="flex flex-wrap gap-8 sm:gap-12">

        {/* Size Selector */}
        <div className="space-y-4">
          <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold block">
            Select Size
          </span>

          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`
                  w-10 h-10
                  flex items-center justify-center
                  text-[11px]
                  border
                  transition-all duration-300
                  ${
                    selectedSize === size
                      ? "bg-stone-900 text-white border-stone-900 shadow-lg"
                      : "bg-transparent text-stone-600 border-stone-200 hover:border-stone-400"
                  }
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selector */}
        {colors.length > 0 && (
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold block">
              Artisan Finish
            </span>

            <div className="flex flex-wrap gap-4 items-center min-h-[40px]">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={`
                    w-6 h-6 rounded-full relative
                    transition-all duration-500
                    ${
                      selectedColor === color
                        ? "scale-125 ring-1 ring-offset-4 ring-stone-900 shadow-sm"
                        : "opacity-60 hover:opacity-100"
                    }
                  `}
                >
                  {selectedColor === color && (
                    <motion.div
                      layoutId="activeColor"
                      className="absolute inset-0 rounded-full border border-white/20"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ACTION ROW */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 w-full">

        {/* Quantity */}
        <div className="
          flex items-center justify-between
          bg-[#f3f1ee]
          border border-stone-200
          rounded-sm

          w-full
          sm:w-full
          md:w-full
          lg:w-auto

          h-[52px]
          sm:h-[56px]
          md:h-[60px]
        ">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-full flex items-center justify-center text-stone-500 hover:text-stone-900 transition"
          >
            <Minus size={16} />
          </button>

          <span className="w-12 text-center font-medium text-stone-900 text-sm">
            {quantity}
          </span>

          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-12 h-full flex items-center justify-center text-stone-500 hover:text-stone-900 transition"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Inquiry Button — FULLY RESPONSIVE FIX */}
        <button
          onClick={() => setOpenModal(true)}
          className="
            relative overflow-hidden

            w-full
            sm:w-full
            md:w-full
            lg:w-auto

            flex items-center justify-center

            min-h-[52px]
            sm:min-h-[56px]
            md:min-h-[60px]

            px-6
            sm:px-8
            md:px-10
            lg:px-12

            bg-stone-900
            text-white

            text-[11px]
            sm:text-[12px]

            font-bold
            uppercase
            tracking-[0.25em]

            transition-all duration-500
            hover:bg-amber-800
            hover:shadow-xl
            active:scale-[0.98]
          "
        >
          <span className="relative z-10">
            Inquire About This Piece
          </span>

          {/* shimmer */}
          <div className="
            absolute inset-0
            bg-gradient-to-r
            from-transparent
            via-amber-400/10
            to-transparent
            -translate-x-full
            hover:animate-[shimmer_2s_infinite]
          " />
        </button>

      </div>

      {/* Trust Meta */}
      <div className="
        pt-2
        flex flex-col sm:flex-row gap-2 sm:gap-6
        opacity-60
      ">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-500">
          <div className="w-1 h-1 rounded-full bg-emerald-500" />
          Authenticity Certified
        </div>

        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-500">
          <div className="w-1 h-1 rounded-full bg-amber-500" />
          Master Artisan Piece
        </div>
      </div>

      <ContactInfoModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />

    </div>
  );
}
