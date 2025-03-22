import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(' Seeding database...');

  // Create Doctors
  const doctor1 = await prisma.doctor.create({
    data: {
      id: 'doc-001',
      name: 'Dr. John Doe',
      email: 'john.doe@example.com',
    },
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      id: 'doc-002',
      name: 'Dr. Jane Smith',
      email: 'jane.smith@example.com',
    },
  });

  // Create Patients
  const patient1 = await prisma.patient.create({
    data: {
      id: 'pat-001',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phone: '1234567890',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
      sex: 'Female',
      dob: new Date('1990-05-15'),
      bloodGroup: 'O+',
      weight: 65,
      height: 170,
      bloodPressure: '120/80',
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      id: 'pat-002',
      name: 'Bob Williams',
      email: 'bob.williams@example.com',
      phone: '9876543210',
      address: '456 Oak St',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      country: 'USA',
      sex: 'Male',
      dob: new Date('1985-08-22'),
      bloodGroup: 'A+',
      weight: 75,
      height: 180,
      bloodPressure: '130/85',
    },
  });

  // Create Appointments
  await prisma.appointment.createMany({
    data: [
      {
        id: 'app-001',
        patientId: 'pat-001',
        doctorId: 'doc-001',
        appointmentDate: new Date(),
        appointmentTime: new Date(),
        appointmentStatus: 'Scheduled',
        appointmentType: 'Checkup',
        appointmentDescription: 'Routine checkup for blood pressure',
        appointmentNotes: 'Monitor BP regularly',
      },
      {
        id: 'app-002',
        patientId: 'pat-002',
        doctorId: 'doc-002',
        appointmentDate: new Date(),
        appointmentTime: new Date(),
        appointmentStatus: 'Completed',
        appointmentType: 'Consultation',
        appointmentDescription: 'Discuss test results',
        appointmentNotes: 'Prescribed medication for cholesterol',
      },
    ],
  });

  // Create Medicines
  await prisma.medicine.createMany({
    data: [
      {
        id: 'med-001',
        name: 'Paracetamol',
        price: 10,
        quantity: 20,
        description: 'Pain reliever',
        medicineType: 'TABLET',
        patientId: 'pat-001',
        doctorId: 'doc-001',
      },
      {
        id: 'med-002',
        name: 'Amoxicillin',
        price: 15,
        quantity: 10,
        description: 'Antibiotic',
        medicineType: 'CAPSULE',
        patientId: 'pat-002',
        doctorId: 'doc-002',
      },
    ],
  });

  // Create Reports
  await prisma.report.createMany({
    data: [
      {
        id: 'rep-001',
        patientId: 'pat-001',
        doctorId: 'doc-001',
      },
      {
        id: 'rep-002',
        patientId: 'pat-002',
        doctorId: 'doc-002',
      },
    ],
  });

  // Create Lab Tests
  await prisma.labTest.createMany({
    data: [
      {
        id: 'lab-001',
        patientId: 'pat-001',
        doctorId: 'doc-001',
      },
      {
        id: 'lab-002',
        patientId: 'pat-002',
        doctorId: 'doc-002',
      },
    ],
  });

  console.log(' Seeding completed.');
}

main()
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
