// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/db";
// import {Appointment} from "@/lib/models/Appointment";
// import nodemailer from "nodemailer";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const paymentID = searchParams.get("paymentID");
//   const status = searchParams.get("status");

//   if (status === "success") {
//     await dbConnect();

//     // 1. Update Booking to Confirmed
//     const booking = await Appointment.findOneAndUpdate(
//       { bkashPaymentID: paymentID },
//       { status: "confirmed" },
//       { new: true }
//     ).populate("userEmail"); // Assuming you store the email or ref the user

//     // 2. Automated Email
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
//     });

//     await transporter.sendMail({
//       from: '"Sailor\'s Haircut" <no-reply@sailors.com>',
//       to: booking.userEmail, 
//       subject: "Booking Confirmed! ✂️",
//       text: `Your appointment is confirmed for ${booking.date} at ${booking.slot}.`
//     });

//     return NextResponse.redirect(new URL("/book/success", req.url));
//   }
  
//   return NextResponse.redirect(new URL("/book/failed", req.url));
// }





// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/db";
// import { Appointment } from "@/lib/models/Appointment";
// import nodemailer from "nodemailer";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const paymentID = searchParams.get("paymentID");
//   const status = searchParams.get("status");
//   const trxID = searchParams.get("trxID") || `TRX-${Date.now().toString().slice(-6)}`;

//   if (status === "success" && paymentID) {
//     try {
//       await dbConnect();

//       // 1. Update Booking Status & Store Payment Info
//       const booking = await Appointment.findOneAndUpdate(
//         { bkashPaymentID: paymentID },
//         { 
//           status: "confirmed",
//           "payment.method": "bKash",
//           "payment.transactionId": trxID,
//           "payment.status": "completed"
//         },
//         { new: true }
//       );

//       if (!booking) {
//         console.error("Booking not found for paymentID:", paymentID);
//         return NextResponse.redirect(new URL("/book/failed?error=not_found", req.url));
//       }

//       // 2. Automated Email Notification (Fail-safe)
//       if (process.env.EMAIL_USER && process.env.EMAIL_PASS && booking.user) {
//         try {
//           const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
//           });

//           await transporter.sendMail({
//             from: '"Sailor\'s Haircut" <no-reply@sailors.com>',
//             to: booking.user, 
//             subject: "Booking Confirmed! ✂️",
//             text: `Your appointment is confirmed for ${booking.date} at ${booking.slot}. Transaction ID: ${trxID}`
//           });
//         } catch (emailErr) {
//           console.error("Email notification error (non-fatal):", emailErr);
//         }
//       }

//       return NextResponse.redirect(new URL("/admin/dashboard", req.url));
//     } catch (err) {
//       console.error("Callback process error:", err);
//       return NextResponse.redirect(new URL("/book/failed", req.url));
//     }
//   }

//   return NextResponse.redirect(new URL("/book/failed", req.url));
// }







import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Appointment } from "@/lib/models/Appointment";
import nodemailer from "nodemailer";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const paymentID = searchParams.get("paymentID");
  const status = searchParams.get("status");
  const trxID = searchParams.get("trxID") || `TRX${Math.floor(100000 + Math.random() * 900000)}`;

  if (status === "success" && paymentID) {
    try {
      await dbConnect();

      const booking = await Appointment.findOneAndUpdate(
        { bkashPaymentID: paymentID },
        { 
          status: "confirmed",
          "payment.method": "bKash",
          "payment.transactionId": trxID,
          "payment.status": "completed"
        },
        { new: true }
      );

      if (!booking) {
        return NextResponse.redirect(new URL("/book/failed?error=not_found", req.url));
      }

      return NextResponse.redirect(new URL(`/book/success?appointmentId=${booking._id}`, req.url));
    } catch (err) {
      console.error("Callback error:", err);
      return NextResponse.redirect(new URL("/book/failed", req.url));
    }
  }

  return NextResponse.redirect(new URL("/book/failed", req.url));
}