/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient, UserRole, AppointmentStatus, PrescriptionStatus, ReportType, ReportStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding the database...');

  // Clean up database before seeding
  // await cleanDatabase();

  // Create users with different roles
  const adminUser = await createUser('admin123', 'admin@hospital.com', 'Admin', 'User', UserRole.ADMIN);
  const doctorUsers = await createDoctors(5);
  const patientUsers = await createPatients(10);
  const pharmacistUsers = await createPharmacists(2);
  const receptionistUsers = await createReceptionists(2);

  // Create medicines
  const medicines = await createMedicines(20);

  // Create inventory for medicines
  await createInventory(medicines);

  // Create doctor availability
  await createDoctorAvailability(doctorUsers.map(d => d.doctor));

  // Create appointments
  const appointments = await createAppointments(patientUsers.map(p => p.patient), doctorUsers.map(d => d.doctor));

  // Create prescriptions and prescription medications
  await createPrescriptions(patientUsers.map(p => p.patient), doctorUsers.map(d => d.doctor), medicines);

  // Create medical reports
  await createMedicalReports(patientUsers.map(p => p.patient), doctorUsers.map(d => d.doctor));

  console.log('Seeding completed successfully!');
}

// async function cleanDatabase() {
//   console.log('Cleaning database...');
  
//   // Delete all records from tables in the correct order to avoid foreign key constraint errors
//   await prisma.inventoryItem.deleteMany({});
//   await prisma.prescriptionMedication.deleteMany({});
//   await prisma.prescription.deleteMany({});
//   await prisma.medicine.deleteMany({});
//   await prisma.medicalReport.deleteMany({});
//   await prisma.appointment.deleteMany({});
//   await prisma.doctorAvailability.deleteMany({});
//   await prisma.patient.deleteMany({});
//   await prisma.doctor.deleteMany({});
//   await prisma.pharmacist.deleteMany({});
//   await prisma.receptionist.deleteMany({});
//   await prisma.user.deleteMany({});

//   console.log('Database cleaned.');
// }

async function createUser(clerkId: string, email: string, firstName: string, lastName: string, role: UserRole) {
  const user = await prisma.user.create({
    data: {
      clerkId,
      email,
      firstName,
      lastName,
      role
    }
  });
  
  console.log(`Created user: ${user.email} with role: ${user.role}`);
  return user;
}

async function createDoctors(count: number) {
  console.log(`Creating ${count} doctors...`);
  
  const doctors = [];
  const departments = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Gynecology', 'Ophthalmology', 'ENT'];
  const locations = ['Building A', 'Building B', 'East Wing', 'West Wing', 'Main Campus'];
  
  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();
    const clerkId = `doc_${faker.string.uuid()}`;
    
    const user = await createUser(clerkId, email, firstName, lastName, UserRole.DOCTOR);
    
    const doctor = await prisma.doctor.create({
      data: {
        userId: user.id,
        name: `Dr. ${firstName} ${lastName}`,
        department: faker.helpers.arrayElement(departments),
        experience: faker.number.int({ min: 1, max: 30 }),
        location: faker.helpers.arrayElement(locations),
        email: email,
        bio: faker.lorem.paragraph(),
        image: faker.image.avatar()
      }
    });
    
    console.log(`Created doctor: ${doctor.name} in ${doctor.department}`);
    doctors.push({ user, doctor });
  }
  
  return doctors;
}

