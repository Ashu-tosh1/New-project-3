"use client"
// import prisma from "@/app/lib/prisma";
import React, { useState } from "react";

interface Doctor {
    id: string;
    name: string;
    time: string;
  }
  
  interface DoctorlistProps {
    doctors: Doctor[];
  }  
  
  const Doctorlist: React.FC<DoctorlistProps> = ({ doctors }) => {
    const [appointment, setAppointment] = useState({
      doctor: "",
      date: "",
      time: "",
      reason: "",
    });
      console.log(doctors)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Appointment Booked:", appointment);
    alert("Appointment booked successfully!");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* <PatientSidebar /> */}
      <div className="flex-1 flex justify-center items-center">
        {/* <div>{paitent}</div> */}
        <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Book an Appointment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300">Select Doctor</label>
              <select
                name="doctor"
                value={appointment.doctor}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg bg-gray-700 text-white"
                required
              >
                {/* <option value="">Choose a doctor</option>
                {doctors.map((doc, index) => (
                  <option key={index} value={doc}>{doc}</option> */}
                {/* ))} */}
              </select>
            </div>

            <div>
              <label className="block text-gray-300">Select Date</label>
              <input
                type="date"
                name="date"
                value={appointment.date}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg bg-gray-700 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300">Select Time</label>
              <input
                type="time"
                name="time"
                value={appointment.time}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg bg-gray-700 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300">Reason for Visit</label>
              <textarea
                name="reason"
                value={appointment.reason}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg bg-gray-700 text-white"
                rows={3}
                placeholder="Describe your symptoms or reason for visit"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Doctorlist;