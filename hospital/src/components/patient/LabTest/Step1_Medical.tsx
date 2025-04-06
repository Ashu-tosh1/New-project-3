"use client"
import { Calendar, ChevronRight, Clock, User } from 'lucide-react'
import React, { useState } from 'react'


type Step1props={
nextStep :() =>void 
}

const Step1_Medical:React.FC<Step1props> = ( {nextStep}) => {
  

    const [patientInfo] = useState({
        name: "John Doe",
        age: 35,
        symptoms: "",
        medicalHistory: ""
      });

  return (
    <div className="animate-fadeIn">
              <div className="flex items-center mb-4">
                <Calendar className="text-blue-600 mr-2" size={24} />
                <h2 className="text-xl font-bold text-gray-800">Booking Confirmation</h2>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg mb-6 border-l-4 border-green-500">
                <div className="flex items-start">
                  <div className="bg-green-500 p-2 rounded-full text-white mr-4">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-green-800">Your appointment has been confirmed</h3>
                    <p className="text-green-700 mt-1">Dr. Emily Smith, Cardiologist</p>
                    <p className="text-green-700 mt-1">Today at 10:00 AM</p>
                    <p className="text-green-600 text-sm mt-2">Location: Virtual Consultation</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <div className="flex items-center mb-3">
                  <User size={20} className="text-blue-600 mr-2" />
                  <h3 className="font-bold text-gray-800">Patient Information</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 ml-2">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{patientInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="font-medium">{patientInfo.age} years</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Patient ID</p>
                    <p className="font-medium">PAT-20456-JD</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Insurance</p>
                    <p className="font-medium">BlueCross #12345</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={nextStep}
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center w-full sm:w-auto"
              >
                Begin Consultation <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
  )
}

export default Step1_Medical