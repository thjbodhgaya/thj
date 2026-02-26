"use client";

import { useEffect, useState } from "react";
import { Phone, Mail, ChevronDown, MapPin } from "lucide-react";
import { Cormorant_Garamond, Jost } from "next/font/google";
import axios from "axios";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["600"] });
const jost = Jost({ subsets: ["latin"], weight: ["400", "500", "700"] });

// Define the shape of our settings to satisfy TypeScript
interface ContactSettings {
  phone: string;
  email: string;
  locationText: string;
  mapEmbedUrl: string;
  inquiryTypes: string[]; // This ensures TS knows it's an array
}

export default function ContactSection() {
  const [settings, setSettings] = useState<ContactSettings>({
    phone: "",
    email: "",
    locationText: "",
    mapEmbedUrl: "",
    inquiryTypes: [] // Initialized as empty array
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    message: ""
  });

  const [status, setStatus] = useState({ loading: false, success: false });

  useEffect(() => {
    // Replace with your actual API production URL if different
    axios.get("https://thj-backend.onrender.com/api/contact/settings")
      .then(res => {
        if (res.data) {
          setSettings({
            ...res.data,
            // Safety check: ensure inquiryTypes is always an array even if API fails
            inquiryTypes: Array.isArray(res.data.inquiryTypes) ? res.data.inquiryTypes : []
          });
        }
      })
      .catch(err => console.error("Error loading settings", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ ...status, loading: true });
    try {
      await axios.post("https://thj-backend.onrender.com/api/contact/inquiry", formData);
      setStatus({ loading: false, success: true });
      setFormData({ name: "", email: "", type: "", message: "" });
      alert("Inquiry sent successfully!");
    } catch (err) {
      alert("Failed to send inquiry.");
      setStatus({ ...status, loading: false });
    }
  };

  return (
    <section className={`w-full bg-[#fcfaf7] py-12 lg:py-24 ${jost.className}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="relative bg-white shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-stone-100 flex flex-col lg:flex-row overflow-hidden">
          
          <div className="w-full lg:w-[60%] p-8 md:p-16 lg:p-24 space-y-12">
            <header className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.5em] text-amber-700 font-bold">Inquiry</span>
              <h2 className={`${cormorant.className} text-4xl md:text-5xl lg:text-6xl text-stone-900 leading-tight`}>
                Get in <span className="italic font-light text-stone-500">Touch</span>
              </h2>
            </header>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                required
                placeholder="Your Name *" 
                className="w-full border-b border-stone-200 py-4 text-sm outline-none focus:border-amber-700 bg-transparent transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input 
                required
                type="email"
                placeholder="Email Address *" 
                className="w-full border-b border-stone-200 py-4 text-sm outline-none focus:border-amber-700 bg-transparent transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <div className="md:col-span-2 relative">
                <select 
                  required
                  className="w-full border-b border-stone-200 py-4 text-sm outline-none focus:border-amber-700 bg-transparent appearance-none cursor-pointer"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="" disabled>Nature of Inquiry</option>
                  {/* Using optional chaining and fallback for total safety */}
                  {(settings.inquiryTypes || []).map((t, index) => (
                    <option key={index} value={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-0 top-5 text-stone-400 pointer-events-none" />
              </div>
              <textarea 
                required
                placeholder="How can we assist you?" 
                rows={4}
                className="md:col-span-2 w-full border-b border-stone-200 py-4 text-sm outline-none focus:border-amber-700 bg-transparent resize-none transition-colors"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />

              <button 
                type="submit"
                disabled={status.loading}
                className="md:col-span-2 mt-6 h-[60px] bg-stone-900 text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-amber-800 transition-all disabled:opacity-50"
              >
                {status.loading ? "Sending..." : "Send Inquiry"}
              </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8">
              <ContactItem icon={<Phone size={18}/>} label="Phone" value={settings.phone} />
              <ContactItem icon={<Mail size={18}/>} label="Email" value={settings.email} />
              <ContactItem icon={<MapPin size={18}/>} label="Studio" value={settings.locationText} />
            </div>
          </div>

          <div className="w-full lg:w-[40%] h-[300px] md:h-[450px] lg:h-auto relative bg-stone-100">
            <div className="absolute top-0 right-0 w-2 h-full bg-amber-700 z-10 hidden lg:block" />
            {settings.mapEmbedUrl ? (
              <iframe
                src={settings.mapEmbedUrl}
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-1000"
                allowFullScreen
                loading="lazy"
              />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400 italic text-sm">
                    Loading Map...
                </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="space-y-2 group">
      <div className="text-amber-700 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">{label}</p>
      <p className="text-stone-800 text-[13px] font-medium break-words">{value || "---"}</p>
    </div>
  );
}