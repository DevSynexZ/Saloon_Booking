"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";

interface ScissorsContextType {
  triggerTransition: (targetUrl: string) => void;
}

const ScissorsContext = createContext<ScissorsContextType>({
  triggerTransition: () => {},
});

export const useScissorsTransition = () => useContext(ScissorsContext);

export function ScissorsTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const triggerTransition = (targetUrl: string) => {
    if (isAnimating) return;
    setIsAnimating(true);

    // 1. Trigger route change halfway through when the screen is fully covered
    setTimeout(() => {
      router.push(targetUrl);
    }, 700);

    // 2. Remove transition overlay once the new page loads
    setTimeout(() => {
      setIsAnimating(false);
    }, 1400);
  };

  return (
    <ScissorsContext.Provider value={{ triggerTransition }}>
      {children}

      <AnimatePresence>
        {isAnimating && (
          <div className="fixed inset-0 z-[9999] pointer-events-none flex overflow-hidden">
            {/* Left Velvet Curtain */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-1/2 h-full bg-zinc-950 border-r-2 border-[#d4af37]/60 shadow-2xl flex items-center justify-end pr-8 relative"
            >
              <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] opacity-10 bg-[size:16px_16px]" />
              <span className="text-[#d4af37]/30 font-serif italic text-3xl md:text-5xl tracking-widest select-none -rotate-90">
                SAILOR'S
              </span>
            </motion.div>

            {/* Right Velvet Curtain */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-1/2 h-full bg-zinc-950 border-l-2 border-[#d4af37]/60 shadow-2xl flex items-center justify-start pl-8 relative"
            >
              <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] opacity-10 bg-[size:16px_16px]" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#d4af37]/40 font-bold rotate-90">
                Precision Cut
              </span>
            </motion.div>

            {/* Central Vertical Cutting Scissors Animation */}
            <motion.div
              initial={{ y: "-50%", opacity: 0 }}
              animate={{ y: ["-50%", "50%"], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center"
            >
              {/* Vertical Laser Seam */}
              <div className="absolute w-[2px] h-32 bg-gradient-to-b from-transparent via-[#d4af37] to-white -top-16 shadow-[0_0_15px_#d4af37]" />

              {/* Scissors Icon */}
              <motion.div
                animate={{ rotate: [0, -30, 10, -30, 0] }}
                transition={{ repeat: Infinity, duration: 0.2 }}
                className="text-[#d4af37] drop-shadow-[0_0_20px_rgba(212,175,55,0.9)] bg-zinc-950 p-3 rounded-full border border-[#d4af37]/40"
              >
                <Icons.Scissors className="w-8 h-8 rotate-180" />
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ScissorsContext.Provider>
  );
}