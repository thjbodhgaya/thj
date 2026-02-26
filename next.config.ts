import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //output: "export",          // ⭐ important
  images: {
    unoptimized: true,       // ⭐ important for Netlify drop
  },
};

export default nextConfig;
