"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

async function fetchDoctors() {
  const res = await fetch("/api/doctor");
  if (!res.ok) throw new Error("Failed to load doctors");
  return res.json();
}

const Doctorlist = () => {
  const { data: doctors, error, isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
  });
console.log(doctors)
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [hoveredDoctor, setHoveredDoctor] = useState(null);

  if (isLoading) return <p className="text-center text-lg text-green-700 font-semibold">Loading doctors...</p>;
  if (error) return <p className="text-center text-lg text-red-700 font-semibold">Error fetching doctors</p>;

  const filteredDoctors = doctors.filter(
    (doctor: any) =>
      doctor.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-green-100 text-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-8 text-green-700">Find Your Specialist</h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by doctor name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/3 p-3 rounded-lg bg-white border border-green-300 text-gray-900 placeholder-gray-500 shadow-sm"
          />
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full sm:w-1/4 p-3 rounded-lg bg-white border border-green-300 text-gray-900 shadow-sm"
          >
            <option value="">Filter by Specialty</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Endocrinologist">Endocrinologist</option>
            <option value="Pulmonologist">Pulmonologist</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor: any) => (
              <div
                key={doctor.id}
                className="relative bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center transition duration-300 hover:shadow-xl"
                onMouseEnter={() => setHoveredDoctor(doctor.id)}
                onMouseLeave={() => setHoveredDoctor(null)}
              >
                <Image
                        src={doctor.image || "/fallback.png"}
                        width={10}
                        height={10}
                  alt={doctor.user.name}
                  className="w-24 h-24 rounded-full mb-3 border border-gray-300"
                />
                <h2 className="text-xl font-semibold text-gray-800">{doctor.user.name}</h2>
                <p className="text-sm text-gray-600">{doctor.department}</p>
                {/* <p className="text-sm text-gray-500">{doctor.experience} Experience</p> */}

                {hoveredDoctor === doctor.id && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-52 bg-white border border-gray-300 rounded-md shadow-lg p-3 text-sm">
                    <p className="font-semibold text-center mb-2">Availability This Month:</p>
                    <div className="grid grid-cols-7 gap-1 text-xs text-gray-700">
                      {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                        <div
                          key={day}
                          className={`w-6 h-6 flex items-center justify-center rounded ${
                            doctor.availability ? "bg-green-500 text-white font-bold" : "bg-gray-100"
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-lg text-green-700 font-semibold">No doctors found. Try another search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctorlist;
