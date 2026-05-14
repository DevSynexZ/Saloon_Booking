// import { NextResponse } from 'next/server';
// import dbConnect  from '@/lib/db';
// import { Appointment } from '@/lib/models/Appointment';

// export async function POST(req: Request) {
//   try {
//     await dbConnect();
//     const data = await req.json();

//     const existing = await Appointment.findOne({ date: new Date(data.date), slot: data.slot });
//     if (existing) return NextResponse.json({ error: "Slot taken" }, { status: 409 });

//     const booking = await Appointment.create(data);
//     return NextResponse.json(booking, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: "Booking failed" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import {Appointment} from "@/lib/models/Appointment";
import { getServerSession } from "next-auth";
// Import your auth options if needed for getServerSession
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

export async function POST(req: Request) {
  try {
    await dbConnect();
    
    // 1. Get User Session
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { services, date, slot, amount, deposit } = body;

    // 2. Check for existing confirmed booking for that slot
    const existing = await Appointment.findOne({ 
      date: new Date(date), 
      slot: slot,
      status: "confirmed" // We only block if someone else already paid
    });

    if (existing) {
      return NextResponse.json({ error: "This slot is already booked" }, { status: 409 });
    }

    // 3. Create the Pending Appointment
    // We store the user's email and details but keep it 'pending'
    const newAppointment = await Appointment.create({
      user: session.user.email, // Or session.user.id depending on your schema
      services,
      date: new Date(date),
      slot,
      totalPrice: amount,
      deposit,
      status: "pending", 
    });

    // 4. Return the ID so the frontend can pass it to the bKash payment gateway
    return NextResponse.json({ 
      success: true,
      appointmentId: newAppointment._id 
    }, { status: 201 });

  } catch (error: any) {
    console.error("Booking Error:", error);
    return NextResponse.json({ error: "Booking failed", details: error.message }, { status: 500 });
  }
}