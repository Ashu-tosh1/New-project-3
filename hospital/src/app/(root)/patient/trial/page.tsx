"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const doctors = [
  {
    id: 1,
    name: "Dr. Ashmita Singh",
    specialty: "Cardiologist",
    experience: "20 years",
    email: "ashmita.singh@example.com",
    image: "/Doctor1.png",
    hospital: "Apollo Hospital, New Delhi",
    rating: 4.8,
    fee: "Rs1000 per consultation",
    slots: {
      "2025-04-05": ["10:00 AM", "2:00 PM", "4:00 PM"],
      "2025-04-06": ["9:00 AM", "1:00 PM", "3:00 PM"],
    },
  },
  {
    id: 2,
    name: "Dr. Rohit Sharma",
    specialty: "Endocrinologist",
    experience: "18 years",
    email: "rohit.sharma@example.com",
    image: "/doctor2.jpg",
    hospital: "Fortis Hospital, Mumbai",
    rating: 4.6,
    fee: "Rs100 per consultation",
    slots: {
      "2025-04-07": ["11:00 AM", "3:00 PM", "5:00 PM"],
    },
  },
];

export default function DoctorList() {
  const router = useRouter();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedDate(null);
    setAvailableSlots([]);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split("T")[0];
    setAvailableSlots(selectedDoctor?.slots[formattedDate] || []);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-purple-800 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Find Your Specialist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {doctors.map((doctor) => (
          <motion.div
            key={doctor.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white text-black p-4 rounded-lg shadow-lg cursor-pointer"
            onClick={() => handleDoctorClick(doctor)}
          >
            <img src={doctor.image} className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-center">{doctor.name}</h2>
            <p className="text-center text-gray-600">{doctor.specialty}</p>
          </motion.div>
        ))}
      </div>

      {selectedDoctor && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-white text-black rounded-lg shadow-lg"
        >
          <h2 className="text-3xl font-semibold">{selectedDoctor.name}</h2>
          <p className="text-lg text-gray-700">{selectedDoctor.specialty}</p>
          <p className="text-md text-gray-500">{selectedDoctor.experience} Experience</p>
          <p className="text-md text-gray-700">Email: {selectedDoctor.email}</p>
          <p className="text-md text-gray-700">Hospital: {selectedDoctor.hospital}</p>
          <p className="text-md text-gray-700">Consultation Fee: {selectedDoctor.fee}</p>
          <p className="mt-2 text-yellow-500 font-bold">⭐ {selectedDoctor.rating}/5</p>
          <Calendar onChange={handleDateChange} />
          {selectedDate && (
            <div className="mt-4">
              <h3 className="font-semibold">Available Slots:</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {availableSlots.length > 0 ? (
                  availableSlots.map((slot, index) => (
                    <Button key={index} variant="outline" className="border-blue-600 text-blue-600">
                      {slot}
                    </Button>
                  ))
                ) : (
                  <p className="text-gray-500">No slots available for this date</p>
                )}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
