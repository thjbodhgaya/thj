"use client";

import { ReactNode } from "react";

interface ScaleWrapperProps {
  children: ReactNode;
}

export default function ScaleWrapper({ children }: ScaleWrapperProps) {
  return (
    <div className="w-full h-auto flex justify-center overflow-hidden">
      <div
        className="w-[1440px] origin-top scale-wrapper"
      >
        {children}
      </div>
    </div>
  );
}
