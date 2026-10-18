"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Scissors, User, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScissorsTransition } from "@/components/ScissorsTransition";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { triggerTransition } = useScissorsTransition();

  const isHomePage = pathname === "/";
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigation = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("/")) {
      triggerTransition(href);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-[100] bg-zinc-950/80 backdrop-blur-md border-b border-[#d4af37]/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center gap-2 group cursor-pointer">
            {/* Scissors Icon */}
            <Scissors className="text-[#d4af37] w-6 h-6 shrink-0 transition-transform duration-300 group-hover:rotate-45" />

            {/* Brand Name Text */}
            <span className="text-xl sm:text-2xl md:text-2xl font-serif text-[#d4af37] leading-none drop-shadow-2xl transition-all duration-500 ease-out origin-left group-hover:tracking-[0.25em] group-hover:scale-105 group-hover:drop-shadow-[0_10px_20px_rgba(212,175,55,0.4)] inline-block">
              SAILOR'S
            </span>
          </div>
        </Link>



        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavigation("/")}
            className="text-zinc-400 hover:text-[#d4af37] text-sm uppercase tracking-widest transition-colors cursor-pointer"
          >
            Home
          </button>

          <a
            href="#services"
            className="text-zinc-400 hover:text-[#d4af37] text-sm uppercase tracking-widest transition-colors"
          >
            Services
          </a>

          <button
            onClick={() => handleNavigation("/book")}
            className="text-zinc-400 hover:text-[#d4af37] text-sm uppercase tracking-widest transition-colors cursor-pointer"
          >
            {status === "authenticated" && !isHomePage ? "Book Session" : "Book Now"}
          </button>

          {/* Conditional Dashboard Link for Inner Pages */}
          {status === "authenticated" && !isHomePage && (
            <button
              onClick={() => handleNavigation("/dashboard")}
              className="text-zinc-400 hover:text-[#d4af37] text-sm uppercase tracking-widest transition-colors flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-4 h-4 text-[#d4af37]" />
              Dashboard
            </button>
          )}

          {/* Right Action Area */}
          <div className="flex items-center gap-4 ml-4 border-l border-zinc-800 pl-8">
            {status === "authenticated" ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-zinc-900 border border-[#d4af37]/30 px-4 py-2 text-xs text-[#d4af37]">
                  <User className="w-3.5 h-3.5" />
                  <span className="font-bold uppercase tracking-wider">{session.user?.name || "Member"}</span>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  title="Sign Out"
                  className="text-zinc-400 hover:text-red-400 p-2 transition-colors flex items-center gap-1 text-xs uppercase tracking-widest"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Button
                onClick={() => handleNavigation("/auth")}
                className="bg-[#d4af37] hover:bg-[#b8962d] text-zinc-950 rounded-none px-6 tracking-widest text-xs font-bold"
              >
                Join Us
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[#d4af37]" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 top-20 bg-zinc-950 z-50 md:hidden transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col p-8 gap-6">
          <button
            onClick={() => handleNavigation("/")}
            className="text-2xl font-serif text-[#d4af37] border-b border-zinc-900 pb-4 text-left"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation("/book")}
            className="text-2xl font-serif text-[#d4af37] border-b border-zinc-900 pb-4 text-left"
          >
            Book Now
          </button>

          {status === "authenticated" && !isHomePage && (
            <button
              onClick={() => handleNavigation("/dashboard")}
              className="text-2xl font-serif text-[#d4af37] border-b border-zinc-900 pb-4 text-left"
            >
              Dashboard
            </button>
          )}

          <div className="flex flex-col gap-4 mt-4">
            {status === "authenticated" ? (
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                variant="outline"
                className="w-full border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white rounded-none py-6 tracking-widest font-bold"
              >
                Sign Out ({session.user?.name})
              </Button>
            ) : (
              <Button
                onClick={() => handleNavigation("/auth")}
                className="w-full bg-[#d4af37] text-zinc-950 rounded-none py-6 tracking-widest font-bold"
              >
                Join Us
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}