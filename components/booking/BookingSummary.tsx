// "use client";

// import { Button } from "@/components/ui/button";
// import { Service } from "@/config/services";
// import { format } from "date-fns";
// import { motion } from "framer-motion";
// import * as Icons from "lucide-react";
// import { cn } from "@/lib/utils";

// interface BookingSummaryProps {
//   date: Date | undefined;
//   selectedSlot: string | null;
//   selectedServices: Service[];
//   totalPrice: number;
//   depositAmount: string;
//   showPayment: boolean;
//   setShowPayment: (show: boolean) => void;
//   paymentMethod: string | null;
//   setPaymentMethod: (method: string) => void;
//   loading: boolean;
//   handlePayAndBook: () => void;
// }

// export function BookingSummary({
//   date,
//   selectedSlot,
//   selectedServices,
//   totalPrice,
//   depositAmount,
//   showPayment,
//   setShowPayment,
//   paymentMethod,
//   setPaymentMethod,
//   loading,
//   handlePayAndBook,
// }: BookingSummaryProps) {
//   return (
//     <div className="w-full">
//       <div className="bg-zinc-900 rounded-lg p-6 text-white shadow-xl w-full border border-zinc-800">
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div className="space-y-3">
//             <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Schedule</p>
//             <div className="flex items-center gap-3 text-sm">
//               <Icons.Calendar className="w-4 h-4 text-[#d4af37]" />
//               <p className="font-bold">{date ? format(date, "MMM do, yyyy") : "Not set"}</p>
//             </div>
//             <div className="flex items-center gap-3 text-sm">
//               <Icons.Clock className="w-4 h-4 text-[#d4af37]" />
//               <p className="font-bold">{selectedSlot || "Time not selected"}</p>
//             </div>
//           </div>

//           <div className="space-y-3 md:border-l md:pl-6 border-white/10">
//             <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Selected Services</p>
//             <div className="max-h-24 overflow-y-auto pr-2 space-y-2">
//               {selectedServices.length > 0 ? (
//                 selectedServices.map((s) => (
//                   <div key={s.id} className="flex justify-between items-center text-xs bg-white/5 p-2 rounded">
//                     <span className="text-zinc-300">{s.name}</span>
//                     <span className="font-black text-[#d4af37]">৳{s.price}</span>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-xs italic text-zinc-500">Pick a service to continue</p>
//               )}
//             </div>
//           </div>

//           <div className="lg:border-l lg:pl-6 border-white/10 flex flex-col justify-end">
//             <div className="mb-4">
//               <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-1">Total</p>
//               <span className="text-4xl font-black tracking-tighter">৳{totalPrice}</span>
//             </div>

//             {!showPayment ? (
//               <Button
//                 onClick={() => setShowPayment(true)}
//                 disabled={!selectedSlot || selectedServices.length === 0}
//                 className="w-full bg-[#d4af37] hover:bg-white hover:text-black text-zinc-900 h-12 rounded-md text-xs font-black transition-all uppercase"
//               >
//                 Confirm Appointment
//               </Button>
//             ) : (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
//                 <div className="bg-white/5 p-3 rounded-md border border-white/10 flex justify-between items-center">
//                   <p className="text-[10px] font-bold text-[#d4af37] uppercase">Deposit (40%)</p>
//                   <p className="text-lg font-black">৳{depositAmount}</p>
//                 </div>
//                 <div className="grid grid-cols-1 gap-2">
//                   <button
//                     onClick={() => setPaymentMethod("bkash")}
//                     className={cn(
//                       "h-10 rounded-md border flex items-center justify-center transition-all bg-white/5",
//                       paymentMethod === "bkash" ? "border-[#d4af37]" : "border-white/5 opacity-40"
//                     )}
//                   >
//                     <img
//                       src="https://logolook.net/wp-content/uploads/2023/07/bKash-Logo.png"
//                       className="h-3"
//                       alt="bkash"
//                     />
//                   </button>
//                 </div>
//                 <Button
//                   disabled={!paymentMethod || loading}
//                   onClick={handlePayAndBook}
//                   className="w-full h-10 bg-white text-black font-black rounded-md text-xs uppercase hover:bg-[#d4af37]"
//                 >
//                   {loading ? "Processing..." : "Pay & Book"}
//                 </Button>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Service } from "@/config/services";
import { format } from "date-fns";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingSummaryProps {
  date: Date | undefined;
  selectedSlot: string | null;
  selectedServices: Service[];
  totalPrice: number;
  depositAmount: string;
  showPayment: boolean;
  setShowPayment: (show: boolean) => void;
  paymentMethod: string | null;
  setPaymentMethod: (method: string) => void;
  loading: boolean;
  isLoggedIn: boolean;
  handlePayAndBook: (guestDetails?: { name: string; phone: string }) => void;
}

export function BookingSummary({
  date,
  selectedSlot,
  selectedServices,
  totalPrice,
  depositAmount,
  showPayment,
  setShowPayment,
  paymentMethod,
  setPaymentMethod,
  loading,
  isLoggedIn,
  handlePayAndBook,
}: BookingSummaryProps) {
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

  const onSubmit = () => {
    if (!isLoggedIn && (!guestName.trim() || !guestPhone.trim())) {
      alert("Please provide your Name and Phone number to continue.");
      return;
    }
    handlePayAndBook(!isLoggedIn ? { name: guestName, phone: guestPhone } : undefined);
  };

  return (
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
                selectedServices.map((s) => (
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
                {/* Guest Details Input if user is NOT logged in */}
                {!isLoggedIn && (
                  <div className="space-y-2 bg-white/5 p-3 rounded-md border border-white/10">
                    <p className="text-[10px] font-bold text-[#d4af37] uppercase">Guest Contact Details</p>
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 text-xs px-3 py-2 rounded text-white focus:outline-none focus:border-[#d4af37]"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number (e.g. 01700000000) *"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 text-xs px-3 py-2 rounded text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                )}

                <div className="bg-white/5 p-3 rounded-md border border-white/10 flex justify-between items-center">
                  <p className="text-[10px] font-bold text-[#d4af37] uppercase">Deposit (40%)</p>
                  <p className="text-lg font-black">৳{depositAmount}</p>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => setPaymentMethod("bkash")}
                    className={cn(
                      "h-10 rounded-md border flex items-center justify-center transition-all bg-white/5",
                      paymentMethod === "bkash" ? "border-[#d4af37]" : "border-white/5 opacity-40"
                    )}
                  >
                    <img
                      src="https://logolook.net/wp-content/uploads/2023/07/bKash-Logo.png"
                      className="h-3"
                      alt="bkash"
                    />
                  </button>
                </div>

                <Button
                  disabled={!paymentMethod || loading}
                  onClick={onSubmit}
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
  );
}