import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { users } from "@clerk/clerk-sdk-node";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json();

    console.log("Received Data:", { email, username, password });

    if (!email || !username || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const allClerkUsers = await users.getUserList();
    const emailExistsInClerk = allClerkUsers.some(user => user.emailAddresses.some(e => e.emailAddress === email));

    if (emailExistsInClerk) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }


    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered in Prisma" }, { status: 400 });
    }

    const uniqueUsername = `${username}_${Date.now()}`;
    const clerkUser = await users.createUser({
      username:uniqueUsername,
      emailAddress: [email],
      password,
    });

    console.log("Clerk User Created:", clerkUser);

    if (!clerkUser.id) {
      return NextResponse.json({ error: "Failed to register " }, { status: 400 });
    }

    // ✅ Save user in Prisma
    await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        name: username,
        email,
        password, // Consider hashing password before storing
        role: "PATIENT",
        patient: {
          create: {
            phone: "0000000000",
            address: "Unknown",
            city: "Unknown",
            state: "Unknown",
            zip: "000000",
            country: "Unknown",
            sex: "Unknown",
            dob: new Date(),
            bloodGroup: "Unknown",
            weight: 0,
            height: 0,
            bloodPressure: "Normal",
          },
        },
      },
    });

    return NextResponse.json({ message: "Patient registered successfully", clerkUser }, { status: 201 });
  } catch (error: unknown) {
    console.error("Registration error:", error);
    if (error instanceof ErrorEvent) {
      console.log(error.error)
    }
   
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
