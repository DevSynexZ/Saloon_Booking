// // "use client";

// // import { useSearchParams } from "next/navigation";
// // import Link from "next/link";
// // import { CheckCircle2, FileText, Home } from "lucide-react";
// // import { Button } from "@/components/ui/button";

// // export default function BookingSuccessPage() {
// //   const searchParams = useSearchParams();
// //   const appointmentId = searchParams.get("appointmentId");

// //   const handleDownloadPDF = () => {
// //     // PDF download trigger or window print
// //     window.print();
// //   };

// //   return (
// //     <main className="min-h-screen bg-[#f5efe0] flex items-center justify-center p-6">
// //       <div className="max-w-md w-full bg-white border border-[#d4af37]/30 p-8 shadow-2xl text-center">
// //         <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
// //           <CheckCircle2 className="w-8 h-8 text-emerald-600" />
// //         </div>

// //         <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.4em]">
// //           Secure Payment Verified
// //         </span>
// //         <h1 className="text-2xl font-serif text-[#2d3a35] mt-1 mb-3">
// //           Booking Confirmed!
// //         </h1>
// //         <p className="text-zinc-600 text-xs mb-8">
// //           Your payment via bKash was successful. Your appointment has been successfully scheduled and recorded in our system.
// //         </p>

// //         {appointmentId && (
// //           <div className="bg-zinc-50 border border-zinc-200 p-3 mb-6 text-[10px] font-mono text-zinc-500">
// //             Reference ID: {appointmentId}
// //           </div>
// //         )}

// //         <div className="space-y-3">
// //           <Button 
// //             onClick={handleDownloadPDF}
// //             className="w-full bg-[#2d3a35] hover:bg-[#1f2824] text-white rounded-none py-6 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
// //           >
// //             <FileText className="w-4 h-4 text-[#d4af37]" />
// //             Download PDF of Your Booking
// //           </Button>

// //           <Link href="/dashboard" className="block w-full">
// //             <Button 
// //               variant="outline"
// //               className="w-full border-zinc-300 hover:bg-zinc-100 text-zinc-800 rounded-none py-6 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
// //             >
// //               <Home className="w-4 h-4" />
// //               OK / Go to Dashboard
// //             </Button>
// //           </Link>
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }




// "use client";

// import { Suspense, useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { CheckCircle2, FileText, Home } from "lucide-react";
// import { Button } from "@/components/ui/button";

// function SuccessContent() {
//   const searchParams = useSearchParams();
//   const appointmentId = searchParams.get("appointmentId");
//   const [bookingDetails, setBookingDetails] = useState<any>(null);


//   useEffect(() => {
//     if (appointmentId) {
//       fetch(`/api/dashboard`)
//         .then((res) => res.json())
//         .then((data) => setBookingDetails(data))
//         .catch((err) => console.error("Error Fetching Booking Info: ", err));
//     }
//   }, [appointmentId]);

//   const handleDownloadPDF = (sessionItem: any) => {
//     const printWindow = window.open("", "_blank");
//     if (!printWindow) return;

    

//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Appointment Ticket - Sailor's Grooming</title>
//           <style>
//             body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #111; padding: 40px; }
//             .ticket { max-width: 600px; margin: auto; border: 2px solid #d4af37; padding: 30px; background: #fff; }
//             .header { text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 20px; margin-bottom: 20px; }
//             .header h1 { color: #d4af37; margin: 0; font-family: serif; letter-spacing: 2px; }
//             .section { margin-bottom: 20px; }
//             .label { font-size: 11px; text-transform: uppercase; color: #666; letter-spacing: 1px; }
//             .value { font-size: 16px; font-weight: bold; margin-top: 4px; }
//             .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
//             .footer { text-align: center; font-size: 12px; color: #777; margin-top: 30px; border-top: 1px solid #eee; pt: 15px; }
//           </style>
//         </head>
//         <body>
//           <div class="ticket">
//             <div class="header">
//               <h1>SAILOR'S</h1>
//               <p style="margin: 5px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 3px;">Official Appointment Pass</p>
//             </div>
            
//             <div class="grid section">
//               <div>
//                 <div class="label">Client Name</div>
//                 <div class="value">${dashboardData?.user?.name || "Gentleman"}</div>
//               </div>
//               <div>
//                 <div class="label">Phone Number</div>
//                 <div class="value">${dashboardData?.user?.phone || "N/A"}</div>
//               </div>
//             </div>

