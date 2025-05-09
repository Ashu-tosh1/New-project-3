"use client"
import { ChevronRight, Clock, User, MapPin } from 'lucide-react'
import React, { useState, useEffect } from 'react'

interface Step1Props {
  nextStep: () => void;
  appointmentId: string;
}

const Step1_Medical: React.FC<Step1Props> = ({ nextStep, appointmentId }) => {
  const [appointment, setAppointment] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      if (!appointmentId) {
        setError("No appointment ID provided");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`/api/appointments/${appointmentId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch appointment data");
        }

        const data = await response.json();
        setAppointment(data);
      } catch (err) {
        setError("Error fetching appointment details. Using mock data instead.");
        setAppointment({
          id: appointmentId || "AP12345",
          patientName: "John Doe",
          doctorName: "Dr. Emily Smith",
          doctorSpecialty: "Cardiologist",
          appointmentDate: "May 10, 2025",
          appointmentTime: "10:30 AM",
          location: "Medical Center, Room 305",
          status: "scheduled",
          symptoms: ["Chest pain", "Shortness of breath", "Fatigue"],
          recommendedTests: [],
          testResults: "",
          medications: [],
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointmentData();
  }, [appointmentId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        <span className="ml-3 text-gray-700">Loading appointment details...</span>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {/* Display appointment info using appointment state */}
      <div className="mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg overflow-hidden shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Booking Confirmation</h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex flex-col space-y-4">
              <div className="text-xl font-semibold">
                Your appointment has been confirmed
              </div>
              <div className="flex items-center space-x-2">
                <User size={20} />
                <span>{appointment.doctorName}, {appointment.doctorSpecialty}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={20} />
                <span>{appointment.appointmentDate} at {appointment.appointmentTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={20} />
                <span>Location: {appointment.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Info */}
      <div className="mb-8 bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-800">Patient Information</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-gray-800">{appointment.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Appointment ID</p>
                <p className="font-medium text-gray-800">{appointment.id}</p>
              </div>
            </div>
            {/* Add more patient/insurance fields if available */}
          </div>
        </div>
      </div>

      {/* Begin Consultation Button */}
      <button 
        onClick={nextStep}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
      >
        Begin Consultation <ChevronRight size={18} className="ml-1" />
      </button>
    </div>
  );
};

export default Step1_Medical;
