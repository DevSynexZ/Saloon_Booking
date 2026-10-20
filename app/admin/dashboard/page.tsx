// "use client";

// import { useState, useEffect } from "react";
// import { format } from "date-fns";
// import * as Icons from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useSession, signOut } from "next-auth/react";

// export default function AdminDashboard() {
//   const { data: session } = useSession();
//   const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
//   const [appointments, setAppointments] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchAppointments = async (date: string) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`/api/admin/appointments?date=${date}`);
//       const data = await res.json();
//       if (data.success) {
//         setAppointments(data.appointments);
//       }
//     } catch (err) {
//       console.error("Failed to load appointments", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAppointments(selectedDate);
//   }, [selectedDate]);

//   return (
//     <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">
//       {/* Header */}
//       <header className="flex justify-between items-center mb-10 pb-6 border-b border-zinc-800">
//         <div>
//           <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.4em]">
//             Admin Control Center
//           </span>
//           <h1 className="text-3xl font-serif text-[#d4af37] tracking-tight">
//             Sailor's Dashboard
//           </h1>
//         </div>
//         <div className="flex items-center gap-4">
//           <span className="text-xs text-zinc-400">Logged in as {session?.user?.email}</span>
//           <Button 
//             onClick={() => signOut({ callbackUrl: "/auth" })}
//             className="bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white text-xs font-bold uppercase rounded-none"
//           >
//             Logout
//           </Button>
//         </div>
//       </header>

//       {/* Controls / Date Filter */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-zinc-900/50 p-4 border border-zinc-800">
//         <div className="flex items-center gap-3">
//           <Icons.Calendar className="w-5 h-5 text-[#d4af37]" />
//           <span className="text-sm font-bold uppercase tracking-wider">Filter by Date:</span>
//           <input 
//             type="date" 
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="bg-black border border-zinc-700 text-white text-xs px-3 py-2 rounded focus:outline-none focus:border-[#d4af37]"
//           />
//         </div>
//         <div className="text-xs text-zinc-400">
//           Showing <span className="text-[#d4af37] font-bold">{appointments.length}</span> confirmed reservations for {selectedDate}
//         </div>
//       </div>

//       {/* Appointments Table */}
//       <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg overflow-hidden">
//         {loading ? (
//           <div className="p-12 text-center text-zinc-500 text-xs uppercase tracking-widest">
//             Loading reservations...
//           </div>
//         ) : appointments.length === 0 ? (
//           <div className="p-12 text-center text-zinc-500 text-xs uppercase tracking-widest">
//             No confirmed appointments found for this date.
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="border-b border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-black/40">
//                   <th className="p-4">Time Slot</th>
//                   <th className="p-4">Client Contact</th>
//                   <th className="p-4">Service</th>
//                   <th className="p-4">Payment Method</th>
//                   <th className="p-4">Transaction ID</th>
//                   <th className="p-4 text-right">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-zinc-800 text-xs">
//                 {appointments.map((app) => (
//                   <tr key={app._id} className="hover:bg-white/5 transition-colors">
//                     <td className="p-4 font-bold text-[#d4af37] flex items-center gap-2">
//                       <Icons.Clock className="w-3.5 h-3.5" />
//                       {app.slot}
//                     </td>
//                     <td className="p-4 font-medium">
//                       <div className="text-white">{app.clientName || "Registered User"}</div>
//                       <div className="text-[10px] text-zinc-500">{app.user}</div>
//                     </td>
//                     <td className="p-4 text-zinc-300">{app.serviceName}</td>
//                     <td className="p-4 uppercase text-zinc-400">{app.payment?.method || "bKash"}</td>
//                     <td className="p-4 font-mono text-zinc-400">{app.payment?.transactionId || "N/A"}</td>
//                     <td className="p-4 text-right">
//                       <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider">
//                         {app.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





// "use client";

// import { useState, useEffect } from "react";
// import { format } from "date-fns";
// import * as Icons from "lucide-react";

// export default function AdminDashboard() {
//   const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
//   const [appointments, setAppointments] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchAppointments = async (date: string) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`/api/admin/appointments?date=${date}`);
//       const data = await res.json();
//       if (data.success) {
//         setAppointments(data.appointments);
//       }
//     } catch (err) {
//       console.error("Failed to load appointments", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAppointments(selectedDate);
//   }, [selectedDate]);

//   return (
//     <div className="p-6 md:p-10">
//       {/* Page Title Section */}
//       <div className="mb-8">
//         <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.4em]">
//           Control Center
//         </span>
//         <h1 className="text-3xl font-serif text-[#d4af37] tracking-tight">
//           Confirmed Reservations
//         </h1>
//       </div>