async function createPatients(count: number) {
  console.log(`Creating ${count} patients...`);
  
  const patients = [];
  const genders = ['Male', 'Female', 'Other'];
  
  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();
    const clerkId = `pat_${faker.string.uuid()}`;
    
    const user = await createUser(clerkId, email, firstName, lastName, UserRole.PATIENT);
    
    const patient = await prisma.patient.create({
      data: {
        userId: user.id,
        name: `${firstName} ${lastName}`,
        age: faker.number.int({ min: 18, max: 80 }),
        gender: faker.helpers.arrayElement(genders),
        dateOfBirth: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }),
        phoneNumber: faker.phone.number(),
        address: faker.location.streetAddress(true),
        medicalHistory: faker.helpers.arrayElement([
          'No significant medical history',
          'Hypertension, Diabetes Type 2',
          'Asthma, Allergic to Penicillin',
          'Previous heart surgery, Arthritis',
          null
        ])
      }
    });
    
    console.log(`Created patient: ${patient.name}`);
    patients.push({ user, patient });
  }
  
  return patients;
}

async function createPharmacists(count: number) {
  console.log(`Creating ${count} pharmacists...`);
  
  const pharmacists = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();
    const clerkId = `pharm_${faker.string.uuid()}`;
    
    const user = await createUser(clerkId, email, firstName, lastName, UserRole.PHARMACIST);
    
    const pharmacist = await prisma.pharmacist.create({
      data: {
        userId: user.id,
        name: `${firstName} ${lastName}`,
        licenseNumber: `PH${faker.number.int({ min: 10000, max: 99999 })}`
      }
    });
    
    console.log(`Created pharmacist: ${pharmacist.name}`);
    pharmacists.push({ user, pharmacist });
  }
  
  return pharmacists;
}

async function createReceptionists(count: number) {
  console.log(`Creating ${count} receptionists...`);
  
  const receptionists = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();
    const clerkId = `rec_${faker.string.uuid()}`;
    
    const user = await createUser(clerkId, email, firstName, lastName, UserRole.RECEPTIONIST);
    
    const receptionist = await prisma.receptionist.create({
      data: {
        userId: user.id,
        name: `${firstName} ${lastName}`
      }
    });
    
    console.log(`Created receptionist: ${receptionist.name}`);
    receptionists.push({ user, receptionist });
  }
  
  return receptionists;
}

async function createMedicines(count: number) {
  console.log(`Creating ${count} medicines...`);
  
  const medicines = [];
  const dosageForms = ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Ointment', 'Drops'];
  const categories = ['Antibiotic', 'Analgesic', 'Antiviral', 'Antihistamine', 'Antidepressant', 'Antihypertensive'];
  
  for (let i = 0; i < count; i++) {
    const medicine = await prisma.medicine.create({
      data: {
        name: faker.helpers.arrayElement([
          'Amoxicillin', 'Paracetamol', 'Ibuprofen', 'Lisinopril', 
          'Atorvastatin', 'Omeprazole', 'Metformin', 'Cetirizine',
          'Aspirin', 'Simvastatin', 'Losartan', 'Metoprolol',
          'Amlodipine', 'Sertraline', 'Loratadine', 'Furosemide',
          'Gabapentin', 'Albuterol', 'Citalopram', 'Fluoxetine'
        ]),
        genericName: faker.science.chemicalElement().name,
        manufacturer: faker.company.name(),
        category: faker.helpers.arrayElement(categories),
        description: faker.lorem.paragraph(),
        dosageForm: faker.helpers.arrayElement(dosageForms),
        strength: `${faker.number.int({ min: 5, max: 500 })}${faker.helpers.arrayElement(['mg', 'g', 'ml', 'mcg'])}`
      }
    });
    
    console.log(`Created medicine: ${medicine.name} (${medicine.dosageForm})`);
    medicines.push(medicine);
  }
  
  return medicines;
}

async function createInventory(medicines: any[]) {
  console.log('Creating inventory items...');
  
  for (const medicine of medicines) {
    const inventoryCount = faker.number.int({ min: 1, max: 3 });
    
    for (let i = 0; i < inventoryCount; i++) {
      const inventoryItem = await prisma.inventoryItem.create({
        data: {
          medicineId: medicine.id,
          batchNumber: `B${faker.number.int({ min: 10000, max: 99999 })}`,
          quantity: faker.number.int({ min: 10, max: 500 }),
          expiryDate: faker.date.future({ years: 2 }),
          purchaseDate: faker.date.past({ years: 1 }),
          price: parseFloat(faker.finance.amount({ min: 5, max: 100, dec: 2 }))
        }
      });
      
      console.log(`Created inventory item for ${medicine.name}: ${inventoryItem.quantity} units (Batch: ${inventoryItem.batchNumber})`);
    }
  }
}

