// import { prisma } from "@/lib/prisma";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { conversationId, requestedBy, tests } = body;

    if (!conversationId || !requestedBy || !Array.isArray(tests)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const createdTestRequests = await Promise.all(
      tests.map((test: { testName: string; testType: string; description?: string }) =>
        prisma.testRequest.create({
          data: {
            conversationId,
            requestedBy,
            testName: test.testName,
            testType: test.testType,
            description: test.description || undefined,
            status: "REQUESTED", // default value; optional here
          },
        })
      )
    );

    return NextResponse.json({ success: true, testRequests: createdTestRequests }, { status: 200 });
  } catch (error) {
    console.error("Failed to create test requests:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
