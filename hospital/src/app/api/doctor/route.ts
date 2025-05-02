// /app/api/doctors/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // adjust path if needed

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        availability: {
          where: {
            isBooked: false,
          },
          orderBy: {
            date: "asc",
          },
        },
      },
    });

    return NextResponse.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      { error: "Failed to fetch doctors" },
      { status: 500 }
    );
  }
}
