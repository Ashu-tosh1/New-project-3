import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
     const appointmentId = await params.id;

    if (!appointmentId) {
      return NextResponse.json(
        { error: 'Appointment ID is required' },
        { status: 400 }
      );
    }

    // Fetch the appointment with related data
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
      include: {
        patient: true,
        doctor: true,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Format the date and time for frontend display
    const formattedDate = new Date(appointment.date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    // Find any medical reports related to this patient and doctor
    const medicalReports = await prisma.medicalReport.findMany({
      where: {
        patientId: appointment.patientId,
        doctorId: appointment.doctorId,
      },
      orderBy: {
        date: 'desc',
      },
    });

    // Find any test requests related to this patient and doctor
    const testRequests = await prisma.testRequest.findMany({
      where: {
        conversation: {
          patientId: appointment.patientId,
          doctorId: appointment.doctorId,
        },
      },
      include: {
        medicalReport: true,
      },
    });

    // Find any prescriptions related to this patient and doctor
    const prescriptions = await prisma.prescription.findMany({
      where: {
        patientId: appointment.patientId,
        doctorId: appointment.doctorId,
      },
      include: {
        medications: {
          include: {
            medicine: true,
          },
        },
      },
      orderBy: {
        issueDate: 'desc',
      },
      take: 1, // Get the most recent prescription
    });

    // Find any medications prescribed during conversations
    const medicationPrescriptions = await prisma.medicationPrescription.findMany({
      where: {
        conversation: {
          patientId: appointment.patientId,
          doctorId: appointment.doctorId,
        },
      },
      include: {
        medicine: true,
      },
    });

    // Format the response data for the frontend
    const formattedAppointment = {
      id: appointment.id,
      patientName: appointment.patient.name,
      doctorName: appointment.doctor.name,
      doctorSpecialty: appointment.doctor.department,
      appointmentDate: formattedDate,
      appointmentTime: appointment.time,
      location: appointment.doctor.location,
      status: appointment.status.toLowerCase(),
      type: appointment.type,
      symptoms: appointment.symptoms ? appointment.symptoms.split(',').map(s => s.trim()) : [],
      notes: appointment.notes,
    };

    // Add recommended tests based on test requests
    const recommendedTests = testRequests.map(test => ({
      name: test.testName,
      description: test.description || `${test.testType} - Requested by Dr. ${appointment.doctor.name}`,
      status: test.status,
      resultId: test.resultId,
    }));

    // Add test results from medical reports
    const testResults = medicalReports.length > 0 
      ? medicalReports[0].results 
      : null;

    // Add medications from prescriptions or conversation medications
    let medications = [];
    
    // First check formal prescriptions
    if (prescriptions.length > 0 && prescriptions[0].medications.length > 0) {
      medications = prescriptions[0].medications.map(med => ({
        name: med.medicine.name,
        dosage: med.dosage,
        instructions: med.instructions || `Take ${med.frequency} for ${med.duration || 'as needed'}`,
      }));
    } 
    // If no formal prescriptions, check conversation prescriptions
    else if (medicationPrescriptions.length > 0) {
      medications = medicationPrescriptions.map(med => ({
        name: med.medicine.name,
        dosage: med.dosage,
        instructions: med.instructions || `Take ${med.frequency} for ${med.duration || 'as needed'}`,
      }));
    }

    return NextResponse.json({
      ...formattedAppointment,
      recommendedTests: recommendedTests.length > 0 ? recommendedTests : null,
      testResults,
      medications: medications.length > 0 ? medications : null,
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch appointment details' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}