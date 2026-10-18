"use client";

import { salonMenu, Service } from "@/config/services";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";

interface ServiceSelectionProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  selectedServices: Service[];
  handleServiceChange: (service: Service) => void;
}

export function ServiceSelection({
  activeCategory,
  setActiveCategory,
  selectedServices,
  handleServiceChange,
}: ServiceSelectionProps) {
  return (
    <section className="w-full space-y-4">
      <h3 className="text-sm font-black uppercase flex items-center gap-2">
        <Icons.Scissors className="w-4 h-4 text-[#2d3a35]" />  Services & Preview
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        {/* Left Side: Available Services Menu */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex bg-zinc-100 p-1 gap-1 rounded-lg overflow-x-auto no-scrollbar w-full">
            {salonMenu.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={cn(
                  "flex-1 px-4 py-2 rounded-md text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap min-w-[90px]",
                  activeCategory === cat.category ? "bg-white text-[#2d3a35] shadow-sm" : "text-zinc-400"
                )}
              >
                {cat.category}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full"
            >
              {salonMenu.find((c) => c.category === activeCategory)?.services.map((service) => {
                const isSelected = selectedServices.some((s) => s.id === service.id);
                return (
                  <div
                    key={service.id}
                    onClick={() => handleServiceChange(service)}
                    className={cn(
                      "relative h-28 rounded-lg overflow-hidden cursor-pointer border-2 transition-all group w-full shadow-sm",
                      isSelected ? "border-[#d4af37]" : "border-transparent"
                    )}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600"
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform"
                      alt={service.name}
                    />
                    <div className="absolute inset-0 bg-black/50" />

                    {isSelected && (
                      <div className="absolute top-2 left-2 bg-[#d4af37] p-1 rounded-full z-20 shadow-lg">
                        <Icons.Check className="w-3 h-3 text-white" strokeWidth={4} />
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                      <div className="flex flex-col">
                        <span className="text-white text-[10px] font-black uppercase tracking-wider">
                          {service.name}
                        </span>
                      </div>
                      <span className="text-white font-black text-sm">৳{service.price}</span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: AI Image Preview Field Placeholder */}
        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute top-3 right-3 bg-[#d4af37]/20 text-[#d4af37] text-[9px] font-black uppercase px-2 py-1 rounded tracking-widest border border-[#d4af37]/30">
            Coming Soon
          </div>
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 text-[#d4af37]">
            <Icons.Sparkles className="w-6 h-6" />
          </div>
          <h4 className="text-white text-xs font-black uppercase tracking-wider mb-1">
            AI Live Transformation Preview
          </h4>
          <p className="text-zinc-400 text-xs max-w-xs mb-4">
            Once integrated, your selected haircut and beard style will render automatically onto your profile image here.
          </p>
          <div className="w-full h-32 rounded border border-dashed border-zinc-700 bg-white/5 flex items-center justify-center text-zinc-500 text-xs">
            [AI Preview Placeholder Window]
          </div>
        </div>
      </div>
    </section>
  );
}