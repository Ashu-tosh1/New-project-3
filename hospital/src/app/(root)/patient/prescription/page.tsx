"use client"
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";
import PatientSidebar from "@/components/patient/PatientSidebar";

import { samplePrescriptionsGrouped } from "@/components/mock/MockData";



const PrescriptionSection: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-100 flex">
        
          <aside className="w-64 bg-white p-4 hidden md:block">
          <h1>
          Prescription
      </h1>
       <PatientSidebar/>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
            Your Prescriptions
          </h1>
          <div className="space-y-6">
            {samplePrescriptionsGrouped.map((group) => (
              <Card key={group.id} className="bg-white shadow-md rounded-2xl p-4">
                <CardContent>
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">{group.doctor}</h2>
                    <p className="text-sm text-gray-500">Date: {group.date}</p>
                  </div>
                  <ul className="space-y-2">
                    {group.prescriptions.map((prescription, index) => (
                      <li key={index} className="border p-3 rounded-xl bg-blue-50">
                        <p className="text-gray-800 font-medium">{prescription.medicine}</p>
                        <p className="text-sm text-gray-600">Dosage: {prescription.dosage}</p>
                        <p className="text-sm text-gray-600">Frequency: {prescription.frequency}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 text-right">
                    <Button variant="outline" className="text-blue-700 border-blue-300">
                      <Clipboard className="w-4 h-4 mr-2" /> Copy All
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrescriptionSection;
