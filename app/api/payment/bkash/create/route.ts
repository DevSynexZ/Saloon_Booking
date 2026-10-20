// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/db";
// import { Appointment } from "@/lib/models/Appointment";

// export async function POST(req: Request) {
//   try {
//     const { amount, appointmentId } = await req.json();

//     // 1. Get Grant Token from bKash
//     const tokenResponse = await fetch(`${process.env.BKASH_BASE_URL}/checkout/token/grant`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "username": process.env.BKASH_USERNAME!,
//         "password": process.env.BKASH_PASSWORD!
//       },
//       body: JSON.stringify({
//         app_key: process.env.BKASH_APP_KEY,
//         app_secret: process.env.BKASH_APP_SECRET
//       })
//     });
    
//     const tokenData = await tokenResponse.json();
//     const id_token = tokenData.id_token;

//     if (!id_token) {
//         throw new Error("Failed to authenticate with bKash");
//     }

//     // 2. Create Payment Request
//     const paymentResponse = await fetch(`${process.env.BKASH_BASE_URL}/checkout/payment/create`, {
//       method: "POST",
//       headers: {
//         "Authorization": id_token,
//         "X-App-Key": process.env.BKASH_APP_KEY!,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         mode: "0011",
//         payerReference: "Sailors-Haircut",
//         callbackURL: `${process.env.NEXTAUTH_URL}/api/payment/bkash/callback`,
//         amount: amount,
//         currency: "BDT",
//         intent: "sale",
//         merchantInvoiceNumber: appointmentId
//       })
//     });

//     const data = await paymentResponse.json();

//     // 3. Validation and DB Update
//     if (!data.paymentID) {
//       console.error("bKash did not return paymentID:", data);
//       throw new Error(data.errorMessage || "Payment Creation Failed");
//     }

//     await dbConnect();
    
//     // Update the existing pending appointment with the bKash paymentID
//     const updatedAppointment = await Appointment.findByIdAndUpdate(
//       appointmentId, 
//       { bkashPaymentID: data.paymentID },
//       { new: true }
//     );

//     if (!updatedAppointment) {
//       throw new Error("Appointment not found in database");
//     }

//     // 4. Return the gateway URL to the frontend
//     return NextResponse.json({ bkashURL: data.bkashURL });

//   } catch (error: any) {
//     console.error("bKash Error Detail:", error.message);
//     return NextResponse.json(
//       { error: error.message || "Payment initiation failed" }, 
//       { status: 500 }
//     );
//   }
// }





// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/db";
// import { Appointment } from "@/lib/models/Appointment";

// export async function POST(req: Request) {
//   try {
//     const { amount, appointmentId } = await req.json();

//     await dbConnect();

//     // Generate a temporary mock payment ID for testing
//     const mockPaymentID = `MOCK-BKASH-${Date.now()}`;

//     // Update appointment record
//     const updatedAppointment = await Appointment.findByIdAndUpdate(
//       appointmentId, 
//       { bkashPaymentID: mockPaymentID },
//       { new: true }
//     );

//     if (!updatedAppointment) {
//       throw new Error("Appointment not found in database");
//     }

//     // IF bKash env keys are missing, simulate a successful gateway redirect in local dev
//     if (!process.env.BKASH_APP_KEY || process.env.NODE_ENV === "development") {
//       const mockSuccessCallback = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/payment/bkash/callback?paymentID=${mockPaymentID}&status=success&trxID=TRX${Math.floor(100000 + Math.random() * 900000)}`;
      
//       return NextResponse.json({ bkashURL: mockSuccessCallback });
//     }

//     // --- REAL BKASH API CALLS (Used when production/sandbox credentials are present) ---
//     const tokenResponse = await fetch(`${process.env.BKASH_BASE_URL}/checkout/token/grant`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "username": process.env.BKASH_USERNAME!,
//         "password": process.env.BKASH_PASSWORD!
//       },
//       body: JSON.stringify({
//         app_key: process.env.BKASH_APP_KEY,
//         app_secret: process.env.BKASH_APP_SECRET
//       })
//     });
    
//     const tokenData = await tokenResponse.json();
//     const id_token = tokenData?.id_token;

//     if (!id_token) {
//       throw new Error("Failed to authenticate with bKash API");
//     }

//     const paymentResponse = await fetch(`${process.env.BKASH_BASE_URL}/checkout/payment/create`, {
//       method: "POST",
//       headers: {
//         "Authorization": id_token,
//         "X-App-Key": process.env.BKASH_APP_KEY!,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         mode: "0011",
//         payerReference: "Sailors-Haircut",
//         callbackURL: `${process.env.NEXTAUTH_URL}/api/payment/bkash/callback`,
//         amount: amount,
//         currency: "BDT",
//         intent: "sale",
//         merchantInvoiceNumber: appointmentId
//       })
//     });

//     const data = await paymentResponse.json();

//     if (!data.paymentID) {
//       throw new Error(data.errorMessage || "Payment Creation Failed");
//     }

//     await Appointment.findByIdAndUpdate(appointmentId, { bkashPaymentID: data.paymentID });

//     return NextResponse.json({ bkashURL: data.bkashURL });

