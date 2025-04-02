import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: { user: true }, // Assuming doctors have a related `user` with a name
    });

    return NextResponse.json(doctors, { status: 200 });
  } catch (error) {
      return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 });
      console.log(error)
  }
}
