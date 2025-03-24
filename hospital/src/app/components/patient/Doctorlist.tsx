"use client"
import Image from "next/image";
// import prisma from "@/app/lib/prisma";
import React from "react";

interface Doctor {
    id: string;
    name: string;
    // department: string;
  }
  
  interface DoctorlistProps {
    doctors: Doctor[];
  }  
  
  const Doctorlist: React.FC<DoctorlistProps> = ({ doctors }) => {
   
      console.log(doctors)
    

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center p-6">
   
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {doctors.map((doctor) => (
              <Doctorcard key={doctor.id} doctor={doctor} />
            ))}
          </div>       
   
  </div>
);
};

export default Doctorlist;



export const Doctorcard = ({doctor}: {doctor: Doctor}) => {
   
    const { name } = doctor;
    return (
        <div>
             <div className="bg-gradient-to-r from-blue-900 to-gray-900 text-white p-4 rounded-2xl shadow-lg w-80">
      <Image
        src="/Doctor.png"
        alt="Doctor Image"
        width={90}
        height={90}
        className=" mx-auto"
      />
      
        <h2 className="text-xl font-semibold text-center mt-2">{name}</h2>
                <p className="text-center text-gray-400">{ doctor.department}</p>
      <div className="mt-3">
        <p className="text-sm mx-[60px]">  Mon - Fri, 9 AM - 5 PM</p>
       
      </div>
      <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
        Book Appointment
      </button>
    </div>
        </div>
    )
}
