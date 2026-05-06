"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  "10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", 
  "06:00 PM", "08:00 PM", "10:00 PM", "12:00 AM", 
  /* 02:00 AM and 04:00 AM skipped for break */
  "06:00 AM", "08:00 AM"
];

export function SlotPicker({ selectedSlot, bookedSlots, onSelect }: any) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {TIME_SLOTS.map((slot) => {
        const isTaken = bookedSlots.includes(slot);
        const isSelected = selectedSlot === slot;

        return (
          <Button
            key={slot}
            disabled={isTaken}
            onClick={() => onSelect(slot)}
            className={cn(
              "h-12 rounded-xl font-bold transition-all border-2",
              isTaken 
                ? "bg-zinc-100 border-zinc-100 text-zinc-400 cursor-not-allowed" 
                : isSelected
                ? "bg-[#d4af37] border-[#d4af37] text-white scale-95 shadow-inner"
                : "bg-white border-zinc-200 text-zinc-700 hover:border-[#2d3a35] hover:text-[#2d3a35]"
            )}
          >
            {slot}
          </Button>
        );
      })}
    </div>
  );
}