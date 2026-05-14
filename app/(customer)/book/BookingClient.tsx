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
import { useSession } from "next-auth/react";

export default function BookingClient() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState(salonMenu[0].category);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Added loading state
  const { data: session } = useSession();

  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const depositAmount = (totalPrice * 0.4).toFixed(0);

  const handleServiceChange = (service: Service) => {
    const isSelected = selectedServices.some((s) => s.id === service.id);
    setSelectedServices(prev => 
      isSelected ? prev.filter((s) => s.id !== service.id) : [...prev, service]
    );
    setShowPayment(false);
  };

  // FULL INTEGRATED BKASH LOGIC
  const handlePayAndBook = async () => {
    setLoading(true);
    try {
      // 1. Create a "Pending" record in your DB to get an ID
      const initRes = await fetch("/api/bookings", { // Check if this matches your existing route
        method: "POST",
        body: JSON.stringify({ 
          services: selectedServices.map(s => s.name), 
          date: date ? format(date, "yyyy-MM-dd") : "", 
          slot: selectedSlot,
          amount: totalPrice,
          deposit: depositAmount 
        })
      });
      const { appointmentId } = await initRes.json();

      // 2. Initiate bKash redirect
      const res = await fetch("/api/payment/bkash/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: depositAmount, appointmentId })
      });
      
      const data = await res.json();
      if (data.bkashURL) {
        window.location.href = data.bkashURL; 
      }
    } catch (err) {
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white p-4 md:p-6">
      <header className="mb-6 flex flex-col gap-1">
        <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.4em]">
          Ready for your transformation?
        </span>
        <h2 className="text-3xl font-black text-[#2d3a35] uppercase tracking-tighter">
          Welcome, {session?.user?.name || "Guest"}
        </h2>
      </header>

      <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-4 w-full">
          <section className="bg-zinc-50/50 border border-zinc-100 rounded-lg p-5 flex flex-col items-center">
            <h3 className="text-sm font-black uppercase mb-4 flex items-center gap-2 self-start">
              <Icons.Calendar className="w-4 h-4 text-[#2d3a35]" /> 1. Date
            </h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border border-zinc-200 p-2 bg-white shadow-sm"
              disabled={(date) => date < new Date() || date.getDay() === 0}
            />
          </section>

          <section className="bg-zinc-50/50 border border-zinc-100 rounded-lg p-5">
            <h3 className="text-sm font-black uppercase mb-4 flex items-center gap-2">
              <Icons.Clock className="w-4 h-4 text-[#2d3a35]" /> 2. Time
            </h3>
            <SlotPicker selectedSlot={selectedSlot} bookedSlots={bookedSlots} onSelect={setSelectedSlot} />
          </section>
        </div>

        <section className="w-full space-y-4">
          <h3 className="text-sm font-black uppercase flex items-center gap-2">
            <Icons.Scissors className="w-4 h-4 text-[#2d3a35]" /> 3. Services
          </h3>
          
          <div className="flex bg-zinc-100 p-1 gap-1 rounded-lg overflow-x-auto no-scrollbar w-full">
            {salonMenu.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={cn(
                  "flex-1 px-4 py-2 rounded-md text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap min-w-[100px]",
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full"
            >
              {salonMenu.find(c => c.category === activeCategory)?.services.map((service) => {
                const isSelected = selectedServices.some(s => s.id === service.id);
                return (
                  <div
                    key={service.id}
                    onClick={() => handleServiceChange(service)}
                    className={cn(
                      "relative h-28 rounded-lg overflow-hidden cursor-pointer border-2 transition-all group w-full",
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
                        <span className="text-white text-[10px] font-black uppercase tracking-wider">{service.name}</span>
                      </div>
                      <span className="text-white font-black text-sm">৳{service.price}</span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </section>

        <div className="w-full">
          <div className="bg-zinc-900 rounded-lg p-6 text-white shadow-xl w-full border border-zinc-800">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Schedule</p>
                <div className="flex items-center gap-3 text-sm">
                  <Icons.Calendar className="w-4 h-4 text-[#d4af37]" />
                  <p className="font-bold">{date ? format(date, "MMM do, yyyy") : "Not set"}</p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Icons.Clock className="w-4 h-4 text-[#d4af37]" />
                  <p className="font-bold">{selectedSlot || "Time not selected"}</p>
                </div>
              </div>

              <div className="space-y-3 md:border-l md:pl-6 border-white/10">
                <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Selected Services</p>
                <div className="max-h-24 overflow-y-auto pr-2 space-y-2">
                  {selectedServices.length > 0 ? (
                    selectedServices.map(s => (
                      <div key={s.id} className="flex justify-between items-center text-xs bg-white/5 p-2 rounded">
                        <span className="text-zinc-300">{s.name}</span>
                        <span className="font-black text-[#d4af37]">৳{s.price}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs italic text-zinc-500">Pick a service to continue</p>
                  )}
                </div>
              </div>

              <div className="lg:border-l lg:pl-6 border-white/10 flex flex-col justify-end">
                <div className="mb-4">
                  <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-1">Total</p>
                  <span className="text-4xl font-black tracking-tighter">৳{totalPrice}</span>
                </div>

                {!showPayment ? (
                  <Button
                    onClick={() => setShowPayment(true)}
                    disabled={!selectedSlot || selectedServices.length === 0}
                    className="w-full bg-[#d4af37] hover:bg-white hover:text-black text-zinc-900 h-12 rounded-md text-xs font-black transition-all uppercase"
                  >
                    Confirm Appointment
                  </Button>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                    <div className="bg-white/5 p-3 rounded-md border border-white/10 flex justify-between items-center">
                      <p className="text-[10px] font-bold text-[#d4af37] uppercase">Deposit (40%)</p>
                      <p className="text-lg font-black">৳{depositAmount}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <button 
                        onClick={() => setPaymentMethod('bkash')} 
                        className={cn("h-10 rounded-md border flex items-center justify-center transition-all bg-white/5", 
                        paymentMethod === 'bkash' ? "border-[#d4af37]" : "border-white/5 opacity-40")}
                      >
                        <img src="https://logolook.net/wp-content/uploads/2023/07/bKash-Logo.png" className="h-3" alt="bkash" />
                      </button>
                    </div>
                    <Button 
                      disabled={!paymentMethod || loading} 
                      onClick={handlePayAndBook}
                      className="w-full h-10 bg-white text-black font-black rounded-md text-xs uppercase hover:bg-[#d4af37]"
                    >
                      {loading ? "Processing..." : "Pay & Book"}
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