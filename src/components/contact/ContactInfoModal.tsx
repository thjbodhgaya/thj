"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Cormorant_Garamond } from "next/font/google";
import axios from "axios";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"] });

export default function ContactInfoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [settings, setSettings] = useState({
    phone: "",
    email: "",
    locationText: ""
  });

  useEffect(() => {
    if (isOpen) {
      axios.get("https://thj-backend.onrender.com/api/contact/settings")
        .then(res => setSettings(res.data));
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-[440px] bg-[#fcfaf7] p-10 md:p-12 shadow-2xl">
            <button onClick={onClose} className="absolute top-6 right-6 text-stone-400 hover:text-amber-700"><X size={20} /></button>
            
            <div className="flex flex-col items-center mb-10">
              <h2 className={`${cormorant.className} text-3xl text-stone-900 text-center`}>
                Concierge <br /> <span className="italic font-light text-stone-500 text-xl">Inquiry Service</span>
              </h2>
            </div>

            <div className="space-y-6 mb-10">
              <ContactLink icon={<Phone size={16} />} label="Direct Line" value={settings.phone} href={`tel:${settings.phone}`} />
              <ContactLink icon={<MessageCircle size={16} />} label="WhatsApp" value="Chat with a Master" href={`https://wa.me/${settings.phone.replace(/\s+/g, '')}`} />
              <ContactLink icon={<Mail size={16} />} label="Email" value={settings.email} href={`mailto:${settings.email}`} />
              <div className="flex items-start gap-4">
                <MapPin size={16} className="text-amber-700 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Location</p>
                  <p className="text-stone-800 text-[13px]">{settings.locationText}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <a href={`https://wa.me/${settings.phone.replace(/\s+/g, '')}`} target="_blank" className="h-[56px] flex items-center justify-center bg-stone-900 text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-amber-800 transition-all">
                Instant WhatsApp
              </a>
              <Link href="/contact" onClick={onClose} className="h-[56px] flex items-center justify-center border border-stone-200 text-stone-600 text-[11px] font-bold uppercase tracking-[0.3em] hover:border-stone-900">
                Detailed Inquiry
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ContactLink({ icon, label, value, href }: any) {
  return (
    <a href={href} className="flex items-start gap-4 group">
      <div className="text-amber-700 mt-0.5 group-hover:scale-110 transition-all">{icon}</div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-0.5">{label}</p>
        <p className="text-stone-800 text-[13px] group-hover:text-amber-800 font-medium underline decoration-stone-200">{value}</p>
      </div>
    </a>
  );
}