// Mock data
export const upcomingAppointments = [
    { id: 1, doctor: "Dr. Sarah Johnson", department: "Cardiology", date: "April 5, 2025", time: "10:30 AM", status: "Confirmed" },
    { id: 2, doctor: "Dr. Michael Chen", department: "Neurology", date: "April 12, 2025", time: "2:00 PM", status: "Pending" }
  ];
  
  export const recentReports = [
    { id: 1, name: "Blood Test Results", date: "March 28, 2025", status: "Ready" },
    { id: 2, name: "X-Ray Report", date: "March 20, 2025", status: "Ready" },
    { id: 3, name: "MRI Scan", date: "April 1, 2025", status: "Processing" }
  ];
  
  export const prescriptions = [
    { id: 1, medication: "Amoxicillin", dosage: "500mg", frequency: "3 times daily", status: "Active" },
    { id: 2, medication: "Lisinopril", dosage: "10mg", frequency: "Once daily", status: "Active" }
  ];

  

export interface Doctor {
    id: number;
    name: string;
    department: string;
    image: string;
    experience: number;
    location: string;
    email: string;
    bio: string;
    availability: {
      [date: string]: string[]; // date -> available time slots
    };
  }
  
export const sampleDoctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      department: "Cardiology",
      image: "/api/placeholder/120/120",
      experience: 12,
      location: "Medical Center, Floor 3",
      email: "s.johnson@example.com",
      bio: "Dr. Johnson specializes in interventional cardiology with over 12 years of experience in treating complex heart conditions.",
      availability: {
        "2025-04-06": ["09:00", "10:00", "14:00"],
        "2025-04-07": ["11:00", "13:00", "15:00"],
        "2025-04-08": ["09:00", "10:00", "16:00"],
        "2025-04-09": ["14:00", "15:00"],
        "2025-04-10": ["09:00", "11:00", "16:00"],
        "2025-04-11": ["10:00", "13:00", "14:00"],
        "2025-04-12": ["09:00", "10:00", "11:00"],
      }
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      department: "Neurology",
      image: "/api/placeholder/120/120",
      experience: 8,
      location: "Medical Center, Floor 2",
      email: "m.chen@example.com",
      bio: "Dr. Chen is a neurologist specialized in treating movement disorders and neurodegenerative diseases.",
      availability: {
        "2025-04-06": ["09:00", "11:00"],
        "2025-04-07": ["14:00", "15:00", "16:00"],
        "2025-04-08": ["09:00", "12:00"],
        "2025-04-09": ["10:00", "11:00", "15:00"],
        "2025-04-10": ["14:00", "16:00"],
        "2025-04-11": ["09:00", "10:00"],
        "2025-04-12": ["11:00", "14:00", "16:00"],
      }
    },
    {
      id: 3,
      name: "Dr. Amelia Rodriguez",
      department: "Pediatrics",
      image: "/api/placeholder/120/120",
      experience: 15,
      location: "Children's Center, Floor 1",
      email: "a.rodriguez@example.com",
      bio: "Dr. Rodriguez has been practicing pediatric medicine for 15 years, with a special focus on early childhood development.",
      availability: {
        "2025-04-06": ["10:00", "13:00", "15:00"],
        "2025-04-07": ["09:00", "11:00", "14:00"],
        "2025-04-08": ["10:00", "15:00", "16:00"],
        "2025-04-09": ["09:00", "13:00"],
        "2025-04-10": ["10:00", "11:00", "14:00"],
        "2025-04-11": ["15:00", "16:00"],
        "2025-04-12": ["09:00", "10:00", "11:00"],
      }
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      department: "Orthopedics",
      image: "/api/placeholder/120/120",
      experience: 10,
      location: "Medical Center, Floor 4",
      email: "j.wilson@example.com",
      bio: "Dr. Wilson specializes in sports medicine and joint replacement surgery with 10 years of clinical experience.",
      availability: {
        "2025-04-06": ["14:00", "15:00"],
        "2025-04-07": ["09:00", "10:00", "11:00"],
        "2025-04-08": ["13:00", "14:00"],
        "2025-04-09": ["09:00", "15:00", "16:00"],
        "2025-04-10": ["10:00", "11:00"],
        "2025-04-11": ["09:00", "14:00", "16:00"],
        "2025-04-12": ["13:00", "15:00"],
      }
    },
    {
      id: 5,
      name: "Dr. Emily Parker",
      department: "Dermatology",
      image: "/api/placeholder/120/120",
      experience: 7,
      location: "Medical Center, Floor 1",
      email: "e.parker@example.com",
      bio: "Dr. Parker is a board-certified dermatologist specializing in medical and cosmetic dermatology.",
      availability: {
        "2025-04-06": ["09:00", "10:00", "16:00"],
        "2025-04-07": ["13:00", "14:00"],
        "2025-04-08": ["10:00", "11:00", "15:00"],
        "2025-04-09": ["09:00", "14:00"],
        "2025-04-10": ["10:00", "13:00", "16:00"],
        "2025-04-11": ["11:00", "14:00"],
        "2025-04-12": ["09:00", "15:00", "16:00"],
      }
    },
    {
      id: 6,
      name: "Dr. Hassan Ali",
      department: "Cardiology",
      image: "/api/placeholder/120/120",
      experience: 14,
      location: "Heart Center, Floor 2",
      email: "h.ali@example.com",
      bio: "Dr. Ali is a cardiologist with expertise in cardiac imaging and preventive cardiology.",
      availability: {
        "2025-04-06": ["11:00", "14:00"],
        "2025-04-07": ["09:00", "10:00", "15:00"],
        "2025-04-08": ["13:00", "16:00"],
        "2025-04-09": ["09:00", "10:00", "14:00"],
        "2025-04-10": ["11:00", "15:00"],
        "2025-04-11": ["09:00", "13:00", "16:00"],
        "2025-04-12": ["10:00", "14:00"],
      }
    },
  ];
  

