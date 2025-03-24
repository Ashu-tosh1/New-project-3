import { PrismaClient, Role, AppointmentStatus, medicineType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create Admin User
    const admin = await prisma.user.create({
        data: {
            id: 'admin-001',
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'securepassword', // Hash this in a real app
            role: Role.ADMIN,
        },
    });

    // Create a Doctor User
    const doctorUser = await prisma.user.create({
        data: {
            id: 'doctor-001',
            name: 'Dr. John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            role: Role.DOCTOR,
        },
    });

    // Create a Doctor
    const doctor = await prisma.doctor.create({
        data: {
            id: 'doc-001',
            userId: doctorUser.id,
            department: 'Cardiology',
            availableSlots: ['10:00 AM', '11:00 AM', '02:00 PM'],
            bookedSlots: [],
        },
    });

    // Create a Patient User
    const patientUser = await prisma.user.create({
        data: {
            id: 'patient-001',
            name: 'Alice Johnson',
            email: 'alice@example.com',
            password: 'password123',
            role: Role.PATIENT,
        },
    });

    // Create a Patient
    const patient = await prisma.patient.create({
        data: {
            id: 'pat-001',
            userId: patientUser.id,
            phone: '1234567890',
            address: '123 Main St',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            country: 'USA',
            sex: 'Female',
            dob: new Date('1995-08-15'),
            bloodGroup: 'O+',
            weight: 60,
            height: 165,
            bloodPressure: '120/80',
            isActive: true,
        },
    });

    // Create a Lab Assistant User
    const labAssistantUser = await prisma.user.create({
        data: {
            id: 'lab-001',
            name: 'Lab Assistant',
            email: 'lab@example.com',
            password: 'password123',
            role: Role.LAB_ASSISTANT,
        },
    });

    // Create a Lab Assistant
    const labAssistant = await prisma.labAssistant.create({
        data: {
            id: 'lab-assist-001',
            userId: labAssistantUser.id,
        },
    });

    // Create an Appointment
    const appointment = await prisma.appointment.create({
        data: {
            id: 'app-001',
            patientId: patient.id,
            doctorId: doctor.id,
            appointmentDate: new Date(), // Today's date
            appointmentTime: new Date(), // Current time
            status: AppointmentStatus.PENDING,
            type: 'General Checkup',
            description: 'Routine checkup for blood pressure and cholesterol.',
            notes: 'Patient has a history of high BP.',
            paymentStatus: 'PENDING',
            createdAt: new Date(),
        },
    });

    // Create Medicine
    const medicine = await prisma.medicine.create({
        data: {
            id: 'med-001',
            name: 'Aspirin',
            price: 50,
            quantity: 10,
            description: 'Pain reliever and blood thinner',
            medicineType: medicineType.TABLET,
            patientId: patient.id,
            doctorId: doctor.id,
            orderStatus: 'PENDING',
            createdAt: new Date(),
        },
    });

    // Create a Report
    const report = await prisma.report.create({
        data: {
            id: 'rep-001',
            patientId: patient.id,
            doctorId: doctor.id,
            details: 'Blood test report shows slightly high cholesterol levels.',
            createdAt: new Date(),
        },
    });

    // Create a Lab Test
    const labTest = await prisma.labTest.create({
        data: {
            id: 'lab-001',
            patientId: patient.id,
            doctorId: doctor.id,
            labAssistantId: labAssistant.id,
            testDetails: 'Complete Blood Count (CBC)',
            status: 'PENDING',
            createdAt: new Date(),
        },
    });

    // Create a Chat Message
    const chat = await prisma.chat.create({
        data: {
            id: 'chat-001',
            doctorId: doctor.id,
            patientId: patient.id,
            message: 'Hello Alice, how are you feeling today?',
            createdAt: new Date(),
        },
    });

    console.log('✅ Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
