"use client";
export const dynamic = "force-dynamic";

import { useState, useMemo,useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { useSearchParams } from "next/navigation";


//import { products } from "../../lib/products";
import FeaturesSection from "../../components/common/FeaturesStrip";
import PageBanner from "../../components/common/PageBanner";
import { API } from "../../utils/api";
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const PER_PAGE = 16;

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  // Store liked state using a dictionary of product IDs
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [page, setPage] = useState(1);
   const [loading, setLoading] = useState(true);

   const searchParams = useSearchParams();
  const category = searchParams.get("category"); 



  useEffect(() => {
    fetchProducts();
    setPage(1); // reset pagination when category changes
  }, [category]);


  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products", {
        params: category ? { category } : {},
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };


  const totalPages = Math.ceil(products.length / PER_PAGE);

  const pageProducts = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
  return products.slice(start, start + PER_PAGE);
}, [page, products]);

  const from = (page - 1) * PER_PAGE + 1;
  const to = Math.min(page * PER_PAGE, products.length);

  return (
    <Suspense fallback={null}>
    <div className={`bg-[#ffffff] min-h-screen ${jost.className}`}>
      {/* HERO HEADER */}
      <PageBanner
        title={category ? category.toUpperCase() : "The Collection"}
        breadcrumb={category ? "Category" : "Archive"}
        imageSrc="/item.png"
        overlayOpacity={0.4}
      />

      {/* TOOLBAR */}
      <div className="bg-[#f3f1ee] border-b border-stone-200 sticky top-[80px] z-30">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="hidden md:block">
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone- stone-500">
              Curating {from} – {to} of {products.length} Masterpieces
            </span>
          </div>

          <div className="flex items-center gap-6 ml-auto">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400">Sort:</span>
              <select className="bg-transparent text-[10px] uppercase tracking-[0.2em] font-semibold outline-none cursor-pointer">
                <option>Newest First</option>
                <option>Price: Low To High</option>
                <option>Price: High To Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 lg:gap-10">
          {pageProducts.map((product) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              key={product._id}
              className="group"
            >
              {/* shadow-[0_4px_20px_rgba(0,0,0,0.03)] container from second block */}
              <div className="relative flex flex-col bg-white rounded-sm overflow-hidden transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.03)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] group-hover:-translate-y-1">
                
                <Link href={`/products/${product._id}`} className="block relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
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

                  {/* KINETIC OVERLAY (The Like/Share UI) */}
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
                          className={liked[product._id] ? "fill-amber-600 text-amber-600" : "text-white"} 
                        />
                      </button>
                    </div>
                  </div>
                </Link>

                {/* Product Info - Inside the Shadow Container */}
                <div className="p-5 space-y-1 bg-white">
                  <Link href={`/products/${product._id}`}>
                    <h3 className={`${cormorant.className} text-lg lg:text-xl text-stone-900 group-hover:text-amber-800 transition-colors truncate`}>
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium">{product.category || "Rare Artifact"}</p>
                  
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
            </motion.div>
          ))}
        </div>

        {/* REFINED PAGINATION */}
        <div className="mt-20 flex flex-col items-center gap-8">
          <div className="flex items-center gap-12">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="text-stone-700 hover:text-stone-950 disabled:opacity-80 transition-all flex items-center gap-2 group"
            >
              <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] uppercase tracking-[0.3em]">Previous</span>
            </button>

            <div className="flex gap-4">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`text-[12px] transition-all relative py-1 px-2 ${
                    page === i + 1 ? "text-amber-700 font-bold" : "text-stone-300 hover:text-stone-600"
                  }`}
                >
                  {i + 1}
                  {page === i + 1 && (
                    <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-700" />
                  )}
                </button>
              ))}
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="text-stone-700 hover:text-stone-950 disabled:opacity-80 transition-all flex items-center gap-2 group"
            >
              <span className="text-[10px] uppercase tracking-[0.3em]">Next</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <FeaturesSection />
    </div>
    </Suspense>
  );
}