//             <div class="section">
//               <div class="label">Email Address</div>
//               <div class="value">${dashboardData?.user?.email || "N/A"}</div>
//             </div>

//             <div class="section" style="background: #f9f9f9; padding: 15px; border-left: 4px solid #d4af37;">
//               <div class="label">Service Booked</div>
//               <div class="value" style="font-size: 18px; color: #d4af37;">${sessionItem.serviceName}</div>
//             </div>

//             <div class="grid section">
//               <div>
//                 <div class="label">Appointment Date</div>
//                 <div class="value">${new Date(sessionItem.date).toLocaleDateString()}</div>
//               </div>
//               <div>
//                 <div class="label">Time Slot</div>
//                 <div class="value">${sessionItem.slot}</div>
//               </div>
//             </div>

//             <div class="grid section">
//               <div>
//                 <div class="label">Booking Status</div>
//                 <div class="value" style="text-transform: uppercase; color: green;">${sessionItem.status}</div>
//               </div>
//               <div>
//                 <div class="label">Payment Status</div>
//                 <div class="value">${sessionItem.payment?.isVerified ? "Verified / Paid" : "Pending Verification"}</div>
//               </div>
//             </div>

//             <div class="footer">
//               <p>Thank you for choosing Sailor's. Please arrive 10 minutes prior to your slot.</p>
//             </div>
//           </div>
//           <script>
//             window.onload = function() { window.print(); window.close(); }
//           </script>
//         </body>
//       </html>
//     `;

//     printWindow.document.write(htmlContent);
//     printWindow.document.close();
//   };

//   return (
//     <div className="max-w-md w-full bg-white border border-[#d4af37]/30 p-8 shadow-2xl text-center">
//       <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
//         <CheckCircle2 className="w-8 h-8 text-emerald-600" />
//       </div>

//       <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.4em]">
//         Secure Payment Verified
//       </span>
//       <h1 className="text-2xl font-serif text-[#2d3a35] mt-1 mb-3">
//         Booking Confirmed!
//       </h1>
//       <p className="text-zinc-600 text-xs mb-8">
//         Your payment via bKash was successful. Your appointment has been successfully scheduled and recorded in our system.
//       </p>

//       {appointmentId && (
//         <div className="bg-zinc-50 border border-zinc-200 p-3 mb-6 text-[10px] font-mono text-zinc-500">
//           Reference ID: {appointmentId}
//         </div>
//       )}

//       <div className="space-y-3">
//         <Button
//           onClick={handleDownloadPDF}
//           className="w-full bg-[#2d3a35] hover:bg-[#1f2824] text-white rounded-none py-6 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
//         >
//           <FileText className="w-4 h-4 text-[#d4af37]" />
//           Download PDF of Your Booking
//         </Button>