//       {/* Controls / Date Filter */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-zinc-900/50 p-4 border border-zinc-800">
//         <div className="flex items-center gap-3">
//           <Icons.Calendar className="w-5 h-5 text-[#d4af37]" />
//           <span className="text-sm font-bold uppercase tracking-wider">Filter by Date:</span>
//           <input 
//             type="date" 
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="bg-black border border-zinc-700 text-white text-xs px-3 py-2 rounded focus:outline-none focus:border-[#d4af37]"
//           />
//         </div>
//         <div className="text-xs text-zinc-400">
//           Showing <span className="text-[#d4af37] font-bold">{appointments.length}</span> confirmed reservations for {selectedDate}
//         </div>
//       </div>

//       {/* Appointments Table */}
//       <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg overflow-hidden">
//         {loading ? (
//           <div className="p-12 text-center text-zinc-500 text-xs uppercase tracking-widest">
//             Loading reservations...
//           </div>
//         ) : appointments.length === 0 ? (
//           <div className="p-12 text-center text-zinc-500 text-xs uppercase tracking-widest">
//             No confirmed appointments found for this date.
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="border-b border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-black/40">
//                   <th className="p-4">Time Slot</th>
//                   <th className="p-4">Client Contact</th>
//                   <th className="p-4">Service</th>
//                   <th className="p-4">Payment Method</th>
//                   <th className="p-4">Transaction ID</th>
//                   <th className="p-4 text-right">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-zinc-800 text-xs">
//                 {appointments.map((app) => (
//                   <tr key={app._id} className="hover:bg-white/5 transition-colors">
//                     <td className="p-4 font-bold text-[#d4af37] flex items-center gap-2">
//                       <Icons.Clock className="w-3.5 h-3.5" />
//                       {app.slot}
//                     </td>
//                     <td className="p-4 font-medium">
//                       <div className="text-white">{app.name || "Registered User"}</div>
//                       <div className="text-[10px] text-zinc-500">{app.user}</div>
//                     </td>
//                     <td className="p-4 text-zinc-300">{app.serviceName}</td>
//                     <td className="p-4 uppercase text-zinc-400">{app.payment?.method || "bKash"}</td>
//                     <td className="p-4 font-mono text-zinc-400">{app.payment?.transactionId || "N/A"}</td>
//                     <td className="p-4 text-right">
//                       <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider">
//                         {app.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import * as Icons from "lucide-react";

export default function AdminDashboard() {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async (date: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/appointments?date=${date}`);
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (err) {
      console.error("Failed to load appointments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments(selectedDate);
  }, [selectedDate]);

  return (
    <div className="p-6 md:p-10">
      {/* Page Title Section */}
      <div className="mb-8">
        <span className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.4em]">
          Control Center
        </span>
        <h1 className="text-3xl font-serif text-[#d4af37] tracking-tight">
          Confirmed Reservations
        </h1>
      </div>

      {/* Controls / Date Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-zinc-900/50 p-4 border border-zinc-800">
        <div className="flex items-center gap-3">
          <Icons.Calendar className="w-5 h-5 text-[#d4af37]" />
          <span className="text-sm font-bold uppercase tracking-wider">Filter by Date:</span>
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-black border border-zinc-700 text-white text-xs px-3 py-2 rounded focus:outline-none focus:border-[#d4af37]"
          />
        </div>
        <div className="text-xs text-zinc-400">
          Showing <span className="text-[#d4af37] font-bold">{appointments.length}</span> confirmed reservations for {selectedDate}
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-zinc-500 text-xs uppercase tracking-widest">
            Loading reservations...
          </div>
        ) : appointments.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 text-xs uppercase tracking-widest">
            No confirmed appointments found for this date.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-black/40">
                  <th className="p-4">Time Slot</th>
                  <th className="p-4">Client Contact Details</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Payment Method</th>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-xs">
                {appointments.map((app) => (
                  <tr key={app._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-[#d4af37] flex items-center gap-2">
                      <Icons.Clock className="w-3.5 h-3.5" />
                      {app.slot}
                    </td>
                    <td className="p-4 font-medium">
                      <div className="text-white font-bold">{app.userId?.name || "Valued Client"}</div>
                      <div className="text-[10px] text-zinc-400">{app.userId?.email || "No email"}</div>
                      <div className="text-[10px] text-[#d4af37] font-mono">{app.userId?.phone || "Phone not provided"}</div>
                    </td>
                    <td className="p-4 text-zinc-300">{app.serviceName}</td>
                    <td className="p-4 uppercase text-zinc-400">{app.payment?.method || "bKash"}</td>
                    <td className="p-4 font-mono text-zinc-400">{app.payment?.transactionId || "N/A"}</td>
                    <td className="p-4 text-right">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider">
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
