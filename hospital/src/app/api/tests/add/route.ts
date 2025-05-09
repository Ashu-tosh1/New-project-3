import prisma from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const body = await req.json();
      const { patientId, doctorId, tests } = body;
  
      if (!patientId || !doctorId || !Array.isArray(tests)) {
          console.log(patientId)
          console.log(doctorId)
          return NextResponse.json({ error: "Invalid request" }, { status: 400 });
          
      }
  
      // Find or create conversation
      let conversation = await prisma.conversation.findFirst({
        where: { patientId, doctorId },
      });
  
      if (!conversation) {
        conversation = await prisma.conversation.create({
          data: { patientId, doctorId },
        });
      }
  
      // Create test requests
      const createdTestRequests = await Promise.all(
        tests.map((test: { testName: string; testType: string; description?: string }) =>
          prisma.testRequest.create({
            data: {
              conversationId: conversation.id,
              requestedBy: doctorId,
              testName: test.testName,
              testType: test.testType,
              description: test.description,
              status: "REQUESTED",
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
  