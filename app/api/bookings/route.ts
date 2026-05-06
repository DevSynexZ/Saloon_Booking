import { NextResponse } from 'next/server';
import dbConnect  from '@/lib/db';
import { Appointment } from '@/lib/models/Appointment';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();

    const existing = await Appointment.findOne({ date: new Date(data.date), slot: data.slot });
    if (existing) return NextResponse.json({ error: "Slot taken" }, { status: 409 });

    const booking = await Appointment.create(data);
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Booking failed" }, { status: 500 });
  }
}