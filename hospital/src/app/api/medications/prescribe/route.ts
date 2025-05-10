// /api/medications/prescribe.ts
import { NextResponse } from 'next/server';
import { PrismaClient, MedicationStatus } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patientId, doctorId, conversationId, medications } = body;

    if (!patientId || !doctorId || !medications || !Array.isArray(medications) || medications.length === 0) {
      return NextResponse.json(
        { error: 'Patient ID, Doctor ID, and at least one medication are required' },
        { status: 400 }
      );
    }

    // Start a transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Create or find conversation if not provided
      let convoId = conversationId;
      if (!convoId) {
        // Try to find an existing conversation
        const existingConvo = await tx.conversation.findFirst({
          where: {
            patientId,
            doctorId,
            status: 'ACTIVE'
          }
        });

        if (existingConvo) {
          convoId = existingConvo.id;
        } else {
          // Create a new conversation if none exists
          const newConvo = await tx.conversation.create({
            data: {
              patientId,
              doctorId,
              status: 'ACTIVE',
              startedAt: new Date()
            }
          });
          convoId = newConvo.id;
        }
      }
      
      // Create a prescription record
      const prescription = await tx.prescription.create({
        data: {
          patientId,
          doctorId,
          issueDate: new Date(),
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          status: 'ACTIVE'
        }
      });
      
      // Process each medication
      const medicationPromises = medications.map(async (med: any) => {
        // Check if medicine exists, create if not
        let medicine = await tx.medicine.findFirst({
          where: {
            name: {
              equals: med.name,
              mode: 'insensitive'
            }
          }
        });
        
        if (!medicine) {
          medicine = await tx.medicine.create({
            data: {
              name: med.name,
              description: `${med.name} ${med.dosage}`,
            //   status: MedicationStatus.COMPLETED,
            }
          });
        }
        
        // Create medication prescription
        const medicationPrescription = await tx.medicationPrescription.create({
          data: {
            conversationId: convoId,
            prescribedBy: doctorId,
            prescriptionId: prescription.id,
            medicineId: medicine.id,
            dosage: med.dosage,
            frequency: med.frequency || 'As directed',
            duration: med.duration || 'As needed',
            instructions: med.instructions,
            status: MedicationStatus.PRESCRIBED
          }
        });
        
        return medicationPrescription;
      });
      
      // Wait for all medications to be processed
      const createdMedications = await Promise.all(medicationPromises);
      
      return {
        prescription,
        medications: createdMedications
      };
    });

    return NextResponse.json({
      success: true,
      message: 'Medications prescribed successfully',
      data: result
    });
    
  } catch (error) {
    console.error('Error prescribing medications:', error);
    return NextResponse.json(
      { error: 'Failed to prescribe medications' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}