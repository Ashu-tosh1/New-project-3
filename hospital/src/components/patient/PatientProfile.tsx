"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaVenusMars,
  FaHeartbeat,
  FaWeight,
  FaTint,
} from "react-icons/fa";
import { useUser } from "@clerk/nextjs";
import { Clerk } from "@clerk/clerk-sdk-node";
// import { User } from "@prisma/client";
import { getToken } from "@clerk/nextjs";
    
const PatientProfile: React.FC = () => {
  const { user } = useUser();
  const [patientData, setPatientData] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
      const fetchPatientData = async () => {
        console.log(user)
      try {
        const token = await getToken(); // Get Clerk session token
        if (!token) {
          console.error("No token found. User might be logged out.");
          return;
        }

        const res = await fetch("/api/patient-profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch patient profile");
        }

        const data = await res.json();
        setPatientData(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!patientData) {
    return <div className="flex justify-center items-center min-h-screen">Patient data not found.</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-100 text-white p-10">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden flex">
        {/* Left Section - Profile Details */}
        <div className="w-1/3 bg-gradient-to-br from-blue-900 to-blue-300 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg">
            <Image src="/Doctor.png" width={128} height={128} alt="Profile" className="object-cover" />
          </div>
          <h2 className="text-2xl font-bold mt-4">{patientData.name}</h2>
          <p className="text-lg">{patientData.age} years | {patientData.gender}</p>
          <button className="mt-6 bg-white text-blue-700 font-semibold px-6 py-2 rounded-full hover:bg-blue-100 transition">
            Edit Profile
          </button>
        </div>

        {/* Right Section - Info */}
        <div className="w-2/3 p-10 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center bg-gray-100 text-gray-800 p-3 rounded-lg">
              <FaEnvelope className="text-blue-600 mr-3" /> {patientData.email}
            </div>
            <div className="flex items-center bg-gray-100 text-gray-800 p-3 rounded-lg">
              <FaPhone className="text-blue-600 mr-3" /> {patientData.phone || "N/A"}
            </div>
            <div className="flex items-center bg-gray-100 text-gray-800 p-3 rounded-lg">
              <FaMapMarkerAlt className="text-blue-600 mr-3" /> {patientData.address || "N/A"}
            </div>
            <div className="flex items-center bg-gray-100 text-gray-800 p-3 rounded-lg">
              <FaVenusMars className="text-blue-600 mr-3" /> {patientData.gender}
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-blue-900 mt-6 mb-4">Health Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center bg-gray-100 text-gray-800 p-3 rounded-lg">
              <FaTint className="text-red-600 mr-3" /> Blood Group: {patientData.bloodGroup || "N/A"}
            </div>
            <div className="flex items-center bg-gray-100 text-gray-800 p-3 rounded-lg">
              <FaHeartbeat className="text-red-600 mr-3" /> Heart Rate: {patientData.heartRate || "N/A"} bpm
            </div>
            <div className="flex items-center bg-gray-100 text-gray-800 p-3 rounded-lg">
              <FaHeartbeat className="text-red-600 mr-3" /> Blood Pressure: {patientData.bloodPressure || "N/A"}
            </div>
            <div className="flex items-center bg-gray-100 text-gray-800 p-3 rounded-lg">
              <FaWeight className="text-red-600 mr-3" /> Weight: {patientData.weight || "N/A"} kg
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
