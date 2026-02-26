"use client";

import { useState,useEffect } from "react";
import Image from "next/image";
import { Heart, Share2, ArrowRight } from "lucide-react";
import Link from "next/link";
// import { products } from "../../lib/products";
import { Cormorant_Garamond, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["600"] });
const jost = Jost({ subsets: ["latin"], weight: ["400", "500", "700"] });

type Product = {
  _id: string;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  tag?: string;
  tagColor?: string;
};

export default function ProductsGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const [loading, setLoading] = useState(true);
   useEffect(() => {
    fetch("https://thj-backend.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
      })
      .finally(() => setLoading(false));
  }, []);

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <section className="py-32 text-center text-stone-400 italic">
        Loading masterpieces…
      </section>
    );
  }

  /* ================= EMPTY STATE ================= */
  if (products.length === 0) {
    return (
      <section className="py-32 text-center text-stone-400 italic">
        No products found in archive.
      </section>
    );
  }

  return (
    <section className={`w-full bg-[#00000] py-20 ${jost.className}`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-amber-700 text-[10px] uppercase tracking-[0.5em] font-bold mb-4">
            Hand-Crafted Selection
          </span>
          <h2 className={`${cormorant.className} text-[42px] text-[#1a1a1a] leading-tight`}>
            Our Masterpieces
          </h2>
          <div className="w-12 h-[1px] bg-stone-300 mt-6" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 lg:gap-10">
          {products.slice(0, 8).map((product) => (

            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="group relative flex flex-col focus:outline-none"
            >
              {/* Product Card Container with Shadow */}
              <div className="relative flex flex-col bg-white rounded-sm overflow-hidden transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.03)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group-hover:-translate-y-1">
                
                {/* Image Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
                  {/* Status Badge */}
                  {product.tag && (
  <div
    className="absolute top-4 left-4 z-20 text-[9px] uppercase tracking-widest text-white px-3 py-1 font-bold shadow-sm"
    style={{
      backgroundColor: product.tagColor || "#1c1917", // 🔥 backend-driven color
    }}
  >
    {product.tag}
  </div>
)}


                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />

                  {/* Kinetic Overlay */}
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-all duration-500 flex flex-col items-center justify-center gap-6 opacity-0 group-hover:opacity-100">
                    <button className="bg-white text-stone-900 text-[10px] uppercase tracking-widest px-6 py-3 font-bold hover:bg-stone-100 transition-all shadow-lg active:scale-95">
                      View Detail
                    </button>
                    
                    <div className="flex gap-6 text-white">
                      <button 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        className="hover:text-amber-500 transition-colors drop-shadow-md"
                      >
                        <Share2 size={18} strokeWidth={1.5} />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setLiked((prev) => ({ ...prev, [product._id]: !prev[product._id] }));
                        }}
                        className="transition-transform active:scale-125 drop-shadow-md"
                      >
                        <Heart 
                          size={18} 
                          strokeWidth={1.5}
                          className={ liked[product._id] ? "fill-amber-600 text-amber-600" : "text-white"} 
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Info - Now inside the shadow container */}
                <div className="p-5 space-y-1 bg-white">
                  <h3 className={`${cormorant.className} text-lg lg:text-xl text-stone-900 group-hover:text-amber-800 transition-colors truncate`}>
                    {product.title}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium">Rare Artifact</p>
                  
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-sm font-bold text-stone-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.oldPrice && (
                      <span className="text-xs line-through text-stone-400">
                        ₹{product.oldPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* SHOW MORE BUTTON */}
        <div className="flex justify-center mt-20">
          <Link
            href="/products"
            className="
              group relative flex items-center gap-4
              px-10 py-5 border border-stone-200
              bg-white text-stone-900 text-[11px] font-bold uppercase tracking-[0.3em]
              transition-all duration-500 overflow-hidden
              shadow-[0_4px_15px_rgba(0,0,0,0.03)]
              hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)]
              hover:bg-stone-900 hover:text-white hover:border-stone-900
            "
          >
            <span className="relative z-10">Discover Full Collection</span>
            <ArrowRight size={16} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
            <span className="absolute bottom-0 left-0 w-full h-0 bg-stone-900 group-hover:h-full transition-all duration-500 -z-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}