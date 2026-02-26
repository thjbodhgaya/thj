"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Cormorant_Garamond, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

type FooterData = {
  brandText: string;
  socials: Record<string, string>;
  quickLinks: { label: string; url: string }[];
  helpLinks: { label: string; url: string }[]; // kept for API compatibility
  newsletterText: string;
  companyName: string;
};

export default function SolidKineticFooter() {
  const [data, setData] = useState<FooterData | null>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    axios
      .get("https://thj-backend.onrender.com/api/footer")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Footer fetch error:", err));
  }, []);

  if (!data) return null;

  return (
    <footer
      className={`w-full bg-[#fcfaf7] border-t border-stone-200 relative overflow-hidden ${jost.className}`}
    >
      {/* Decorative Accent */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-8 lg:px-16 pt-20 pb-10">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">

          {/* BRAND */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative w-[180px] h-[100px]">
              <Image
                src="/logoFooter.png"
                alt="Footer Logo"
                fill
                className="object-contain"
              />
            </div>

            <p
              className={`${cormorant.className} text-stone-500 text-lg leading-relaxed max-w-sm`}
            >
              {data.brandText}
            </p>

            <div className="flex gap-6 flex-wrap">
              {Object.entries(data.socials).map(([name, url]) => (
                <Link
                  key={name}
                  href={url}
                  target="_blank"
                  className="text-[10px] uppercase tracking-[0.2em] text-stone-400 hover:text-amber-700 transition-colors"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-[11px] uppercase tracking-[0.4em] font-semibold text-stone-900">
              Links
            </h4>

            <ul className="space-y-4">
              {data.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.url}
                    className="text-sm text-stone-500 hover:text-stone-900 transition-all hover:pl-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-[11px] uppercase tracking-[0.4em] font-semibold text-stone-900">
              Newsletter
            </h4>

            <div className="flex flex-col gap-6">
              <div className="relative">
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL ADDRESS"
                  className="w-full bg-transparent border-b border-stone-300 py-3 text-[11px] tracking-widest outline-none focus:border-stone-900 placeholder:text-stone-400"
                />

                <button className="absolute right-0 bottom-3 text-[10px] font-bold tracking-[0.3em] text-stone-900 hover:text-amber-700 transition-colors uppercase">
                  Subscribe
                </button>
              </div>

              <p className="text-[10px] text-stone-400 uppercase tracking-widest leading-loose">
                {data.newsletterText}
              </p>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">
            © {currentYear} {data.companyName}. All rights reserved.
          </p>

          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">
            {data.companyName}
          </p>
        </div>
      </div>
    </footer>
  );
}
