"use client";

import { SlotPicker } from "@/components/booking/SlotPicker";
import * as Icons from "lucide-react";

interface TimeSelectorProps {
  selectedSlot: string | null;
  bookedSlots: string[];
  onSelect: (slot: string) => void;
}

export function TimeSelector({ selectedSlot, bookedSlots, onSelect }: TimeSelectorProps) {
  return (
    <section className="bg-zinc-50/50 border border-zinc-100 rounded-lg p-5">
      <h3 className="text-sm font-black uppercase mb-4 flex items-center gap-2">
        <Icons.Clock className="w-4 h-4 text-[#2d3a35]" />  Time
      </h3>
      <SlotPicker selectedSlot={selectedSlot} bookedSlots={bookedSlots} onSelect={onSelect} />
    </section>
  );
}