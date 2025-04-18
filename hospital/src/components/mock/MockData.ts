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
  