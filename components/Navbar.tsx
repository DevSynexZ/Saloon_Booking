"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle for mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "#services" }, // Or specific route
    { name: "Book Now", href: "/book" },
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] bg-zinc-950/80 backdrop-blur-md border-b border-[#d4af37]/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Scissors className="text-[#d4af37] w-6 h-6 transition-transform group-hover:rotate-45" />
          <span className="font-serif text-[#d4af37] text-xl tracking-tighter">SAILOR'S</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-zinc-400 hover:text-[#d4af37] text-sm uppercase tracking-widest transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-4 ml-4 border-l border-zinc-800 pl-8">
           
            <Link href="/auth">
              <Button className="bg-[#d4af37] hover:bg-[#b8962d] text-zinc-950 rounded-none px-6 tracking-widest text-xs font-bold">
                Join Us
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[#d4af37]" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 top-20 bg-zinc-950 z-50 md:hidden transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col p-8 gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-serif text-[#d4af37] border-b border-zinc-900 pb-4"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-4 mt-4">
            
            <Link href="/auth" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-[#d4af37] text-zinc-950 rounded-none py-6 tracking-widest font-bold">
                Join Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}