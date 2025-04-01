import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    
  try {
    const { userId } = currentUser();
    console.log(userId)
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const patient = await prisma.patient.findUnique({
      where: { clerkId: userId },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
