import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const clerkId = searchParams.get("clerkId");

    if (!clerkId) {
      return NextResponse.json({ error: "Clerk ID is required" }, { status: 400 });
    }

    // Find the user first using Clerk ID
    const user = await prisma.user.findUnique({
      where: { clerkId }, // Assuming clerkId is unique in User table
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Now find the patient using the user's ID
    const patient = await prisma.patient.findUnique({
      where: { userId: user.id }, // Use userId, which is unique in the Patient model
      include: {
        appointments: true,
        reports: true,
        medicines: true,
        labTests: true,
        chats: true,
      },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
