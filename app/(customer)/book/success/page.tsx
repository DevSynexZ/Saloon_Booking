"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, FileText, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");

  const handleDownloadPDF = () => {
    // PDF download trigger or window print
    window.print();
  };

  return (
    <main className="min-h-screen bg-[#f5efe0] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border border-[#d4af37]/30 p-8 shadow-2xl text-center">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>

        <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.4em]">
          Secure Payment Verified
        </span>
        <h1 className="text-2xl font-serif text-[#2d3a35] mt-1 mb-3">
          Booking Confirmed!
        </h1>
        <p className="text-zinc-600 text-xs mb-8">
          Your payment via bKash was successful. Your appointment has been successfully scheduled and recorded in our system.
        </p>

        {appointmentId && (
          <div className="bg-zinc-50 border border-zinc-200 p-3 mb-6 text-[10px] font-mono text-zinc-500">
            Reference ID: {appointmentId}
          </div>
        )}

        <div className="space-y-3">
          <Button 
            onClick={handleDownloadPDF}
            className="w-full bg-[#2d3a35] hover:bg-[#1f2824] text-white rounded-none py-6 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-[#d4af37]" />
            Download PDF of Your Booking
          </Button>

          <Link href="/dashboard" className="block w-full">
            <Button 
              variant="outline"
              className="w-full border-zinc-300 hover:bg-zinc-100 text-zinc-800 rounded-none py-6 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              OK / Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}