"use client";

import { useState } from "react";
import { format } from "date-fns";
import * as Icons from "lucide-react";
import { salonMenu, Service } from "@/config/services";
import { useSession, signOut } from "next-auth/react";

import { DateSelector } from "@/components/booking/DateSelector";
import { TimeSelector } from "@/components/booking/TimeSelector";
import { ServiceSelection } from "@/components/booking/ServiceSelection";
import { BookingSummary } from "@/components/booking/BookingSummary";

export default function BookingClient() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [activeCategory, setActiveCategory] = useState(salonMenu[0].category);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const depositAmount = (totalPrice * 0.4).toFixed(0);

  const handleServiceChange = (service: Service) => {
    const isSelected = selectedServices.some((s) => s.id === service.id);
    setSelectedServices((prev) =>
      isSelected ? prev.filter((s) => s.id !== service.id) : [...prev, service]
    );
    setShowPayment(false);
  };

  const handlePayAndBook = async (guestInfo?: { name: string; phone: string }) => {
    setLoading(true);
    try {
      const initRes = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          services: selectedServices.map((s) => s.name),
          date: date ? format(date, "yyyy-MM-dd") : "",
          slot: selectedSlot,
          amount: totalPrice,
          deposit: depositAmount,
          guestInfo,
        }),
      });

      const resData = await initRes.json();
      if (!initRes.ok) throw new Error(resData.error || "Failed to initiate booking");

      const res = await fetch("/api/payment/bkash/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: depositAmount, appointmentId: resData.appointmentId }),
      });

      const data = await res.json();
      if (data.bkashURL) {
        window.location.href = data.bkashURL;
      }
    } catch (err: any) {
      alert(err.message || "Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white p-4 md:p-6">
      <header className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.4em]">
            Ready for your transformation?
          </span>
          <h2 className="text-3xl font-black text-[#2d3a35] uppercase tracking-tighter">
            Welcome, {session?.user?.name || "Guest"}
          </h2>
        </div>

        {/* {session ? (
          <button
            onClick={() => signOut({ callbackUrl: "/book" })}
            className="self-start md:self-auto text-xs font-bold text-zinc-500 hover:text-red-600 underline flex items-center gap-1 transition-colors"
          >
            <Icons.LogOut className="w-3.5 h-3.5" />
            Sign Out / Book as Guest
          </button>
        ) : (
          <span className="text-xs text-zinc-400 italic">Booking as Guest</span>
        )} */}

        {!session && (
          <span className="text-xs text-zinc-400 italic">Booking as Guest</span>
        )}
        
      </header>

      <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
        <ServiceSelection
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          selectedServices={selectedServices}
          handleServiceChange={handleServiceChange}
        />

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          <DateSelector date={date} setDate={setDate} />
          <TimeSelector
            selectedSlot={selectedSlot}
            bookedSlots={bookedSlots}
            onSelect={setSelectedSlot}
          />
        </div>

        <BookingSummary
          date={date}
          selectedSlot={selectedSlot}
          selectedServices={selectedServices}
          totalPrice={totalPrice}
          depositAmount={depositAmount}
          showPayment={showPayment}
          setShowPayment={setShowPayment}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          loading={loading}
          isLoggedIn={!!session}
          handlePayAndBook={handlePayAndBook}
        />
      </div>
    </div>
  );
}