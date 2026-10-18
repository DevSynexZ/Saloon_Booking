"use client";

import { Calendar } from "@/components/ui/calendar";
import * as Icons from "lucide-react";

interface DateSelectorProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function DateSelector({ date, setDate }: DateSelectorProps) {
  return (
    <section className="bg-zinc-50/50 border border-zinc-100 rounded-lg p-5 flex flex-col items-center">
      <h3 className="text-sm font-black uppercase mb-4 flex items-center gap-2 self-start">
        <Icons.Calendar className="w-4 h-4 text-[#2d3a35]" />  Date
      </h3>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border border-zinc-200 p-2 bg-white shadow-sm"
        disabled={(date) => date < new Date() || date.getDay() === 0}
      />
    </section>
  );
}