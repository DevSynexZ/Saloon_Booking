// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useSession, signOut } from "next-auth/react";
// import { LayoutDashboard, Users, LogOut, ShieldCheck } from "lucide-react";

// export default function AdminNavbar() {
//   const { data: session } = useSession();
//   const pathname = usePathname();

//   return (
//     <nav className="w-full bg-zinc-950 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
//       {/* Brand / Logo */}
//       <div className="flex items-center gap-3">
//         <div className="p-2 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded">
//           <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
//         </div>
//         <div>
//           <span className="text-xs font-serif tracking-widest text-[#d4af37] block">SAILOR'S</span>
//           <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Admin Portal</span>
//         </div>
//       </div>

//       {/* Admin Navigation Links */}
//       <div className="flex items-center gap-6">
//         <Link 
//           href="/admin/dashboard" 
//           className={`flex items-center gap-2 text-xs uppercase tracking-widest transition-colors ${
//             pathname === "/admin/dashboard" ? "text-[#d4af37] font-bold" : "text-zinc-400 hover:text-white"
//           }`}
//         >
//           <LayoutDashboard className="w-4 h-4" />
//           Dashboard
//         </Link>

//         <Link 
//           href="/admin/customers" 
//           className={`flex items-center gap-2 text-xs uppercase tracking-widest transition-colors ${
//             pathname === "/admin/customers" ? "text-[#d4af37] font-bold" : "text-zinc-400 hover:text-white"
//           }`}
//         >
//           <Users className="w-4 h-4" />
//           Customer List
//         </Link>
//       </div>

//       {/* Admin Info & Logout */}
//       <div className="flex items-center gap-4">
//         <div className="text-right hidden sm:block">
//           <div className="text-xs font-bold text-white">{session?.user?.name || "Salon Admin"}</div>
//           <div className="text-[10px] text-zinc-500">{session?.user?.email}</div>
//         </div>

//         <button 
//           onClick={() => signOut({ callbackUrl: "/admin/auth" })}
//           className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all"
//         >
//           <LogOut className="w-3.5 h-3.5" />
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }





"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { LayoutDashboard, Users, LogOut, ShieldCheck } from "lucide-react";

export default function AdminNavbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="w-full bg-zinc-950 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
      {/* Brand / Logo */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded">
          <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
        </div>
        <div>
          <span className="text-xs font-serif tracking-widest text-[#d4af37] block">SAILOR'S</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Admin Portal</span>
        </div>
      </div>

      {/* Admin Navigation Links */}
      <div className="flex items-center gap-6">
        <Link 
          href="/admin/dashboard" 
          className={`flex items-center gap-2 text-xs uppercase tracking-widest transition-colors ${
            pathname === "/admin/dashboard" ? "text-[#d4af37] font-bold" : "text-zinc-400 hover:text-white"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>

        <Link 
          href="/admin/customers" 
          className={`flex items-center gap-2 text-xs uppercase tracking-widest transition-colors ${
            pathname === "/admin/customers" ? "text-[#d4af37] font-bold" : "text-zinc-400 hover:text-white"
          }`}
        >
          <Users className="w-4 h-4" />
          Customer List
        </Link>
      </div>

      {/* Admin Info & Logout */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <div className="text-xs font-bold text-white">{session?.user?.name || "Salon Admin"}</div>
          <div className="text-[10px] text-zinc-500">{session?.user?.email}</div>
        </div>

        <button 
          onClick={() => signOut({ callbackUrl: "/admin/auth" })}
          className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          Logout
        </button>
      </div>
    </nav>
  );
}