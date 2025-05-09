// /app/api/appointments/details/route.ts
// import { NextRequest, NextResponse } from 'next';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const appointmentId = req.url.split('/').pop(); // Extract the appointment ID from the URL

    if (!appointmentId) {
      return NextResponse.json({ error: 'Appointment ID is required' }, { status: 400 });
    }

    // Fetch appointment details based on appointment ID
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
      include: {
        patient: true, // To get the patient data if needed
      },
    });

    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    // Return symptoms, notes, and patient details
    return NextResponse.json({
      symptoms: appointment.symptoms,
      notes: appointment.notes,
      patient: appointment.patient,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Unable to fetch appointment details' }, { status: 500 });
  }
}
