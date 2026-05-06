import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import {Appointment} from "@/lib/models/Appointment";

export async function GET(request: Request) {
  try {
    await connectDB(); //
    
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 });
    }

    // Logic to find booked slots for this date
    const bookedAppointments = await Appointment.find({ 
      date: new Date(date),
      status: { $ne: "cancelled" } 
    });

    const bookedSlots = bookedAppointments.map(app => app.time);

    return NextResponse.json({ bookedSlots }); // This returns the JSON your frontend expects
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}