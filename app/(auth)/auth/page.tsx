"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // Import NextAuth signIn
import Link from "next/link";
import { Scissors, ShieldCheck, UserPlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnifiedAuth() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    try {
      if (mode === "signup") {
        // 1. Call your Signup API
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Signup failed");
      }

      // 2. Authenticate (Login) via NextAuth
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        throw new Error("Invalid credentials");
      }

      router.push("/book");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-6 py-12">
      <Link href="/" className="mb-8 flex flex-col items-center gap-2 group">
        <Scissors className="text-[#d4af37] w-12 h-12 transition-transform group-hover:rotate-45" />
        <h1 className="font-serif text-[#d4af37] text-4xl tracking-tighter">SAILOR'S</h1>
      </Link>

      <div className="w-full max-w-md bg-zinc-900/40 border border-[#d4af37]/10 p-8 backdrop-blur-2xl">
        <div className="flex mb-10 bg-black/40 p-1 border border-zinc-800">
          <button onClick={() => setMode("login")} className={`flex-1 py-3 text-[10px] tracking-[0.2em] font-bold transition-all ${mode === "login" ? "bg-[#d4af37] text-zinc-950" : "text-zinc-500 hover:text-zinc-300"}`}>LOG IN</button>
          <button onClick={() => setMode("signup")} className={`flex-1 py-3 text-[10px] tracking-[0.2em] font-bold transition-all ${mode === "signup" ? "bg-[#d4af37] text-zinc-950" : "text-zinc-500 hover:text-zinc-300"}`}>SIGN UP</button>
        </div>

        {error && <p className="text-red-500 text-xs text-center mb-4 uppercase tracking-widest">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "signup" && (
            <div className="space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-zinc-500 text-[10px] uppercase tracking-widest ml-1">Full Name</label>
              <input name="name" type="text" required placeholder="Mahi Shahriar" className="w-full bg-black/50 border border-zinc-800 text-white px-4 py-4 focus:outline-none focus:border-[#d4af37] transition-all" />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-zinc-500 text-[10px] uppercase tracking-widest ml-1">Email Address</label>
            <input name="email" type="email" required placeholder="sailor@example.com" className="w-full bg-black/50 border border-zinc-800 text-white px-4 py-4 focus:outline-none focus:border-[#d4af37] transition-all" />
          </div>

          <div className="space-y-1">
            <label className="text-zinc-500 text-[10px] uppercase tracking-widest ml-1">Password</label>
            <input name="password" type="password" required placeholder="••••••••" className="w-full bg-black/50 border border-zinc-800 text-white px-4 py-4 focus:outline-none focus:border-[#d4af37] transition-all" />
          </div>

          <Button disabled={loading} type="submit" className="w-full bg-[#d4af37] hover:bg-[#c5a032] text-zinc-950 rounded-none py-8 mt-4 text-xs font-black tracking-[0.3em]">
            {loading ? <Loader2 className="animate-spin" /> : (mode === "login" ? "AUTHENTICATE" : "REGISTER ACCOUNT")}
          </Button>
        </form>
      </div>
    </main>
  );
}