"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SignupPage() {
  const [isLogin, setIsLogin] = useState(false); // Defaults to Signup
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/book";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const { email, password, name } = Object.fromEntries(formData);

    if (isLogin) {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) toast.error("Invalid credentials");
      else router.push(callbackUrl);
    } else {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast.success("Account created! Logging you in...");
        await signIn("credentials", { email, password, callbackUrl });
      } else {
        toast.error("Signup failed. User may already exist.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#2d3a35]/30 backdrop-blur-xl border border-[#d4af37]/20 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-[#d4af37] font-serif text-3xl mb-2">
            {isLogin ? "Login" : "Sign Up"} to Sailor's
          </h2>
          <p className="text-zinc-400 text-xs tracking-widest uppercase">
            Required to book your session
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <input name="name" type="text" placeholder="FULL NAME" required
              className="w-full bg-transparent border-b border-zinc-700 p-3 text-white focus:border-[#d4af37] outline-none" />
          )}
          <input name="email" type="email" placeholder="EMAIL ADDRESS" required
            className="w-full bg-transparent border-b border-zinc-700 p-3 text-white focus:border-[#d4af37] outline-none" />
          <input name="password" type="password" placeholder="PASSWORD" required
            className="w-full bg-transparent border-b border-zinc-700 p-3 text-white focus:border-[#d4af37] outline-none" />
          
          <Button type="submit" disabled={loading}
            className="w-full bg-[#d4af37] hover:bg-[#b8962d] text-zinc-950 rounded-none py-6 font-bold tracking-widest">
            {loading ? "PROCESSING..." : isLogin ? "LOGIN" : "CREATE ACCOUNT"}
          </Button>
        </form>

        <button onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-6 text-zinc-500 text-xs hover:text-[#d4af37] transition-colors tracking-widest uppercase">
          {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}