//         <Link href="/dashboard" className="block w-full">
//           <Button
//             variant="outline"
//             className="w-full border-zinc-300 hover:bg-zinc-100 text-zinc-800 rounded-none py-6 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
//           >
//             <Home className="w-4 h-4" />
//             OK / Go to Dashboard
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default function BookingSuccessPage() {
//   return (
//     <main className="min-h-screen bg-[#f5efe0] flex items-center justify-center p-6">
//       <Suspense fallback={<div className="text-zinc-500 text-xs uppercase tracking-widest">Loading confirmation...</div>}>
//         <SuccessContent />
//       </Suspense>
//     </main>
//   );
// }





"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, FileText, Home, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function SuccessContent() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  useEffect(() => {
    if (appointmentId) {
      fetch(`/api/dashboard`)
        .then((res) => res.json())
        .then((data) => setBookingDetails(data))
        .catch((err) => console.error("Error fetching booking info:", err));
    }
  }, [appointmentId]);

  const handleDownloadPDF = async () => {
    setGeneratingPdf(true);

    try {
      // Dynamically import html2pdf on the client side
      const html2pdf = (await import("html2pdf.js")).default;

      const sessionItem = bookingDetails?.upcomingSessions?.[0] || {
        serviceName: "Haircut & Grooming",
        date: new Date(),
        slot: "Scheduled",
        status: "Confirmed",
        payment: { isVerified: true },
      };

      const clientName = bookingDetails?.user?.name || "Valued Guest";
      const clientPhone = bookingDetails?.user?.phone || "N/A";
      const clientEmail = bookingDetails?.user?.email || "N/A";

      // Create a hidden DOM element for the ticket layout
      const ticketContainer = document.createElement("div");
      ticketContainer.style.padding = "20px";
      ticketContainer.style.backgroundColor = "#ffffff";
      ticketContainer.style.color = "#111111";
      ticketContainer.style.fontFamily = "Helvetica, Arial, sans-serif";

      ticketContainer.innerHTML = `
        <div style="max-width: 500px; margin: 0 auto; border: 2px solid #d4af37; padding: 24px; background: #ffffff;">
          <div style="text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 16px; margin-bottom: 20px;">
            <h1 style="color: #d4af37; margin: 0; font-family: serif; letter-spacing: 2px; font-size: 28px;">SAILOR'S</h1>
            <p style="margin: 4px 0 0; font-size: 10px; text-transform: uppercase; letter-spacing: 3px; color: #555;">Official Appointment Pass</p>
          </div>
          
          <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
            <div>
              <div style="font-size: 10px; text-transform: uppercase; color: #777; letter-spacing: 1px;">Client Name</div>
              <div style="font-size: 14px; font-weight: bold; margin-top: 2px;">${clientName}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 10px; text-transform: uppercase; color: #777; letter-spacing: 1px;">Phone Number</div>
              <div style="font-size: 14px; font-weight: bold; margin-top: 2px;">${clientPhone}</div>
            </div>
          </div>

          <div style="margin-bottom: 16px;">
            <div style="font-size: 10px; text-transform: uppercase; color: #777; letter-spacing: 1px;">Email Address</div>
            <div style="font-size: 14px; font-weight: bold; margin-top: 2px;">${clientEmail}</div>
          </div>

          <div style="background: #fdfbf7; padding: 12px; border-left: 4px solid #d4af37; margin-bottom: 16px;">
            <div style="font-size: 10px; text-transform: uppercase; color: #777; letter-spacing: 1px;">Service Booked</div>
            <div style="font-size: 16px; font-weight: bold; color: #d4af37; margin-top: 2px;">${sessionItem.serviceName}</div>
          </div>

          <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
            <div>
              <div style="font-size: 10px; text-transform: uppercase; color: #777; letter-spacing: 1px;">Appointment Date</div>
              <div style="font-size: 14px; font-weight: bold; margin-top: 2px;">${new Date(sessionItem.date).toLocaleDateString()}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 10px; text-transform: uppercase; color: #777; letter-spacing: 1px;">Time Slot</div>
              <div style="font-size: 14px; font-weight: bold; margin-top: 2px;">${sessionItem.slot}</div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
            <div>
              <div style="font-size: 10px; text-transform: uppercase; color: #777; letter-spacing: 1px;">Booking Status</div>
              <div style="font-size: 14px; font-weight: bold; color: #16a34a; text-transform: uppercase; margin-top: 2px;">${sessionItem.status}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 10px; text-transform: uppercase; color: #777; letter-spacing: 1px;">Reference ID</div>
              <div style="font-size: 11px; font-family: monospace; font-weight: bold; margin-top: 2px;">${appointmentId || "N/A"}</div>
            </div>
          </div>

          <div style="text-align: center; font-size: 11px; color: #777; margin-top: 24px; border-top: 1px dashed #ddd; padding-top: 12px;">
            Thank you for choosing Sailor's. Please arrive 10 minutes prior to your slot.
          </div>
        </div>
      `;

      // Options for html2pdf with explicit 'as const' casting
      const opt: any = {
        margin: 10,
        filename: `Sailors_Booking_${appointmentId || "pass"}.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { scale: 2, logging: false },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      // Generate and save PDF directly
      await html2pdf().set(opt).from(ticketContainer).save();
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setGeneratingPdf(false);
    }
  };

  return (
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
          disabled={generatingPdf}
          className="w-full bg-[#2d3a35] hover:bg-[#1f2824] text-white rounded-none py-6 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
        >
          {generatingPdf ? (
            <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
          ) : (
            <FileText className="w-4 h-4 text-[#d4af37]" />
          )}
          {generatingPdf ? "Generating PDF..." : "Download PDF Pass"}
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
  );
}

export default function BookingSuccessPage() {
  return (
    <main className="min-h-screen bg-[#f5efe0] flex items-center justify-center p-6">
      <Suspense fallback={<div className="text-zinc-500 text-xs uppercase tracking-widest">Loading confirmation...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}