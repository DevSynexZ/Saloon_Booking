// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import Link from "next/link";
// import { ShieldAlert, Loader2, Lock } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export default function AdminAuthPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleAdminLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const result = await signIn("credentials", {
//         redirect: false,
//         email,
//         password,
//       });

//       if (result?.error) {
//         throw new Error("Invalid admin credentials");
//       }

//       if (!result?.ok) {
//         throw new Error("Authentication failed.");
//       }

//       // Hard navigation forces full reload and cookie attachment
//       window.location.href = "/admin/dashboard";
//     } catch (err: any) {
//       setError(err.message || "Something went wrong");
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-6 py-12">
//       <Link href="/" className="mb-8 flex flex-col items-center gap-2 group">
//         <div className="p-3 bg-[#d4af37]/15 border border-[#d4af37]/30 rounded-full">
//           <Lock className="text-[#d4af37] w-6 h-6" />
//         </div>
//         <h1 className="font-serif text-[#d4af37] text-3xl tracking-tighter">SAILOR'S ADMIN</h1>
//         <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 font-bold">
//           Restricted Control Center
//         </span>
//       </Link>

//       <div className="w-full max-w-md bg-zinc-900/40 border border-[#d4af37]/20 p-8 backdrop-blur-2xl shadow-2xl">
//         <div className="mb-8 text-center">
//           <h2 className="text-lg font-serif text-white">Administrator Sign In</h2>
//           <p className="text-zinc-500 text-xs mt-1">Please enter your master credentials to proceed.</p>
//         </div>

//         {error && (
//           <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 p-3 mb-6 text-xs uppercase tracking-wider">
//             <ShieldAlert className="w-4 h-4 shrink-0" />
//             <span>{error}</span>
//           </div>
//         )}

//         <form onSubmit={handleAdminLogin} className="space-y-5">
//           <div className="space-y-1">
//             <label className="text-zinc-400 text-[10px] uppercase tracking-widest ml-1">Admin Email</label>
//             <input 
//               type="email" 
//               required 
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="admin@saloon.com" 
//               className="w-full bg-black/60 border border-zinc-800 text-white px-4 py-4 text-sm focus:outline-none focus:border-[#d4af37] transition-all" 
//             />
//           </div>

//           <div className="space-y-1">
//             <label className="text-zinc-400 text-[10px] uppercase tracking-widest ml-1">Password</label>
//             <input 
//               type="password" 
//               required 
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••••••••" 
//               className="w-full bg-black/60 border border-zinc-800 text-white px-4 py-4 text-sm focus:outline-none focus:border-[#d4af37] transition-all" 
//             />
//           </div>

//           <Button 
//             disabled={loading} 
//             type="submit" 
//             className="w-full bg-[#d4af37] hover:bg-[#c5a032] text-zinc-950 rounded-none py-8 mt-4 text-xs font-black tracking-[0.3em]"
//           >
//             {loading ? <Loader2 className="animate-spin" /> : "AUTHENTICATE ADMIN"}
//           </Button>
//         </form>

//         <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center">
//           <Link href="/" className="text-zinc-500 hover:text-[#d4af37] text-xs uppercase tracking-widest transition-colors">
//             ← Return to Public Website
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// }





"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ShieldAlert, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminAuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        throw new Error("Invalid admin credentials");
      }

      if (!result?.ok) {
        throw new Error("Authentication failed.");
      }

      // Successful login: hard redirect straight to the dashboard
      window.location.href = "/admin/dashboard";
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-6 py-12">
      <Link href="/" className="mb-8 flex flex-col items-center gap-2 group">
        <div className="p-3 bg-[#d4af37]/15 border border-[#d4af37]/30 rounded-full">
          <Lock className="text-[#d4af37] w-6 h-6" />
        </div>
        <h1 className="font-serif text-[#d4af37] text-3xl tracking-tighter">SAILOR'S ADMIN</h1>
        <span className="text-[10px] tracking-[0.4em] uppercase text-zinc-500 font-bold">
          Restricted Control Center
        </span>
      </Link>

      <div className="w-full max-w-md bg-zinc-900/40 border border-[#d4af37]/20 p-8 backdrop-blur-2xl shadow-2xl">
        <div className="mb-8 text-center">
          <h2 className="text-lg font-serif text-white">Administrator Sign In</h2>
          <p className="text-zinc-500 text-xs mt-1">Please enter your master credentials to proceed.</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 p-3 mb-6 text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="text-zinc-400 text-[10px] uppercase tracking-widest ml-1">Admin Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@saloon.com" 
              className="w-full bg-black/60 border border-zinc-800 text-white px-4 py-4 text-sm focus:outline-none focus:border-[#d4af37] transition-all" 
            />
          </div>

          <div className="space-y-1">
            <label className="text-zinc-400 text-[10px] uppercase tracking-widest ml-1">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••" 
              className="w-full bg-black/60 border border-zinc-800 text-white px-4 py-4 text-sm focus:outline-none focus:border-[#d4af37] transition-all" 
            />
          </div>

          <Button 
            disabled={loading} 
            type="submit" 
            className="w-full bg-[#d4af37] hover:bg-[#c5a032] text-zinc-950 rounded-none py-8 mt-4 text-xs font-black tracking-[0.3em]"
          >
            {loading ? <Loader2 className="animate-spin" /> : "AUTHENTICATE ADMIN"}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center">
          <Link href="/" className="text-zinc-500 hover:text-[#d4af37] text-xs uppercase tracking-widest transition-colors">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </main>
  );
}