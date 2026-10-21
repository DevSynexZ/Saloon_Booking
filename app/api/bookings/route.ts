// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/db";
// import {Appointment} from "@/lib/models/Appointment";
// import { getServerSession } from "next-auth";
// // Import your auth options if needed for getServerSession
// // import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

// export async function POST(req: Request) {
//   try {
//     await dbConnect();
    
//     // 1. Get User Session
//     const session = await getServerSession();
//     if (!session || !session.user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json();
//     const { services, date, slot, amount, deposit } = body;

//     // 2. Check for existing confirmed booking for that slot
//     const existing = await Appointment.findOne({ 
//       date: new Date(date), 
//       slot: slot,
//       status: "confirmed" // We only block if someone else already paid
//     });

//     if (existing) {
//       return NextResponse.json({ error: "This slot is already booked" }, { status: 409 });
//     }

//     // 3. Create the Pending Appointment
//     // We store the user's email and details but keep it 'pending'
//     const newAppointment = await Appointment.create({
//       user: session.user.email, // Or session.user.id depending on your schema
//       services,
//       date: new Date(date),
//       slot,
//       totalPrice: amount,
//       deposit,
//       status: "pending", 
//     });

//     // 4. Return the ID so the frontend can pass it to the bKash payment gateway
//     return NextResponse.json({ 
//       success: true,
//       appointmentId: newAppointment._id 
//     }, { status: 201 });

//   } catch (error: any) {
//     console.error("Booking Error:", error);
//     return NextResponse.json({ error: "Booking failed", details: error.message }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/db";
// import { Appointment } from "@/lib/models/Appointment";
// import { getServerSession } from "next-auth";

// export async function POST(req: Request) {
//   try {
//     await dbConnect();
    
//     const session = await getServerSession();
//     const body = await req.json();
//     const { services, date, slot, amount, deposit, guestInfo } = body;

//     // Validate that either a session or valid guest information exists
//     if (!session?.user && (!guestInfo?.name || !guestInfo?.phone)) {
//       return NextResponse.json(
//         { error: "Guest details (Name and Phone) are required for non-logged-in users." },
//         { status: 400 }
//       );
//     }

//     // Check for existing confirmed booking for that slot
//     const existing = await Appointment.findOne({ 
//       date: new Date(date), 
//       slot: slot,
//       status: "confirmed"
//     });

//     if (existing) {
//       return NextResponse.json({ error: "This slot is already booked" }, { status: 409 });
//     }

//     // Determine user identifier & contact details
//     const userIdentifier = session?.user?.email || guestInfo?.phone;
//     const clientName = session?.user?.name || guestInfo?.name;

//     // Create the Pending Appointment
//     const newAppointment = await Appointment.create({
//       user: userIdentifier,
//       clientName: clientName,
//       clientPhone: guestInfo?.phone || "",
//       services,
//       date: new Date(date),
//       slot,
//       totalPrice: amount,
//       deposit,
//       status: "pending", 
//     });

//     return NextResponse.json({ 
//       success: true,
//       appointmentId: newAppointment._id 
//     }, { status: 201 });

//   } catch (error: any) {
//     console.error("Booking Error:", error);
//     return NextResponse.json({ error: "Booking failed", details: error.message }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Appointment } from "@/lib/models/Appointment";
import User from "@/lib/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { services, date, slot, amount, deposit, guestInfo, payment } = body;

    // Validate that either a session or valid guest info exists
    if (!session?.user && (!guestInfo?.name || !guestInfo?.phone)) {
      return NextResponse.json(
        { error: "Guest details (Name and Phone) are required for non-logged-in users." },
        { status: 400 }
      );
    }

    // Check for existing confirmed booking for that slot using lean for speed
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const existing = await Appointment.findOne({ 
      date: { $gte: startOfDay,$lte: endOfDay }, 
      slot: slot,
      status: "confirmed"
    }).lean();

    if (existing) {
      return NextResponse.json({ error: "This slot is already booked" }, { status: 409 });
    }

    // Resolve user ID if logged in, or find/create a guest user if needed
    let userId;
    if (session?.user?.email) {
      const user = await User.findOne({ email: session.user.email }).lean();
      if (user) userId = user._id;
    }
    else if(guestInfo?.phone) {
      // Clean phone number to use as part of a unique placeholder email
      const cleanPhone = guestInfo.phone.replace(/[^0-9]/g, "");
      const guestEmail = `guest_${cleanPhone}@sailors.local`;

      // Find if this guest already booked before, otherwise create a temporary user profile
      let guestUser = await User.findOne({ phone: guestInfo.phone });
      
      if (!guestUser) {
        guestUser = await User.create({
          name: guestInfo.name,
          phone: guestInfo.phone,
          email: guestEmail,
          password: Math.random().toString(36).slice(-8), // Dummy secure password
        });
      }
      userId = guestUser._id;
    }

    // If no logged in user, handle guest or throw error depending on your user model requirement
    if (!userId) {
      return NextResponse.json({ error: "User authentication required for booking." }, { status: 401 });
    }

    // Create the Pending Appointment matching the Appointment schema
    const newAppointment = await Appointment.create({
      userId,
      serviceName: Array.isArray(services) ? services.join(", ") : services || "Haircut & Styling",
      date: new Date(date),
      slot,
      status: "pending",
      payment: {
        method: payment?.method || "bKash",
        transactionId: payment?.transactionId || `TXN-${Date.now()}`,
        isVerified: false
      }
    });

    return NextResponse.json({ 
      success: true,
      appointmentId: newAppointment._id 
    }, { status: 201 });

  } catch (error: any) {
    console.error("Booking Error:", error);
    return NextResponse.json({ error: "Booking failed", details: error.message }, { status: 500 });
  }
}