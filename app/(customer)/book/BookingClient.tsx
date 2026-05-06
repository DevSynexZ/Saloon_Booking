"use client";

import { useState } from "react";
import { format } from "date-fns";
import * as Icons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { SlotPicker } from "@/components/booking/SlotPicker";
import { Button } from "@/components/ui/button";
import { salonMenu, Service } from "@/config/services";
import { cn } from "@/lib/utils";

export default function BookingClient() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState(salonMenu[0].category);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const depositAmount = (totalPrice * 0.4).toFixed(0);

  const handleServiceChange = (service: Service) => {
    const isSelected = selectedServices.some((s) => s.id === service.id);
    setSelectedServices(prev => 
      isSelected ? prev.filter((s) => s.id !== service.id) : [...prev, service]
    );
    setShowPayment(false);
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="flex flex-col gap-10 w-full">
        
        {/* SECTION 1 & 2: Calendar and Slot Picker (Side-by-Side on Desktop) */}
        <div className="grid lg:grid-cols-2 gap-6 w-full">
          <section className="bg-zinc-50/50 border border-zinc-100 rounded-[2rem] p-4 md:p-8 flex flex-col items-center">
            <h3 className="text-lg font-black uppercase mb-6 flex items-center gap-2 self-start">
              <Icons.Calendar className="w-5 h-5 text-[#2d3a35]" /> 1. Date
            </h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-2xl border border-zinc-200 p-2 bg-white shadow-sm"
              disabled={(date) => date < new Date() || date.getDay() === 0}
            />
          </section>

          <section className="bg-zinc-50/50 border border-zinc-100 rounded-[2rem] p-4 md:p-8">
            <h3 className="text-lg font-black uppercase mb-6 flex items-center gap-2">
              <Icons.Clock className="w-5 h-5 text-[#2d3a35]" /> 2. Time
            </h3>
            <SlotPicker selectedSlot={selectedSlot} bookedSlots={bookedSlots} onSelect={setSelectedSlot} />
          </section>
        </div>

        {/* SECTION 3: Service Menu (Always Full Width) */}
        <section className="w-full space-y-6">
          <h3 className="text-lg font-black uppercase flex items-center gap-2">
            <Icons.Scissors className="w-5 h-5 text-[#2d3a35]" /> 3. Services
          </h3>
          
          <div className="flex bg-zinc-100 p-1.5 gap-2 rounded-2xl overflow-x-auto no-scrollbar w-full">
            {salonMenu.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={cn(
                  "flex-1 px-6 py-3 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap min-w-[120px]",
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
            >
              {salonMenu.find(c => c.category === activeCategory)?.services.map((service) => {
                const isSelected = selectedServices.some(s => s.id === service.id);
                return (
                  <div
                    key={service.id}
                    onClick={() => handleServiceChange(service)}
                    className={cn(
                      "relative h-36 rounded-3xl overflow-hidden cursor-pointer border-2 transition-all group w-full",
                      isSelected ? "border-[#d4af37]" : "border-transparent"
                    )}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600" 
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform" 
                      alt={service.name}
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
                    
                    {isSelected && (
                      <div className="absolute top-3 left-3 bg-[#d4af37] p-1.5 rounded-full z-20 shadow-lg">
                        <Icons.Check className="w-4 h-4 text-white" strokeWidth={4} />
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div className="flex flex-col">
                        <span className="text-white text-[10px] font-bold uppercase opacity-70">Service</span>
                        <span className="text-white text-sm font-black uppercase tracking-wider">{service.name}</span>
                      </div>
                      <span className="text-white font-black text-lg">৳{service.price}</span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* SECTION 4: Checkout Summary (Always Below Service Menu) */}
        <div className="w-full">
          <div className="bg-zinc-900 rounded-[2.5rem] p-6 md:p-10 text-white shadow-2xl w-full border border-zinc-800">
            <h3 className="text-xs font-black text-[#d4af37] uppercase tracking-[0.3em] mb-8 text-center lg:text-left">
              Final Appointment Summary
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8 border-b border-white/10">
              {/* Date/Time info */}
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Schedule</p>
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-2xl"><Icons.Calendar className="w-5 h-5 text-[#d4af37]" /></div>
                  <p className="font-bold">{date ? format(date, "EEEE, MMMM do") : "Not set"}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-2xl"><Icons.Clock className="w-5 h-5 text-[#d4af37]" /></div>
                  <p className="font-bold">{selectedSlot || "Time not selected"}</p>
                </div>
              </div>

              {/* Service List Info */}
              <div className="space-y-4 md:border-l md:pl-8 border-white/10">
                <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Selected Items</p>
                <div className="space-y-3">
                  {selectedServices.length > 0 ? (
                    selectedServices.map(s => (
                      <div key={s.id} className="flex justify-between items-center text-sm bg-white/5 p-2 rounded-lg">
                        <span className="font-medium text-zinc-300">{s.name}</span>
                        <span className="font-black text-[#d4af37]">৳{s.price}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs italic text-zinc-500">Please pick a service above</p>
                  )}
                </div>
              </div>

              {/* Total and Actions */}
              <div className="space-y-6 lg:border-l lg:pl-8 border-white/10 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2">Grand Total</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black">৳{totalPrice}</span>
                  </div>
                </div>

                {!showPayment ? (
                  <Button
                    onClick={() => setShowPayment(true)}
                    disabled={!selectedSlot || selectedServices.length === 0}
                    className="w-full bg-[#d4af37] hover:bg-white hover:text-black text-zinc-900 h-16 rounded-2xl text-lg font-black transition-all uppercase shadow-[0_10px_20px_-10px_rgba(212,175,55,0.4)]"
                  >
                    Confirm & Pay Deposit
                  </Button>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex justify-between items-center">
                      <p className="text-xs font-bold text-[#d4af37] uppercase">40% Booking Deposit</p>
                      <p className="text-xl font-black">৳{depositAmount}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => setPaymentMethod('bkash')} className={cn("h-14 rounded-2xl border-2 flex items-center justify-center transition-all bg-white/5", paymentMethod === 'bkash' ? "border-[#d4af37] scale-105" : "border-white/5 grayscale opacity-50")}>
                        <img src="https://logolook.net/wp-content/uploads/2023/07/bKash-Logo.png" className="h-4" alt="bkash" />
                      </button>
                      <button onClick={() => setPaymentMethod('nagad')} className={cn("h-14 rounded-2xl border-2 flex items-center justify-center transition-all bg-white/5", paymentMethod === 'nagad' ? "border-[#d4af37] scale-105" : "border-white/5 grayscale opacity-50")}>
                        <img src="https://seeklogo.com/images/N/nagad-logo-7A70BA66AD-seeklogo.com.png" className="h-5" alt="nagad" />
                      </button>
                    </div>
                    <Button disabled={!paymentMethod} className="w-full h-14 bg-white text-black font-black rounded-2xl uppercase hover:bg-[#d4af37] transition-colors">
                      Finalize Payment
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}