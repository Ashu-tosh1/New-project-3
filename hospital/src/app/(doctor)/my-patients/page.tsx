"use client";
import React from "react";

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
const attendedPatients: AttendedPatient[] = [
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

const AttendedPatients = () => {
  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Sidebar for Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 p-4 shadow-md">
        <h2 className="text-xl font-bold mb-6 text-blue-700">Navigation</h2>
        <ul className="space-y-4 text-gray-700 font-medium">
          <li className="hover:text-blue-600 cursor-pointer">Dashboard</li>
          <li className="hover:text-blue-600 cursor-pointer">Appointments</li>
          <li className="hover:text-blue-600 cursor-pointer">Reports</li>
          <li className="hover:text-blue-600 cursor-pointer">Prescriptions</li>
          <li className="hover:text-blue-600 cursor-pointer">Settings</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Patients Attended
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attendedPatients.map((patient) => (
            <div
              key={patient.id}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-200"
            >
              <h2 className="text-xl font-bold text-blue-700 mb-2">
                {patient.name}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Age:</span> {patient.age}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Gender:</span> {patient.gender}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Appointment:</span>{" "}
                {patient.appointmentDate}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Diagnosis:</span>{" "}
                {patient.diagnosis}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Doctor:</span>{" "}
                {patient.doctorName}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AttendedPatients;
