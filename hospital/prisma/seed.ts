import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.chat.deleteMany();
  await prisma.labTest.deleteMany();
  await prisma.report.deleteMany();
  await prisma.medicine.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.patientDoctor.deleteMany();
  await prisma.labAssistant.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      clerkId: 'admin_123',
      name: 'Admin User',
      email: 'admin@healthcare.com',
      password: '$2a$10$examplehashedpassword',
      role: 'ADMIN',
    },
  });

  // Create doctor user
  const doctorUser = await prisma.user.create({
    data: {
      clerkId: 'doc_123',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@healthcare.com',
      password: '$2a$10$examplehashedpassword',
      role: 'DOCTOR',
    },
  });

  // Create doctor record
  const doctor = await prisma.doctor.create({
    data: {
      userId: doctorUser.id,
      department: 'Cardiology',
      availableSlots: {
        "Monday": ["09:00", "10:00", "11:00", "14:00", "15:00"],
        "Tuesday": ["10:00", "11:00", "13:00", "14:00"]
      },
      bookedSlots: {}
    },
  });

  // Create patient user
  const patientUser = await prisma.user.create({
    data: {
      clerkId: 'pat_123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '$2a$10$examplehashedpassword',
      role: 'PATIENT',
    },
  });

  // Create patient record
  const patient = await prisma.patient.create({
    data: {
      userId: patientUser.id,
      phone: '555-0101',
      address: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zip: '62704',
      country: 'USA',
      sex: 'Male',
      dob: new Date('1985-05-15'),
      bloodGroup: 'A+',
      weight: 180,
      height: 72,
      bloodPressure: '120/80',
      isActive: true
    },
  });

  // Create doctor-patient relationship
  await prisma.patientDoctor.create({
    data: {
      doctorId: doctor.id,
      patientId: patient.id
    }
  });

  // Create appointment
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  await prisma.appointment.create({
    data: {
      id: uuidv4(),
      patientId: patient.id,
      doctorId: doctor.id,
      appointmentDate: tomorrow,
      appointmentTime: new Date(tomorrow.setHours(10, 0, 0, 0)),
      status: 'CONFIRMED',
      type: 'Regular Checkup',
      description: 'Annual physical examination',
      paymentStatus: 'PAID'
    }
  });

  // Create medicine
  await prisma.medicine.create({
    data: {
      id: uuidv4(),
      name: 'Amoxicillin',
      price: 15,
      quantity: 30,
      description: 'Antibiotic for bacterial infections',
      medicineType: 'CAPSULE',
      patientId: patient.id,
      doctorId: doctor.id,
      orderStatus: 'COMPLETED'
    }
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });