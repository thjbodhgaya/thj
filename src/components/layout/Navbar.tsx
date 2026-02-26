"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { Search, Plus, X, Instagram, Twitter, Facebook } from "lucide-react";
import { Cormorant_Garamond, Jost } from "next/font/google";

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
  </svg>
);

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"] });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "600"] });

export default function SolidKineticNavbar() {

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any>({ products: [], pages: [] });
  const [loading, setLoading] = useState(false)

  const { scrollY } = useScroll();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null); // Ref for click-outside detection

  // Smooth physics
  const smoothY = useSpring(scrollY, {
    stiffness: 50,
    damping: 20,
    mass: 0.5
  });

  // FIX: sync isScrolled with smooth scroll instead of raw scroll
  useMotionValueEvent(smoothY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const headerHeight = useTransform(smoothY, [0, 120], ["120px", "80px"]);
  const logoScale = useTransform(smoothY, [0, 120], [1, 0.7]);
  const contentGap = useTransform(smoothY, [0, 120], ["40px", "20px"]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ products: [], pages: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const res = await fetch(`https://thj-backend.onrender.com/api/search?q=${query}`);
      const data = await res.json();
      setResults(data);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);

  }, [query]);

  const navLinks = ["PRODUCTS", "About", "CONTACT"];

  return (
    <>
      <motion.header
        style={{ height: headerHeight }}
        className={`fixed top-0 left-0 w-full z-50 flex items-center shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-colors duration-700 ${
          isScrolled ? "bg-[#fcfaf7]" : "bg-[#f3f1ee]"
        }`}
      >

        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

        <div className="container mx-auto px-8 md:px-16 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex-1 flex items-center">
            <button
              onClick={() => setSearchOpen(true)}
              className="group flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover:border-stone-900 transition-all duration-500 bg-white">
                <Search size={16} strokeWidth={1} className="text-stone-400 group-hover:text-stone-950" />
              </div>
              <span className={`${jost.className} text-[9px] uppercase tracking-[0.6em] text-stone-400 hidden lg:block`}>
                Discover
              </span>
            </button>
          </div>

          {/* CENTER */}
          <motion.div
            style={{ scale: logoScale, gap: contentGap }}
            className="flex items-center group cursor-pointer"
          >
            <Link href="/" className="flex items-center">

              <div className="relative w-14 h-14 md:w-16 md:h-16 transition-transform duration-1000 group-hover:rotate-[15deg]">
                <Image src="/Logo.png" alt="Logo" fill className="object-contain" priority />
              </div>

              <motion.div
                animate={{ rotate: isScrolled ? 0 : 25 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-[1px] h-10 bg-stone-300 mx-8"
              />

              <div className="flex flex-col">
                <h1 className={`${cormorant.className} text-3xl md:text-4xl leading-none text-stone-900`}>
                  Tibetan
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="h-[1px] w-2 md:w-4 bg-amber-500" />
                  <span className={`${jost.className} text-[6px] md:text-[8px] uppercase tracking-[0.4em] md:tracking-[0.8em] text-amber-700 font-semibold whitespace-nowrap`}>
                  Handicraft & Jewellery
                  </span>
                </div>
              </div>

            </Link>
          </motion.div>

          {/* RIGHT */}
          <div className="flex-1 flex items-center justify-end gap-10">

            <nav className="hidden xl:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link}
                  href={link === "HOME" ? "/" : `/${link.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`${jost.className} text-[10px] uppercase tracking-[0.4em] text-stone-400 hover:text-stone-950 transition-all group relative`}
                >
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-amber-500 transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 bg-stone-950 rounded-xl group hover:bg-amber-700 transition-all duration-500"
            >
              <div className="w-5 h-[1px] bg-white group-hover:w-3 transition-all" />
              <div className="w-5 h-[1px] bg-white group-hover:translate-x-1 transition-all" />
            </button>

          </div>
        </div>
      </motion.header>

      <AnimatePresence>
  {searchOpen && (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
      className="fixed inset-0 z-[200] bg-[#0f0f0f] flex flex-col"
    >
      {/* BACKGROUND DECOR */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-stone-500 to-transparent" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-stone-500 to-transparent" />
      </div>

      <div className="container mx-auto px-8 md:px-24 pt-20 pb-12 relative z-10">
        {/* HEADER & INPUT */}
        <div className="flex justify-between items-center mb-16">
          <div className="w-full max-w-4xl">
            <p className={`${jost.className} text-amber-600 text-[10px] uppercase tracking-[0.5em] mb-4`}>
              Inquiry
            </p>
            <div className="relative group">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the collection..."
                className={`${cormorant.className} w-full bg-transparent border-b border-stone-800 text-white text-5xl md:text-7xl pb-4 outline-none placeholder:text-stone-900 transition-colors focus:border-amber-500/50`}
              />
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: query ? 1 : 0 }}
                className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-500 origin-left"
              />
            </div>
          </div>
          
          <button
            onClick={() => setSearchOpen(false)}
            className="p-4 border border-stone-800 rounded-full text-white hover:bg-white hover:text-black transition-all duration-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* CONTENT GRID */}
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* LEFT: RESULTS (8 COLS) */}
          <div className="lg:col-span-8 overflow-y-auto max-h-[60vh] pr-6 custom-scrollbar">
            {loading ? (
              <p className="text-stone-600 animate-pulse uppercase tracking-widest text-xs">Searching Archives...</p>
            ) : (
              <div className="space-y-16">
                {results.products.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h3 className={`${jost.className} text-stone-500 text-[10px] uppercase tracking-[0.4em] mb-8`}>Product Matches</h3>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                      {results.products.map((p: any) => (
                        <Link
                          key={p._id}
                          href={`/products/${p._id}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex gap-6 group items-center"
                        >
                          <div className="relative w-20 h-24 bg-stone-900 overflow-hidden rounded-sm">
                            <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                          </div>
                          <div>
                            <p className={`${cormorant.className} text-white text-xl group-hover:text-amber-500 transition-colors`}>{p.title}</p>
                            <p className="text-stone-500 text-sm mt-1 tracking-widest">₹{p.price.toLocaleString()}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* EMPTY STATE */}
                {query && results.products.length === 0 && (
                  <div className="py-20 text-center border border-dashed border-stone-900 rounded-xl">
                    <p className={`${cormorant.className} text-stone-600 italic text-2xl`}>The vault is silent. Try another keyword.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: SUGGESTIONS / PAGES (4 COLS) */}
          <div className="lg:col-span-4 border-l border-stone-900 pl-12 hidden lg:block">
             {/* <h3 className={`${jost.className} text-stone-500 text-[10px] uppercase tracking-[0.4em] mb-8`}>Quick Access</h3> */}
             {/* <nav className="flex flex-col gap-6">
               {["Home", "Products",  "Contact"].map((item) => (
                 <Link 
                   key={item} 
                   href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                   className="text-stone-400 hover:text-white transition-colors text-lg font-light"
                 >
                   {item}
                 </Link>
               ))}
             </nav> */}
          </div>

        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

      {/* THE CINEMATIC SOLID OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
            className="fixed inset-0 z-[100] bg-[#121212] flex flex-col"
          >
            {/* Top Bar inside Menu */}
            <div className="p-8 md:p-12 flex justify-between items-center">
              <div className="relative w-16 h-16 md:w-24 md:h-24">
                 <Image src="/Logo.png" alt="Logo" fill className="object-contain brightness-200" />
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="group flex items-center gap-4 text-stone-500 hover:text-white transition-all"
              >
                <span className="text-[10px] uppercase tracking-[0.5em] hidden md:block">Close Vault</span>
                <div className="p-3 md:p-4 border border-stone-800 rounded-full group-hover:rotate-90 transition-all duration-700">
                  <Plus size={24} className="rotate-45" />
                </div>
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-1 flex flex-col justify-center items-center gap-6 md:gap-8">
              {["HOME", "PRODUCTS", "ABOUT", "CONTACT"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Link 
                    href={item === "HOME" ? "/" : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`${cormorant.className} text-4xl md:text-8xl text-stone-700 hover:text-white hover:tracking-widest transition-all duration-1000`}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer inside Menu */}
            <div className="p-20 flex justify-between items-end border-t border-stone-900">
               <div className="space-y-4">
                 <p className={`${jost.className} text-[10px] uppercase tracking-[0.5em] text-stone-500`}>Global Concierge</p>
                 <p className="text-white text-xl">sidbodhgaya@gmail.com</p>
               </div>
               
               <div className="flex gap-10">

                 <span className="w-12 h-12 border border-stone-800 rounded-full flex items-center justify-center text-stone-400 hover:text-white hover:border-white transition-all cursor-pointer">
                   <Instagram size={18} />
                 </span>

                 <span className="w-12 h-12 border border-stone-800 rounded-full flex items-center justify-center text-stone-400 hover:text-white hover:border-white transition-all cursor-pointer">
                   <Facebook size={16} />
                 </span>

                 <span className="w-12 h-12 border border-stone-800 rounded-full flex items-center justify-center text-stone-400 hover:text-white hover:border-white transition-all cursor-pointer">
                   <Twitter size={18} />
                 </span>

               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
