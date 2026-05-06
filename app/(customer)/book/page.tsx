import dbConnect from '@/lib/db';
import BookingClient from './BookingClient';

export default async function BookingPage() {
  await dbConnect();
  
  return (
    <main className="min-h-screen bg-[#fdfaf5] py-6 md:py-12">
      {/* Responsive width: 95% on small screens, 80% on large screens */}
      <div className="w-[95%] lg:w-[80%] mx-auto bg-white p-4 md:p-8 border-t-4 border-[#2d3a35] shadow-sm">
        <h1 className="text-2xl md:text-3xl font-serif text-center mb-8 uppercase tracking-widest text-zinc-800">
          Secure Your Appointment
        </h1>
        <BookingClient />
      </div>
    </main>
  );
}