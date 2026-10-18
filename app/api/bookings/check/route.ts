// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import {Appointment} from "@/lib/models/Appointment";

// export async function GET(request: Request) {
//   try {
//     await connectDB(); //
    
//     const { searchParams } = new URL(request.url);
//     const date = searchParams.get("date");

//     if (!date) {
//       return NextResponse.json({ error: "Date is required" }, { status: 400 });
//     }

//     // Logic to find booked slots for this date
//     const bookedAppointments = await Appointment.find({ 
//       date: new Date(date),
//       status: { $ne: "cancelled" } 
//     });

//     const bookedSlots = bookedAppointments.map(app => app.time);

//     return NextResponse.json({ bookedSlots }); // This returns the JSON your frontend expects
//   } catch (error) {
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Appointment } from "@/lib/models/Appointment";

export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get("date");

    if (!dateStr) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    // Normalize date to cover the full day range cleanly
    const startOfDay = new Date(dateStr);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(dateStr);
    endOfDay.setHours(23, 59, 59, 999);

    // Use .lean() for fast read performance
    const bookedAppointments = await Appointment.find({ 
      date: { $gte: startOfDay,$lte: endOfDay },
      status: { $ne: "cancelled" } 
    }).lean();

    // Map `slot` correctly instead of `time`
    const bookedSlots = bookedAppointments.map((app: any) => app.slot);

    return NextResponse.json({ bookedSlots });
  } catch (error) {
    console.error("Booking Check Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}