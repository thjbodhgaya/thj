"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
});

const SLIDE_DURATION = 8;

// 🔒 TYPE SAFETY
type Slide = {
  image: string;
  tag: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  order: number;
};

export default function Hero() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  /* ===============================
     FETCH HERO (HARDCODED URL)
  =============================== */
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get("https://thj-backend.onrender.com/api/hero");

        console.log("Hero API response:", res.data);

        if (res.data?.slides?.length > 0) {
          setSlides(
            [...res.data.slides].sort((a: Slide, b: Slide) => a.order - b.order)
          );
        }
      } catch (err) {
        console.error("Hero fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  /* ===============================
     AUTO SLIDE
  =============================== */
  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION * 1000);

    return () => clearInterval(timer);
  }, [slides.length]);

  /* ===============================
     GSAP ANIMATIONS
  =============================== */
  useEffect(() => {
    if (
      slides.length === 0 ||
      !imageRef.current ||
      !textRef.current ||
      !progressRef.current
    )
      return;

    tl.current?.kill();

    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.current.fromTo(
        imageRef.current,
        { x: -80, opacity: 0, scale: 1.04 },
        { x: 0, opacity: 1, scale: 1, duration: 2.8 },
        0
      );

      const textEls = Array.from(textRef.current!.children).slice(0, -1);

      tl.current.fromTo(
        textEls,
        { opacity: 0, y: 24, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.25,
          duration: 1.2,
        },
        0.6
      );

      tl.current.fromTo(
        textRef.current!.lastElementChild,
        { opacity: 0, y: 18, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power4.out",
        },
        1.4
      );

      tl.current.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: SLIDE_DURATION,
          ease: "none",
          transformOrigin: "left",
        },
        0
      );
    });

    return () => ctx.revert();
  }, [index, slides.length]);

  /* ===============================
     LOADING UI
  =============================== */
  if (loading) {
    return (
      <div className="h-[600px] flex items-center justify-center text-slate-400">
        Loading hero section...
      </div>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  const currentSlide = slides[index];

  /* ===============================
     RENDER
  =============================== */
  return (
    <section className={`w-full bg-white mt-22 ${poppins.variable} font-sans`}>
      <div className="relative max-w-[1440px] mx-auto px-4 py-10 lg:h-[760px] overflow-hidden">

        {/* IMAGE */}
        <div className="relative w-full h-[300px] md:h-[440px] lg:absolute lg:left-[90px] lg:top-[20px] lg:w-[1100px] lg:h-[680px] overflow-hidden">
          <div ref={imageRef} className="absolute inset-0">
            <Image
              src={currentSlide.image || "/hero-fallback.jpg"}
              alt="Luxury Hero"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/30" />
          </div>
        </div>

        {/* GLASS CARD */}
        <div
          className="
            relative backdrop-blur-xl bg-white/70
            border border-white/40 rounded-[15px]
            shadow-[0_40px_80px_rgba(0,0,0,0.15)]
            px-8 py-10 md:max-w-[640px] mx-auto
            -translate-y-[25%] sm:-translate-y-[22%] md:-translate-y-[20%]
            lg:translate-y-0 lg:absolute lg:top-[200px]
            lg:right-[40px] lg:h-[440px] overflow-hidden
          "
        >
          {/* PROGRESS BAR */}
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-[3px] w-full
              bg-gradient-to-r from-[#C9A24D] via-[#F5D98B] to-[#C9A24D]
              scale-x-0 rounded-t-[18px]"
          />

          {/* TEXT */}
          <div ref={textRef} className="h-full flex flex-col justify-center">
            <p className="text-[13px] font-semibold tracking-[3px] uppercase text-[#8A6B2F] mb-3">
              {currentSlide.tag}
            </p>

            <h1 className="text-[#2E2E2E] text-[32px] md:text-[42px] lg:text-[50px] font-bold leading-tight mb-4 whitespace-pre-line">
              {currentSlide.title}
            </h1>

            <p className="text-[#444] text-[15px] md:text-[16px] leading-[24px] max-w-[480px] mb-8">
              {currentSlide.description}
            </p>

            <Link
              href={currentSlide.buttonLink}
              className="
                group relative overflow-hidden
                inline-flex items-center justify-center
                w-[220px] h-[56px]
                bg-[#2E2E2E] text-white text-[13px]
                font-bold uppercase tracking-[2px]
                transition-all duration-500
                hover:tracking-[4px]
                hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]
                active:scale-[0.97]
              "
            >
              <span className="relative z-10">
                {currentSlide.buttonText}
              </span>

              <span
                className="absolute inset-0
                  bg-gradient-to-r from-transparent via-white/30 to-transparent
                  translate-x-[-120%] group-hover:translate-x-[120%]
                  transition-transform duration-700"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