//   } catch (error: any) {
//     console.error("bKash Error Detail:", error.message);
//     return NextResponse.json(
//       { error: error.message || "Payment initiation failed" }, 
//       { status: 500 }
//     );
//   }
// }







// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/db";
// import { Appointment } from "@/lib/models/Appointment";

// export async function POST(req: Request) {
//   try {
//     const { amount, appointmentId } = await req.json();

//     await dbConnect();

//     const mockPaymentID = `MOCK-BKASH-${Date.now()}`;
//     const mockTrxID = `TRX-${Math.floor(100000 + Math.random() * 900000)}`;

//     // IF bKash env keys are missing or we are in development, instantly confirm the booking for local testing
//     if (!process.env.BKASH_APP_KEY || process.env.NODE_ENV === "development") {
//       const updated = await Appointment.findByIdAndUpdate(
//         appointmentId, 
//         { 
//           bkashPaymentID: mockPaymentID,
//           status: "confirmed",
//           "payment.method": "bKash",
//           "payment.transactionId": mockTrxID,
//           "payment.status": "completed"
//         },
//         { new: true }
//       );

//       if (!updated) {
//         throw new Error("Appointment not found in database");
//       }

//       // Redirect straight to admin dashboard or a success screen
//       const successRedirect = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/admin/dashboard`;
//       return NextResponse.json({ bkashURL: successRedirect });
//     }

//     // --- REAL BKASH API CALLS ---
//     const updatedAppointment = await Appointment.findByIdAndUpdate(
//       appointmentId, 
//       { bkashPaymentID: mockPaymentID },
//       { new: true }
//     );

//     if (!updatedAppointment) {
//       throw new Error("Appointment not found in database");
//     }

//     const tokenResponse = await fetch(`${process.env.BKASH_BASE_URL}/checkout/token/grant`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "username": process.env.BKASH_USERNAME!,
//         "password": process.env.BKASH_PASSWORD!
//       },
//       body: JSON.stringify({
//         app_key: process.env.BKASH_APP_KEY,
//         app_secret: process.env.BKASH_APP_SECRET
//       })
//     });
    
//     const tokenData = await tokenResponse.json();
//     const id_token = tokenData?.id_token;

//     if (!id_token) {
//       throw new Error("Failed to authenticate with bKash API");
//     }

//     const paymentResponse = await fetch(`${process.env.BKASH_BASE_URL}/checkout/payment/create`, {
//       method: "POST",
//       headers: {
//         "Authorization": id_token,
//         "X-App-Key": process.env.BKASH_APP_KEY!,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         mode: "0011",
//         payerReference: "Sailors-Haircut",
//         callbackURL: `${process.env.NEXTAUTH_URL}/api/payment/bkash/callback`,
//         amount: amount,
//         currency: "BDT",
//         intent: "sale",
//         merchantInvoiceNumber: appointmentId
//       })
//     });

//     const data = await paymentResponse.json();

//     if (!data.paymentID) {
//       throw new Error(data.errorMessage || "Payment Creation Failed");
//     }

//     await Appointment.findByIdAndUpdate(appointmentId, { bkashPaymentID: data.paymentID });

//     return NextResponse.json({ bkashURL: data.bkashURL });

//   } catch (error: any) {
//     console.error("bKash Error Detail:", error.message);
//     return NextResponse.json(
//       { error: error.message || "Payment initiation failed" }, 
//       { status: 500 }
//     );
//   }
// }







import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Appointment } from "@/lib/models/Appointment";

export async function POST(req: Request) {
  try {
    const { amount, appointmentId } = await req.json();

    await dbConnect();

    const mockPaymentID = `MOCK-BKASH-${Date.now()}`;
    const mockTrxID = `TRX${Math.floor(100000 + Math.random() * 900000)}`;

    // IF bKash env keys are missing or in development, instantly confirm booking for local testing
    if (!process.env.BKASH_APP_KEY || process.env.NODE_ENV === "development") {
      const updated = await Appointment.findByIdAndUpdate(
        appointmentId, 
        { 
          bkashPaymentID: mockPaymentID,
          status: "confirmed",
          "payment.method": "bKash",
          "payment.transactionId": mockTrxID,
          "payment.status": "completed"
        },
        { new: true }
      );

      if (!updated) {
        throw new Error("Appointment not found in database");
      }

      // Redirect customer to the booking success page with their appointment ID
      const successRedirect = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/book/success?appointmentId=${appointmentId}`;
      return NextResponse.json({ bkashURL: successRedirect });
    }

    // --- REAL BKASH API CALLS ---
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId, 
      { bkashPaymentID: mockPaymentID },
      { new: true }
    );

    if (!updatedAppointment) {
      throw new Error("Appointment not found in database");
    }

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
    const id_token = tokenData?.id_token;

    if (!id_token) {
      throw new Error("Failed to authenticate with bKash API");
    }

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

    if (!data.paymentID) {
      throw new Error(data.errorMessage || "Payment Creation Failed");
    }

    await Appointment.findByIdAndUpdate(appointmentId, { bkashPaymentID: data.paymentID });

    return NextResponse.json({ bkashURL: data.bkashURL });

  } catch (error: any) {
    console.error("bKash Error Detail:", error.message);
    return NextResponse.json(
      { error: error.message || "Payment initiation failed" }, 
      { status: 500 }
    );
  }
}