async function createDoctorAvailability(doctors: any[]) {
  console.log('Creating doctor availability...');
  
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];
  
  for (const doctor of doctors) {
    // Create availability for the next 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      date.setHours(0, 0, 0, 0);
      
      // Each doctor has 5-8 slots per day
      const dailySlots = faker.helpers.arrayElements(
        timeSlots, 
        faker.number.int({ min: 5, max: 8 })
      );
      
      for (const timeSlot of dailySlots) {
        await prisma.doctorAvailability.create({
          data: {
            doctorId: doctor.id,
            date: date,
            timeSlot: timeSlot,
            isBooked: faker.datatype.boolean({ probability: 0.3 })
          }
        });
      }
    }
    
    console.log(`Created availability slots for Dr. ${doctor.name}`);
  }
}

async function createAppointments(patients: any[], doctors: any[]) {
  console.log('Creating appointments...');
  
  const appointments = [];
  const appointmentTypes = ['Checkup', 'Consultation', 'Follow-up', 'Emergency', 'Vaccination'];
  const statuses = [AppointmentStatus.PENDING, AppointmentStatus.CONFIRMED, AppointmentStatus.COMPLETED, AppointmentStatus.CANCELLED, AppointmentStatus.IN_PROGRESS];
  
  // Create 15 appointments
  for (let i = 0; i < 15; i++) {
    const patient = faker.helpers.arrayElement(patients);
    const doctor = faker.helpers.arrayElement(doctors);
    
    const appointmentDate = faker.date.between({ 
      from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 
      to: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) 
    });
    
    const hours = faker.number.int({ min: 9, max: 16 });
    const minutes = faker.helpers.arrayElement([0, 30]);
    const appointmentTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    const appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        doctorId: doctor.id,
        date: appointmentDate,
        time: appointmentTime,
        type: faker.helpers.arrayElement(appointmentTypes),
        status: faker.helpers.arrayElement(statuses),
        symptoms: faker.datatype.boolean() ? faker.lorem.sentences({ min: 1, max: 3 }) : null,
        notes: faker.datatype.boolean({ probability: 0.7 }) ? faker.lorem.paragraph() : null
      }
    });
    
    console.log(`Created appointment: ${patient.name} with Dr. ${doctor.name} on ${appointmentDate.toLocaleDateString()}`);
    appointments.push(appointment);
  }
  
  return appointments;
}

