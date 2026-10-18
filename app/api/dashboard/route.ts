// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import dbConnect from "@/lib/db";
// import { Appointment } from "@/lib/models/Appointment";
// import User from "@/lib/models/User";

// export async function GET(req: Request) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session || !session.user?.email) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     await dbConnect();

//     // Use .lean() to return plain JS objects instead of heavy Mongoose documents
//     const user = await User.findOne({ email: session.user.email }).lean();
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const todayStart = new Date();
//     todayStart.setHours(0, 0, 0, 0);

//     const now = new Date();

//     // Run upcoming and past session queries in parallel using Promise.all
//     const [upcomingSessions, pastSessions] = await Promise.all([
//       Appointment.find({
//         userId: user._id,
//         date: { $gte: todayStart },
//       })
//         .sort({ date: 1, slot: 1 })
//         .lean(),
//       Appointment.find({
//         userId: user._id,
//         date: { $lt: now },
//       })
//         .sort({ date: -1 })
//         .lean(),
//     ]);

//     // Latest barber notes from the most recent past appointment
//     const lastAppointment = pastSessions.length > 0 ? pastSessions[0] : null;

//     return NextResponse.json({
//       user: {
//         name: user.name,
//         email: user.email,
//       },
//       upcomingSessions,
//       pastSessions,
//       lastTreatment: lastAppointment ? {
//         serviceName: lastAppointment.serviceName,
//         date: lastAppointment.date,
//         barberNotes: lastAppointment.barberNotes || "Classic cut with razor fade and beard trim. Maintained medium length on top with matte finish pomade.",
//         haircutStyle: lastAppointment.haircutStyle || "Modern Pompadour",
//       } : null,
//     });
//   } catch (error: any) {
//     console.error("Dashboard API Error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }




// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import dbConnect from "@/lib/db";
// import { Appointment } from "@/lib/models/Appointment";
// import User from "@/lib/models/User";

// export async function GET(req: Request) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session || !session.user?.email) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     await dbConnect();

//     // Fetch user and select only necessary fields with .lean()
//     const user = await User.findOne({ email: session.user.email }).select("name email").lean();
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const todayStart = new Date();
//     todayStart.setHours(0, 0, 0, 0);

//     const now = new Date();

//     // Run upcoming and past session queries in parallel using Promise.all with .lean()
//     const [upcomingSessions, pastSessions] = await Promise.all([
//       Appointment.find({
//         userId: user._id,
//         date: { $gte: todayStart },
//       })
//         .sort({ date: 1, slot: 1 })
//         .lean(),
//       Appointment.find({
//         userId: user._id,
//         date: { $lt: now },
//       })
//         .sort({ date: -1 })
//         .lean(),
//     ]);

//     // Latest barber notes from the most recent past appointment
//     const lastAppointment = pastSessions.length > 0 ? pastSessions[0] : null;

//     return NextResponse.json({
//       user: {
//         name: user.name,
//         email: user.email,
//       },
//       upcomingSessions,
//       pastSessions,
//       lastTreatment: lastAppointment ? {
//         serviceName: lastAppointment.serviceName,
//         date: lastAppointment.date,
//         barberNotes: lastAppointment.barberNotes || "Classic cut with razor fade and beard trim. Maintained medium length on top with matte finish pomade.",
//         haircutStyle: lastAppointment.haircutStyle || "Modern Pompadour",
//       } : null,
//     });
//   } catch (error: any) {
//     console.error("Dashboard API Error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }





import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import { Appointment } from "@/lib/models/Appointment";
import User from "@/lib/models/User";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // Fetch user and select strictly necessary fields
    const user = await User.findOne({ email: session.user.email }).select("name email _id").lean();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const now = new Date();

    // Execute queries in parallel with lean projection
    const [upcomingSessions, pastSessions] = await Promise.all([
      Appointment.find({
        userId: user._id,
        date: { $gte: todayStart },
      })
        .select("serviceName date slot status")
        .sort({ date: 1, slot: 1 })
        .lean(),
      Appointment.find({
        userId: user._id,
        date: { $lt: now },
      })
        .select("serviceName date slot status barberNotes haircutStyle")
        .sort({ date: -1 })
        .lean(),
    ]);

    const lastAppointment = pastSessions.length > 0 ? pastSessions[0] : null;

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
      },
      upcomingSessions,
      pastSessions,
      lastTreatment: lastAppointment ? {
        serviceName: lastAppointment.serviceName,
        date: lastAppointment.date,
        barberNotes: lastAppointment.barberNotes || "Classic cut with razor fade and beard trim.",
        haircutStyle: lastAppointment.haircutStyle || "Modern Pompadour",
      } : null,
    });
  } catch (error: any) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}