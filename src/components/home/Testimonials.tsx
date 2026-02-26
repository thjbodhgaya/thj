"use client";

import { useState, useRef, useEffect } from "react";
import { LayoutGroup } from "framer-motion";
import axios from "axios";
import Image from "next/image";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { Star, X, Quote } from "lucide-react";
import { Cormorant_Garamond, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600"] });
const jost = Jost({ subsets: ["latin"], weight: ["400", "500", "700"] });

type Testimonial = {
  id: string;
  src: string;
  name: string;
  rating: number;
  review: string;
  x: number;
  y: number;
  w: number;
  h: number;
};


const smoothSpring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
  mass: 0.8,
};

// Updated Gallery Images with your requested coordinates (x, y, w, h)
// const galleryImages = [
//   { id: "t1", src: "/1.png", w: 274, h: 312, x: 0, y: 0, name: "Sarah J.", rating: 5, review: "The intricate details on the mandala are breathtaking. The craftsmanship is top-notch!" },
//   { id: "t2", src: "/10.png", w: 225, h: 300, x: 109, y: 27, name: "Michael T.", rating: 4, review: "Exceptional weight and quality. Fits perfectly in my living room." },
//   { id: "t3", src: "/8.png", w: 232, h: 295, x: 165, y: 448, name: "Emma W.", rating: 5, review: "Fast shipping and museum-grade packaging. Beautiful presentation." },
//   { id: "t4", src: "/4.png", w: 426, h: 300, x: 313, y: 52, name: "David B.", rating: 5, review: "A masterpiece of Tibetan craft. A true treasure in our home." },
//   { id: "t5", src: "/39.png", w: 344, h: 242, x: 397, y: 398, name: "Jessica L.", rating: 4, review: "Bridges the gap between tradition and modern decor perfectly." },
//   { id: "t6", src: "/9.png", w: 310, h: 511, x: 746, y: 143, name: "Daniel K.", rating: 5, review: "The resonance lingers for minutes. Exceeded every expectation." },
//   { id: "t7", src: "/4.png", w: 302, h: 300, x: 995, y: 442, name: "Sophia M.", rating: 5, review: "The concierge team was incredibly helpful and kind throughout." },
//   { id: "t8", src: "/5.png", w: 452, h: 300, x: 1068, y: 69, name: "James R.", rating: 5, review: "Exquisite silverwork. Simply stunning artwork." },
//   { id: "t9", src: "/3.png", w: 418, h: 300, x: 1294, y: 471, name: "Olivia P.", rating: 4, review: "Good value for money. Looks even better in person." },
//   { id: "t10", src: "/6.png", w: 452, h: 300, x: 1391, y: 156, name: "William H.", rating: 5, review: "The colors are so vibrant. A beautiful addition to my collection." },
// ];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={14} className={i < rating ? "fill-amber-600 text-amber-600" : "fill-stone-200 text-stone-200"} />
    ))}
  </div>
);

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(
          "https://thj-backend.onrender.com/api/testimonials"
        );

        if (res.data?.items?.length > 0) {
          setItems(res.data.items);
        }
      } catch (err) {
        console.error("Testimonials fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const selectedItem = items.find((i) => i.id === selectedId);

  //const selectedImage = galleryImages.find((img) => img.id === selectedId);


  if (loading) {
    return (
      <div className="h-[600px] flex items-center justify-center text-stone-400">
        Loading testimonials...
      </div>
    );
  }

  if (items.length === 0) return null;

  return (
    <section 
      ref={containerRef}
      className={`relative w-full py-12 md:py-24 ${jost.className} bg-white overflow-hidden `}
    >
      <div className="container mx-auto px-6 text-center mb-12 relative z-10">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-amber-700 text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">
          Community Voices
        </motion.span>
        <h2 className={`${cormorant.className} text-stone-900 text-3xl md:text-5xl lg:text-6xl`}>
          Shared <span className="italic font-light text-stone-500">Journeys</span>
        </h2>
      </div>

      {/* MOBILE GALLERY */}
      <LayoutGroup>
      <div className="lg:hidden px-4 columns-2 gap-4 space-y-4 relative z-20">
        {items.map((img) => (
          <motion.div
            key={`mob-${img.id}`}
            layoutId={`card-${img.id}`}
            onClick={() => setSelectedId(img.id)}
            className="relative break-inside-avoid overflow-hidden bg-stone-50 border border-stone-200 cursor-pointer rounded-sm"
          >
            <motion.div layoutId={`img-inner-${img.id}`} className="relative aspect-[4/5]">
              <Image src={img.src} alt={img.name} fill className="object-cover" sizes="50vw" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* DESKTOP GALLERY - Arranged by your specific coordinates */}
      <div className="hidden lg:flex w-full overflow-x-auto justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="relative shrink-0 origin-top" style={{ width: "1843px", height: "771px" }}>
          {items.map((img) => (
            <motion.div
              key={`desk-${img.id}`}
              layoutId={`card-${img.id}`}
              onClick={() => setSelectedId(img.id)}
              transition={smoothSpring}
              className="absolute overflow-hidden bg-stone-50 border border-stone-100 cursor-pointer group rounded-sm shadow-sm"
              style={{ width: img.w, height: img.h, left: img.x, top: img.y }}
              whileHover={{ 
                scale: 1.05,
                y: -10, 
                zIndex: 30, 
                boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.15)" 
              }}
            >
              <motion.div layoutId={`img-inner-${img.id}`} className="relative w-full h-full">
                <Image 
                    src={img.src} 
                    alt={img.name} 
                    fill 
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" 
                    sizes="450px"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {/* MODAL */}
{/* MODAL INSIDE TESTIMONIALS */}
<AnimatePresence>
  {selectedId && selectedItem && (
    <motion.div
      className="absolute inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Blur overlay ONLY inside section */}
      <motion.div
        className="absolute inset-0 bg-white/90 backdrop-blur-md"
        onClick={() => setSelectedId(null)}
      />

      {/* Card */}
      <motion.div
        layoutId={`card-${selectedId}`}
        transition={smoothSpring}
        className="relative bg-white w-[92%] max-w-5xl flex flex-col lg:flex-row overflow-hidden rounded-xl z-10 border border-stone-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.25)]"
      >
        <button
          onClick={() => setSelectedId(null)}
          className="absolute top-4 right-4 z-50 p-2 text-stone-900 bg-white/60 backdrop-blur-sm rounded-full hover:bg-white transition"
        >
          <X size={20} />
        </button>

        {/* Image */}
        <motion.div
          layoutId={`img-inner-${selectedId}`}
          className="relative w-full lg:w-1/2 h-[350px] lg:h-[620px]"
        >
          <Image
            src={selectedItem.src}
            alt={selectedItem.name}
            fill
            className="object-cover"
            priority
            sizes="50vw"
          />
        </motion.div>

        {/* Content */}
        <div className="p-10 lg:p-16 flex flex-col justify-center lg:w-1/2 bg-white">
          <Quote className="text-amber-700/10 mb-6" size={56} strokeWidth={1} />
          <StarRating rating={selectedItem.rating} />
          <p className={`${cormorant.className} text-2xl md:text-3xl text-stone-800 my-8 italic leading-relaxed`}>
            "{selectedItem.review}"
          </p>
          <div>
            <p className="font-bold text-stone-900 uppercase tracking-[0.2em] text-[10px]">
              {selectedItem.name}
            </p>
            <p className="text-stone-400 uppercase tracking-[0.1em] text-[9px] mt-1">
              Verified Experience
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
</LayoutGroup>


    </section>
  );
}