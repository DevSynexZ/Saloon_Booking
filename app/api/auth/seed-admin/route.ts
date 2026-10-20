import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await dbConnect();

    const adminEmail = process.env.ADMIN_EMAIL || "admin@saloon.com";
    const adminPassword = "AdminSecurePassword123!"; // You can change this password

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      return NextResponse.json({ message: "Admin user already exists in DB!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create the admin user in MongoDB
    await User.create({
      name: "Salon Admin",
      email: adminEmail,
      password: hashedPassword,
    });

    return NextResponse.json({ 
      success: true, 
      message: `Admin user created successfully! Email: ${adminEmail}, Password: ${adminPassword}` 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}