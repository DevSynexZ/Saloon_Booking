import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Appointment } from "@/lib/models/Appointment";

export async function POST(req: Request) {
  try {
    const { amount, appointmentId } = await req.json();

    // 1. Get Grant Token from bKash
    const tokenResponse = await fetch(`${process.env.BKASH_BASE_URL}/checkout/token/grant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "username": process.env.BKASH_USERNAME!,
        "password": process.env.BKASH_PASSWORD!
      },
      body: JSON.stringify({
        app_key: process.env.BKASH_APP_KEY,
        app_secret: process.env.BKASH_APP_SECRET
      })
    });
    
    const tokenData = await tokenResponse.json();
    const id_token = tokenData.id_token;

    if (!id_token) {
        throw new Error("Failed to authenticate with bKash");
    }

    // 2. Create Payment Request
    const paymentResponse = await fetch(`${process.env.BKASH_BASE_URL}/checkout/payment/create`, {
      method: "POST",
      headers: {
        "Authorization": id_token,
        "X-App-Key": process.env.BKASH_APP_KEY!,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mode: "0011",
        payerReference: "Sailors-Haircut",
        callbackURL: `${process.env.NEXTAUTH_URL}/api/payment/bkash/callback`,
        amount: amount,
        currency: "BDT",
        intent: "sale",
        merchantInvoiceNumber: appointmentId
      })
    });

    const data = await paymentResponse.json();

    // 3. Validation and DB Update
    if (!data.paymentID) {
      console.error("bKash did not return paymentID:", data);
      throw new Error(data.errorMessage || "Payment Creation Failed");
    }

    await dbConnect();
    
    // Update the existing pending appointment with the bKash paymentID
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId, 
      { bkashPaymentID: data.paymentID },
      { new: true }
    );

    if (!updatedAppointment) {
      throw new Error("Appointment not found in database");
    }

    // 4. Return the gateway URL to the frontend
    return NextResponse.json({ bkashURL: data.bkashURL });

  } catch (error: any) {
    console.error("bKash Error Detail:", error.message);
    return NextResponse.json(
      { error: error.message || "Payment initiation failed" }, 
      { status: 500 }
    );
  }
}