// import { Patient } from '../types';
  

export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  appointmentTime: string;
  status: "waiting" | "in-progress" | "completed";
  symptoms?: string;
  medicalHistory?: string;
  image?: string;
};

export const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "John Doe",
    age: 35,
    gender: "Male",
    appointmentTime: "9:00 AM",
    status: "in-progress",
    symptoms: "Chest pain, shortness of breath, fatigue lasting for 1 week. Pain intensifies during physical activity.",
    medicalHistory: "Hypertension diagnosed 3 years ago. No previous cardiac issues. Family history of heart disease."
  },
  {
    id: "P002",
    name: "Sarah Johnson",
    age: 42,
    gender: "Female",
    appointmentTime: "9:30 AM",
    status: "waiting",
    symptoms: "Migraine headaches, sensitivity to light",
    medicalHistory: "Chronic migraines, allergic to penicillin"
  },
  {
    id: "P003",
    name: "Robert Chen",
    age: 58,
    gender: "Male",
    appointmentTime: "10:15 AM",
    status: "waiting",
    symptoms: "Joint pain in knees and hands",
    medicalHistory: "Arthritis, type 2 diabetes"
  },
  {
    id: "P004",
    name: "Emily Wilson",
    age: 29,
    gender: "Female",
    appointmentTime: "11:00 AM",
    status: "waiting",
    symptoms: "Persistent cough, fever",
    medicalHistory: "Asthma"
  }
];


interface PrescriptionEntry {
  medicine: string;
  dosage: string;
  frequency: string;
}

interface PrescriptionGroup {
  id: string;
  doctor: string;
  date: string;
  prescriptions: PrescriptionEntry[];
}
  

export const samplePrescriptionsGrouped: PrescriptionGroup[] = [
  {
    id: "1",
    doctor: "Dr. Priya Mehra",
    date: "2025-04-10",
    prescriptions: [
      { medicine: "Amoxicillin 500mg", dosage: "1 tablet", frequency: "Twice a day" },
      { medicine: "Cetirizine 10mg", dosage: "1 tablet", frequency: "Once before bed" },
      { medicine: "Omeprazole 20mg", dosage: "1 capsule", frequency: "Before breakfast" },
    ],
  },
  {
    id: "2",
    doctor: "Dr. Raj Verma",
    date: "2025-04-05",
    prescriptions: [
      { medicine: "Paracetamol 650mg", dosage: "1 tablet", frequency: "Every 6 hours if fever persists" },
      { medicine: "ORS Solution", dosage: "200 ml", frequency: "After every loose motion" },
    ],
  },
];


export const appointments = [
  { id: 1, patient: 'James Wilson', time: '09:00 AM', date: '2025-04-25', status: 'confirmed', type: 'Checkup' },
  { id: 2, patient: 'Emma Thompson', time: '10:30 AM', date: '2025-04-25', status: 'confirmed', type: 'Consultation' },
  { id: 3, patient: 'Robert Garcia', time: '01:15 PM', date: '2025-04-25', status: 'pending', type: 'Follow-up' },
  { id: 4, patient: 'Sarah Johnson', time: '03:45 PM', date: '2025-04-26', status: 'confirmed', type: 'Vaccination' },
  { id: 5, patient: 'Michael Brown', time: '11:00 AM', date: '2025-04-27', status: 'cancelled', type: 'Specialist Referral' }
];

// Type Definitions
type AttendedPatient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  appointmentDate: string;
  diagnosis: string;
  doctorName: string;
};

// Mock Data
export  const attendedPatients: AttendedPatient[] = [
  {
    id: "p001",
    name: "Ravi Kumar",
    age: 45,
    gender: "Male",
    appointmentDate: "2025-04-20",
    diagnosis: "Hypertension",
    doctorName: "Dr. A. Sharma",
  },
  {
    id: "p002",
    name: "Meena Das",
    age: 30,
    gender: "Female",
    appointmentDate: "2025-04-21",
    diagnosis: "Diabetes",
    doctorName: "Dr. B. Verma",
  },
  {
    id: "p003",
    name: "Rohan Mehta",
    age: 27,
    gender: "Male",
    appointmentDate: "2025-04-22",
    diagnosis: "Migraine",
    doctorName: "Dr. A. Sharma",
  },
];