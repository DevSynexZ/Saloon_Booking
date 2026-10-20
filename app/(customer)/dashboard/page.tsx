// "use client";

// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { Scissors, Calendar, Clock, Sparkles, User, ArrowRight, ShieldCheck } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useScissorsTransition } from "@/components/ScissorsTransition";

// export default function DashboardPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const { triggerTransition } = useScissorsTransition();
//   const [dashboardData, setDashboardData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/auth");
//     } else if (status === "authenticated") {
//       fetch("/api/dashboard")
//         .then((res) => res.json())
//         .then((data) => {
//           setDashboardData(data);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error(err);
//           setLoading(false);
//         });
//     }
//   }, [status, router]);

//   if (loading || status === "loading") {
//     return (
//       <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-[#d4af37]">
//         <Scissors className="animate-spin w-8 h-8" />
//       </div>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-28 pb-16 px-6">
//       <div className="max-w-6xl mx-auto space-y-12">
        
//         {/* Header / Welcome Banner */}
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-zinc-800 pb-8 gap-6">
//           <div>
//             <span className="text-[#d4af37] text-xs uppercase tracking-[0.3em] font-medium">Client Portal</span>
//             <h1 className="text-4xl font-serif text-[#d4af37] mt-1">Welcome back, {dashboardData?.user?.name || "Gentleman"}</h1>
//             <p className="text-zinc-400 text-sm mt-1">Manage your grooming sessions and review your barber's notes.</p>
//           </div>
//           <Button
//             onClick={() => triggerTransition("/book")}
//             className="bg-[#d4af37] hover:bg-[#b8962d] text-zinc-950 rounded-none px-8 py-6 text-sm font-bold tracking-widest flex items-center gap-2 group"
//           >
//             Book New Session
//             <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//           </Button>
//         </div>

//         {/* Last Treatment & Barber Notes Card */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 bg-zinc-900/60 border border-[#d4af37]/30 p-8 relative overflow-hidden">
//             <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-2xl pointer-events-none" />
//             <div className="flex items-center gap-3 mb-6">
//               <Sparkles className="text-[#d4af37] w-5 h-5" />
//               <h2 className="font-serif text-xl text-[#d4af37]">Latest Hair Treatment & Barber Notes</h2>
//             </div>

//             {dashboardData?.lastTreatment ? (
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4 border-b border-zinc-800 pb-4">
//                   <div>
//                     <span className="text-zinc-500 text-xs uppercase tracking-wider">Last Service</span>
//                     <p className="text-zinc-200 font-medium">{dashboardData.lastTreatment.serviceName}</p>
//                   </div>
//                   <div>
//                     <span className="text-zinc-500 text-xs uppercase tracking-wider">Preferred Style</span>
//                     <p className="text-zinc-200 font-medium">{dashboardData.lastTreatment.haircutStyle}</p>
//                   </div>
//                 </div>
//                 <div>
//                   <span className="text-zinc-500 text-xs uppercase tracking-wider block mb-1">Barber's Remarks</span>
//                   <blockquote className="text-zinc-300 text-sm italic bg-zinc-950/50 p-4 border-l-2 border-[#d4af37]">
//                     "{dashboardData.lastTreatment.barberNotes}"
//                   </blockquote>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-zinc-400 text-sm italic">No previous treatments recorded yet. Book your first session to receive custom barber notes!</p>
//             )}
//           </div>

