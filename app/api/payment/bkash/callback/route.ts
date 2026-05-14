import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import {Appointment} from "@/lib/models/Appointment";
import nodemailer from "nodemailer";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const paymentID = searchParams.get("paymentID");
  const status = searchParams.get("status");

  if (status === "success") {
    await dbConnect();

    // 1. Update Booking to Confirmed
    const booking = await Appointment.findOneAndUpdate(
      { bkashPaymentID: paymentID },
      { status: "confirmed" },
      { new: true }
    ).populate("userEmail"); // Assuming you store the email or ref the user

    // 2. Automated Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    await transporter.sendMail({
      from: '"Sailor\'s Haircut" <no-reply@sailors.com>',
      to: booking.userEmail, 
      subject: "Booking Confirmed! ✂️",
      text: `Your appointment is confirmed for ${booking.date} at ${booking.slot}.`
    });

    return NextResponse.redirect(new URL("/book/success", req.url));
  }
  
  return NextResponse.redirect(new URL("/book/failed", req.url));
}