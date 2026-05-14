import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
export default function Home() {
  return (
    
    <main className="min-h-screen bg-zinc-50 text-zinc-950 selection:bg-[#d4af37] selection:text-white">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-zinc-950 text-white">
        {/* Background Image Container */}
              <Navbar />

        <div className="absolute inset-0 z-0">
          <Image
            src="/bg.png"
            alt="Sailor's Haircut Studio"
            fill
            className="object-cover object-center opacity-40 transition-transform duration-1000 scale-105 hover:scale-100"
            priority
            sizes="100vw"
          />
          {/* Multi-layer Overlay for Depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 via-transparent to-zinc-950" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <span className="block text-[#d4af37] text-xs md:text-sm tracking-[0.4em] uppercase mb-4 animate-fade-in">
            Est. 2026 • The Art of Grooming
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-serif text-[#d4af37] mb-8 drop-shadow-2xl">
            SAILOR'S
          </h1>
          <p className="text-xs md:text-sm tracking-[0.3em] md:tracking-[0.5em] text-zinc-400 uppercase mb-12 max-w-2xl mx-auto leading-loose">
            Premium Grooming Studio <span className="mx-2 text-[#d4af37]">•</span> Bashundhara R/A
          </p>
          <Link href="/book">
            <Button 
              size="lg" 
              className="bg-[#d4af37] hover:bg-[#b8962d] text-zinc-950 rounded-none px-10 py-8 text-base md:text-lg font-bold tracking-widest transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            >
              BOOK YOUR SESSION
            </Button>
          </Link>
        </div>
      </section>

      {/* Ashy-Green Status Bar with Glassmorphism */}
      <div className="sticky top-0 z-50 bg-[#2d3a35]/95 backdrop-blur-md text-[#f5efe0] py-5 border-y border-[#d4af37]/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 group">
            <span className="text-[#d4af37] font-serif italic text-lg md:text-xl">Hotline:</span>
            <a href="tel:+8801966775511" className="font-medium tracking-[0.2em] hover:text-[#d4af37] transition-colors">
              +88019 00 77 99 XX
            </a>
          </div>
          <div className="hidden md:block h-6 w-[1px] bg-[#d4af37]/30" />
          <div className="flex items-center gap-4">
            <span className="text-[#d4af37] font-serif italic text-lg md:text-xl">Open:</span>
            <span className="font-medium tracking-[0.2em]">10:00 AM — 12:00 PM</span>
          </div>
        </div>
      </div>

      {/* Service Preview Section */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-serif mb-6 text-zinc-900">Crafted for Excellence</h2>
          <div className="h-[2px] w-20 bg-[#d4af37] mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {[
            { title: "Hair Styling", price: "500", desc: "Precision fades, classic cuts, and beard sculpting tailored to your face shape." },
            { title: "Facial Therapy", price: "1200", desc: "Deep cleansing and premium masks designed specifically for men's skin health." },
            { title: "Body Care", price: "1500", desc: "Relaxing massages and body waxing services in a private, high-end environment." }
          ].map((service, idx) => (
            <div key={idx} className="group relative border-l border-zinc-200 pl-10 hover:border-[#d4af37] transition-all duration-500">
              <span className="absolute -left-[1px] top-0 h-0 w-[2px] bg-[#d4af37] group-hover:h-full transition-all duration-700" />
              <h3 className="text-2xl md:text-3xl font-serif mb-4 group-hover:translate-x-2 transition-transform duration-300">
                {service.title}
              </h3>
              <p className="text-zinc-500 mb-8 text-sm md:text-base leading-relaxed font-light">
                {service.desc}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-zinc-400 text-xs uppercase tracking-tighter">Starting from</span>
                <span className="text-[#d4af37] font-bold text-xl">{service.price} BDT</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 py-20 px-6 border-t border-[#d4af37]/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-10 opacity-50">
             <h2 className="font-serif text-[#d4af37] text-2xl">Sailor's</h2>
          </div>
          <p className="text-zinc-500 text-[10px] md:text-xs tracking-[0.5em] uppercase mb-6">
            Signature Salon <span className="text-[#d4af37]/50 px-2">|</span> Bashundhara Branch
          </p>
          <p className="text-zinc-400 text-sm md:text-base max-w-md mx-auto font-light leading-loose">
            House 142, Road 05, Block-B, Safwan Road,<br />
            Bashundhara R/A, Dhaka-1229.
          </p>
          <div className="mt-12 pt-12 border-t border-white/5">
            <p className="text-zinc-600 text-[10px]">© 2026 Sailor's Haircut. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}