//           {/* Quick Profile Summary */}
//           <div className="bg-zinc-900/60 border border-zinc-800 p-8 flex flex-col justify-between">
//             <div>
//               <h3 className="font-serif text-lg text-[#d4af37] mb-4">Member Status</h3>
//               <div className="space-y-3 text-sm text-zinc-300">
//                 <div className="flex items-center justify-between py-2 border-b border-zinc-800">
//                   <span className="text-zinc-500">Account</span>
//                   <span className="text-zinc-200">{dashboardData?.user?.email}</span>
//                 </div>
//                 <div className="flex items-center justify-between py-2 border-b border-zinc-800">
//                   <span className="text-zinc-500">Membership</span>
//                   <span className="text-[#d4af37] font-semibold flex items-center gap-1">
//                     <ShieldCheck className="w-4 h-4" /> VIP Subscriber
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-6">
//               <span className="text-xs text-zinc-500 uppercase tracking-wider">Total Bookings</span>
//               <p className="text-2xl font-serif text-[#d4af37] mt-1">
//                 {(dashboardData?.upcomingSessions?.length || 0) + (dashboardData?.pastSessions?.length || 0)} Sessions
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Upcoming Booked Sessions */}
//         <div className="space-y-6">
//           <h2 className="font-serif text-2xl text-[#d4af37]">Upcoming Booked Sessions</h2>
//           {dashboardData?.upcomingSessions?.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {dashboardData.upcomingSessions.map((session: any) => (
//                 <div key={session._id} className="bg-zinc-900/40 border border-[#d4af37]/20 p-6 flex justify-between items-center">
//                   <div className="space-y-2">
//                     <span className="text-xs bg-[#d4af37]/10 text-[#d4af37] px-2.5 py-1 uppercase tracking-widest font-semibold">
//                       {session.status}
//                     </span>
//                     <h4 className="font-serif text-lg text-zinc-100">{session.serviceName}</h4>
//                     <div className="flex items-center gap-4 text-xs text-zinc-400">
//                       <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#d4af37]" /> {new Date(session.date).toLocaleDateString()}</span>
//                       <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#d4af37]" /> {session.slot}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="bg-zinc-900/30 border border-zinc-800 p-8 text-center">
//               <p className="text-zinc-400 text-sm">You have no upcoming sessions booked.</p>
//               <Button
//                 onClick={() => triggerTransition("/book")}
//                 variant="outline"
//                 className="mt-4 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-zinc-950 rounded-none"
//               >
//                 Schedule Appointment Now
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Previous Services History */}
//         <div className="space-y-6">
//           <h2 className="font-serif text-2xl text-[#d4af37]">Past Services History</h2>
//           {dashboardData?.pastSessions?.length > 0 ? (
//             <div className="bg-zinc-900/30 border border-zinc-800 overflow-x-auto">
//               <table className="w-full text-left text-sm text-zinc-300">
//                 <thead className="bg-zinc-900 text-[#d4af37] uppercase text-xs tracking-wider border-b border-zinc-800">
//                   <tr>
//                     <th className="p-4">Service</th>
//                     <th className="p-4">Date</th>
//                     <th className="p-4">Slot</th>
//                     <th className="p-4">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-zinc-800">
//                   {dashboardData.pastSessions.map((past: any) => (
//                     <tr key={past._id} className="hover:bg-zinc-900/50">
//                       <td className="p-4 font-medium text-zinc-100">{past.serviceName}</td>
//                       <td className="p-4">{new Date(past.date).toLocaleDateString()}</td>
//                       <td className="p-4">{past.slot}</td>
//                       <td className="p-4 text-zinc-400 capitalize">{past.status}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p className="text-zinc-500 text-sm italic">No past history found.</p>
//           )}
//         </div>

//       </div>
//     </main>
//   );
// }