async function createPrescriptions(patients: any[], doctors: any[], medicines: any[]) {
  console.log('Creating prescriptions...');
  
  const prescriptions = [];
  const statuses = [PrescriptionStatus.ACTIVE, PrescriptionStatus.COMPLETED, PrescriptionStatus.EXPIRED];
  const frequencies = ['Once a day', 'Twice a day', 'Three times a day', 'Every 4 hours', 'Every 6 hours', 'As needed'];
  const durations = ['7 days', '10 days', '14 days', '1 month', '3 months', 'Until finished'];
  
  // Create 10 prescriptions
  for (let i = 0; i < 10; i++) {
    const patient = faker.helpers.arrayElement(patients);
    const doctor = faker.helpers.arrayElement(doctors);
    
    const issueDate = faker.date.recent({ days: 30 });
    const expiryDate = new Date(issueDate);
    expiryDate.setDate(expiryDate.getDate() + faker.number.int({ min: 30, max: 90 }));
    
    const prescription = await prisma.prescription.create({
      data: {
        patientId: patient.id,
        doctorId: doctor.id,
        issueDate: issueDate,
        expiryDate: expiryDate,
        status: faker.helpers.arrayElement(statuses)
      }
    });
    
    // Add 1-4 medications to each prescription
    const medicationCount = faker.number.int({ min: 1, max: 4 });
    const prescriptionMedicines = faker.helpers.arrayElements(medicines, medicationCount);
    
    for (const medicine of prescriptionMedicines) {
      await prisma.prescriptionMedication.create({
        data: {
          prescriptionId: prescription.id,
          medicineId: medicine.id,
          dosage: `${faker.number.int({ min: 1, max: 2 })} ${medicine.dosageForm.toLowerCase()}`,
          frequency: faker.helpers.arrayElement(frequencies),
          duration: faker.helpers.arrayElement(durations),
          instructions: faker.datatype.boolean({ probability: 0.7 }) ? 
            faker.helpers.arrayElement([
              'Take with food', 
              'Take on an empty stomach', 
              'Take before bedtime',
              'Do not take with dairy products',
              'Take as needed for pain',
              'Do not drive after taking this medication'
            ]) : null
        }
      });
    }
    
    console.log(`Created prescription for ${patient.name} with ${medicationCount} medications`);
    prescriptions.push(prescription);
  }
  
  return prescriptions;
}

async function createMedicalReports(patients: any[], doctors: any[]) {
  console.log('Creating medical reports...');
  
  const reports = [];
  const reportTypes = [ReportType.BLOOD_TEST, ReportType.X_RAY, ReportType.MRI, ReportType.CT_SCAN, ReportType.ULTRASOUND, ReportType.OTHER];
  const statuses = [ReportStatus.PROCESSING, ReportStatus.READY, ReportStatus.REVIEWED];
  
  // Create 12 medical reports
  for (let i = 0; i < 12; i++) {
    const patient = faker.helpers.arrayElement(patients);
    const doctor = faker.helpers.arrayElement(doctors);
    const reportType = faker.helpers.arrayElement(reportTypes);
    
    let reportName = '';
    switch (reportType) {
      case ReportType.BLOOD_TEST:
        reportName = faker.helpers.arrayElement(['Complete Blood Count', 'Lipid Profile', 'Liver Function Test', 'Thyroid Profile']);
        break;
      case ReportType.X_RAY:
        reportName = faker.helpers.arrayElement(['Chest X-Ray', 'Dental X-Ray', 'Spine X-Ray', 'Hand X-Ray']);
        break;
      case ReportType.MRI:
        reportName = faker.helpers.arrayElement(['Brain MRI', 'Spine MRI', 'Knee MRI', 'Shoulder MRI']);
        break;
      case ReportType.CT_SCAN:
        reportName = faker.helpers.arrayElement(['Chest CT', 'Abdominal CT', 'Head CT', 'Pelvic CT']);
        break;
      case ReportType.ULTRASOUND:
        reportName = faker.helpers.arrayElement(['Abdominal Ultrasound', 'Pelvic Ultrasound', 'Thyroid Ultrasound', 'Breast Ultrasound']);
        break;
      default:
        reportName = faker.helpers.arrayElement(['Allergy Test', 'Biopsy Report', 'ECG Report', 'Endoscopy Report']);
    }
    
    const report = await prisma.medicalReport.create({
      data: {
        patientId: patient.id,
        doctorId: doctor.id,
        name: reportName,
        type: reportType,
        fileUrl: faker.datatype.boolean({ probability: 0.7 }) ? `https://hospital-storage.com/reports/${faker.string.uuid()}.pdf` : null,
        results: faker.datatype.boolean({ probability: 0.8 }) ? faker.lorem.paragraphs({ min: 1, max: 3 }) : null,
        date: faker.date.recent({ days: 30 }),
        status: faker.helpers.arrayElement(statuses)
      }
    });
    
    console.log(`Created medical report: ${reportName} for ${patient.name}`);
    reports.push(report);
  }
  
  return reports;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });