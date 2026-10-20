// // import { NextResponse } from "next/server";
// // import dbConnect from "@/lib/db";
// // import { Appointment } from "@/lib/models/Appointment";
// // import { getServerSession } from "next-auth";
// // import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// // export async function GET(req: Request) {
// //   try {
// //     await dbConnect();
    
// //     // Verify Admin Session
// //     const session = await getServerSession(authOptions);
// //     if (!session || session.user.role !== "admin") {
// //       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //     }

// //     const { searchParams } = new URL(req.url);
// //     const dateStr = searchParams.get("date"); // e.g. "2026-06-07"

// //     let query: any = { status: "confirmed" }; // Only show confirmed paid bookings

// //     if (dateStr) {
// //       const startOfDay = new Date(dateStr);
// //       startOfDay.setHours(0, 0, 0, 0);
// //       const endOfDay = new Date(dateStr);
// //       endOfDay.setHours(23, 59, 59, 999);
      
// //       query.date = { $gte: startOfDay, $lte: endOfDay };
// //     }

// //     const appointments = await Appointment.find(query).sort({ date: 1, slot: 1 }).lean();

// //     return NextResponse.json({ success: true, appointments }, { status: 200 });
// //   } catch (error: any) {
// //     console.error("Admin Fetch Error:", error);
// //     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
// //   }
// // }




// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/db";
// import { Appointment } from "@/lib/models/Appointment";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export async function GET(req: Request) {
//   try {
//     await dbConnect();
    
//     // Verify Admin Session
//     const session = await getServerSession(authOptions);
//     if (!session || session.user.role !== "admin") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { searchParams } = new URL(req.url);
//     const dateStr = searchParams.get("date"); // e.g. "2026-10-22"

//     let query: any = { status: "confirmed" }; // Only show confirmed paid bookings

//     if (dateStr) {
//       // Match string dates directly (e.g. "2026-10-22") to avoid Date object mismatch
//       query.date = dateStr;
//     }

//     const appointments = await Appointment.find(query).sort({ slot: 1 }).lean();

//     return NextResponse.json({ success: true, appointments }, { status: 200 });
//   } catch (error: any) {
//     console.error("Admin Fetch Error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Appointment } from "@/lib/models/Appointment";
import User from "@/lib/models/User"; // Ensure User model is registered for populate
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    await dbConnect();
    
    // Verify Admin Session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const dateStr = searchParams.get("date"); // e.g. "2026-10-22"

    let query: any = { status: "confirmed" }; // Only show confirmed paid bookings

    if (dateStr) {
      // Correct date range query for Mongoose Date fields
      const startOfDay = new Date(dateStr);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(dateStr);
      endOfDay.setHours(23, 59, 59, 999);
      
      query.date = { $gte: startOfDay, $lte: endOfDay };
    }

    // Populate userId to fetch name, email, and phone
    const appointments = await Appointment.find(query)
      .populate("userId", "name email phone")
      .sort({ slot: 1 })
      .lean();

    return NextResponse.json({ success: true, appointments }, { status: 200 });
  } catch (error: any) {
    console.error("Admin Fetch Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}