"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Scissors, Calendar, Clock, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScissorsTransition } from "@/components/ScissorsTransition";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { triggerTransition } = useScissorsTransition();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    } else if (status === "authenticated") {
      // Guard: If an Admin lands on the customer dashboard, redirect them to the Admin Panel
      if (session?.user?.role === "admin") {
        router.replace("/admin/dashboard");
        return;
      }

      fetch("/api/dashboard")
        .then((res) => res.json())
        .then((data) => {
          setDashboardData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [status, session, router]);

  if (loading || status === "loading" || session?.user?.role === "admin") {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-[#d4af37]">
        <Scissors className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header / Welcome Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-zinc-800 pb-8 gap-6">
          <div>
            <span className="text-[#d4af37] text-xs uppercase tracking-[0.3em] font-medium">Client Portal</span>
            <h1 className="text-4xl font-serif text-[#d4af37] mt-1">
              Welcome back, {dashboardData?.user?.name || "Gentleman"}
            </h1>
            <p className="text-zinc-400 text-sm mt-1">Manage your grooming sessions and review your barber's notes.</p>
          </div>
          <Button
            onClick={() => triggerTransition("/book")}
            className="bg-[#d4af37] hover:bg-[#b8962d] text-zinc-950 rounded-none px-8 py-6 text-sm font-bold tracking-widest flex items-center gap-2 group"
          >
            Book New Session
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Last Treatment & Barber Notes Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-zinc-900/60 border border-[#d4af37]/30 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-[#d4af37] w-5 h-5" />
              <h2 className="font-serif text-xl text-[#d4af37]">Latest Hair Treatment & Barber Notes</h2>
            </div>

            {dashboardData?.lastTreatment ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 border-b border-zinc-800 pb-4">
                  <div>
                    <span className="text-zinc-500 text-xs uppercase tracking-wider">Last Service</span>
                    <p className="text-zinc-200 font-medium">{dashboardData.lastTreatment.serviceName}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-xs uppercase tracking-wider">Preferred Style</span>
                    <p className="text-zinc-200 font-medium">{dashboardData.lastTreatment.haircutStyle}</p>
                  </div>
                </div>
                <div>
                  <span className="text-zinc-500 text-xs uppercase tracking-wider block mb-1">Barber's Remarks</span>
                  <blockquote className="text-zinc-300 text-sm italic bg-zinc-950/50 p-4 border-l-2 border-[#d4af37]">
                    "{dashboardData.lastTreatment.barberNotes}"
                  </blockquote>
                </div>
              </div>
            ) : (
              <p className="text-zinc-400 text-sm italic">
                No previous treatments recorded yet. Book your first session to receive custom barber notes!
              </p>
            )}
          </div>

          {/* Quick Profile Summary */}
          <div className="bg-zinc-900/60 border border-zinc-800 p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-lg text-[#d4af37] mb-4">Member Status</h3>
              <div className="space-y-3 text-sm text-zinc-300">
                <div className="flex items-center justify-between py-2 border-b border-zinc-800">
                  <span className="text-zinc-500">Account</span>
                  <span className="text-zinc-200">{dashboardData?.user?.email}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-zinc-800">
                  <span className="text-zinc-500">Membership</span>
                  <span className="text-[#d4af37] font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> VIP Subscriber
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <span className="text-xs text-zinc-500 uppercase tracking-wider">Total Bookings</span>
              <p className="text-2xl font-serif text-[#d4af37] mt-1">
                {(dashboardData?.upcomingSessions?.length || 0) + (dashboardData?.pastSessions?.length || 0)} Sessions
              </p>
            </div>
          </div>
        </div>

        {/* Upcoming Booked Sessions */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl text-[#d4af37]">Upcoming Booked Sessions</h2>
          {dashboardData?.upcomingSessions?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dashboardData.upcomingSessions.map((session: any) => (
                <div key={session._id} className="bg-zinc-900/40 border border-[#d4af37]/20 p-6 flex justify-between items-center">
                  <div className="space-y-2">
                    <span className="text-xs bg-[#d4af37]/10 text-[#d4af37] px-2.5 py-1 uppercase tracking-widest font-semibold">
                      {session.status}
                    </span>
                    <h4 className="font-serif text-lg text-zinc-100">{session.serviceName}</h4>
                    <div className="flex items-center gap-4 text-xs text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#d4af37]" /> {new Date(session.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#d4af37]" /> {session.slot}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-zinc-900/30 border border-zinc-800 p-8 text-center">
              <p className="text-zinc-400 text-sm">You have no upcoming sessions booked.</p>
              <Button
                onClick={() => triggerTransition("/book")}
                variant="outline"
                className="mt-4 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-zinc-950 rounded-none"
              >
                Schedule Appointment Now
              </Button>
            </div>
          )}
        </div>

        {/* Previous Services History */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl text-[#d4af37]">Past Services History</h2>
          {dashboardData?.pastSessions?.length > 0 ? (
            <div className="bg-zinc-900/30 border border-zinc-800 overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-300">
                <thead className="bg-zinc-900 text-[#d4af37] uppercase text-xs tracking-wider border-b border-zinc-800">
                  <tr>
                    <th className="p-4">Service</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Slot</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {dashboardData.pastSessions.map((past: any) => (
                    <tr key={past._id} className="hover:bg-zinc-900/50">
                      <td className="p-4 font-medium text-zinc-100">{past.serviceName}</td>
                      <td className="p-4">{new Date(past.date).toLocaleDateString()}</td>
                      <td className="p-4">{past.slot}</td>
                      <td className="p-4 text-zinc-400 capitalize">{past.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-zinc-500 text-sm italic">No past history found.</p>
          )}
        </div>

      </div>
    </main>
  );
}