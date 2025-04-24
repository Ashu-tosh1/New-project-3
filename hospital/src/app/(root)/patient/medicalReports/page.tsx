"use client"
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import PatientSidebar from "@/components/patient/PatientSidebar";

interface MedicalReport {
  id: string;
  reportName: string;
  date: string;
  doctor: string;
  downloadLink: string;
  viewLink: string;
}

const sampleReports: MedicalReport[] = [
  {
    id: "1",
    reportName: "Blood Test Report",
    date: "2025-04-20",
    doctor: "Dr. Sarah Thompson",
    downloadLink: "/reports/blood-test.pdf",
    viewLink: "/reports/blood-test.pdf",
  },
  {
    id: "2",
    reportName: "MRI Scan",
    date: "2025-03-15",
    doctor: "Dr. Anil Kapoor",
    downloadLink: "/reports/mri-scan.pdf",
    viewLink: "/reports/mri-scan.pdf",
  },
];

const PatientReports: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-100 flex">
          {/* Sidebar space */}
          
          <aside className="w-64 bg-white p-4 hidden md:block">
              <h1>Medical Reports</h1>
       <PatientSidebar/>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
            Your Medical Reports
          </h1>
          <div className="space-y-6">
            {sampleReports.map((report) => (
              <Card key={report.id} className="bg-white shadow-md rounded-2xl p-4">
                <CardContent className="flex flex-col sm:flex-row justify-between items-center">
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl font-semibold text-gray-800">{report.reportName}</h2>
                    <p className="text-sm text-gray-500">Date: {report.date}</p>
                    <p className="text-sm text-gray-500">Doctor: {report.doctor}</p>
                  </div>
                  <div className="mt-4 sm:mt-0 flex space-x-3">
                    <a href={report.viewLink} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="text-blue-700 border-blue-300">
                        <Eye className="w-4 h-4 mr-2" /> View
                      </Button>
                    </a>
                    <a href={report.downloadLink} download>
                      <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Download className="w-4 h-4 mr-2" /> Download
                      </Button>
                    </a>
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

export default PatientReports;
