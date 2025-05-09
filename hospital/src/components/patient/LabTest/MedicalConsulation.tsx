"use client"
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Calendar,
  FileUp,
  FileText,
  Stethoscope,
  PieChart,
  Pill,
  Upload,
  ClipboardList,
  User,
  MapPin,
  ChevronRight,
  Clock
} from 'lucide-react';

// Import Step components
import Step1_Medical from "./Step1_Medical";
import Step2_Medical from "./Step2_Medical";

// Define our types
type AppointmentDetails = {
  id: string;
  patientName: string;
  doctorName: string;
  doctorSpecialty: string;
  appointmentDate: string;
  appointmentTime: string;
  location: string;
  status: string;
  symptoms?: string[];
  recommendedTests?: TestType[];
  testResults?: string;
  medications?: Medication[];
};

type TestType = {
  name: string;
  description: string;
};

type Medication = {
  name: string;
  dosage: string;
  instructions: string;
};

const AppointmentDetails = () => {
  const params = useParams();
  const appointmentId = params?.AppointmentId;

  console.log(appointmentId);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [appointment, setAppointment] = useState<AppointmentDetails | null>(null);
  const [testReport, setTestReport] = useState<File | null>(null);
  
  // Add state to control steps
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>("");

  // Function to go to next step
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Function to go to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Fetch appointment data
  useEffect(() => {
    const fetchAppointmentData = async () => {
      if (!appointmentId) {
        setError("No appointment ID provided");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch(`/api/appointments/${appointmentId}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch appointment data");
        }
        
        const data = await response.json();
        setAppointment(data);
      } catch (err) {
        setError("Error fetching appointment details. Using mock data instead.");
        
        // Fallback to mock data for demonstration
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
          recommendedTests: [
            { name: "Complete Blood Count", description: "Basic blood test to check overall health" },
            { name: "Liver Function Test", description: "To check liver health and function" },
            { name: "Lipid Profile", description: "To measure cholesterol levels and other fats in the blood" }
          ],
          testResults: "Blood glucose: 110 mg/dL\nHemoglobin: 14.5 g/dL\nWBC: 7,500/mcL\nPlatelets: 250,000/mcL\nLDL Cholesterol: 130 mg/dL\nHDL Cholesterol: 45 mg/dL\nTriglycerides: 150 mg/dL",
          medications: [
            { name: "Amoxicillin", dosage: "500mg", instructions: "Take 3 times daily after meals for 7 days" },
            { name: "Paracetamol", dosage: "650mg", instructions: "Take when needed for fever or pain, max 4 tablets per day" },
            { name: "Vitamin D", dosage: "1000 IU", instructions: "Take once daily with food" }
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointmentData();
  }, [appointmentId]);

  // Handle test report upload
  const handleTestReportUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setTestReport(file);
      
      try {
        // In a real app, you would upload the file to your server
        const formData = new FormData();
        formData.append('file', file);
        formData.append('appointmentId', appointmentId || '');
        
        // Replace with your actual API endpoint
        const response = await fetch('/api/upload-report', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error("Failed to upload test report");
        }
        
        // Update appointment with new test results (in a real app, this would come from the server)
        if (appointment) {
          setAppointment({
            ...appointment,
            testResults: "Blood glucose: 110 mg/dL\nHemoglobin: 14.5 g/dL\nWBC: 7,500/mcL\nPlatelets: 250,000/mcL\nLDL Cholesterol: 130 mg/dL\nHDL Cholesterol: 45 mg/dL\nTriglycerides: 150 mg/dL"
          });
        }
      } catch (err) {
        console.error("Error uploading test report:", err);
      }
    }
  };

  // Handle adding symptoms
  const handleAddSymptom = (symptom: string) => {
    if (symptom.trim() !== "" && !symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
    }
  };

  // Handle removing symptoms
  const handleRemoveSymptom = (symptomToRemove: string) => {
    setSymptoms(symptoms.filter(symptom => symptom !== symptomToRemove));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <span className="text-lg font-medium text-gray-700">Loading appointment details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error && !appointment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.history.back()}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Go Back to Appointments
          </button>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return null;
  }

  // Step 1: Welcome screen
  const renderStep1 = () => {
    return (
      <div className="text-center">
        <div className="mb-6">
          <div className="bg-blue-100 rounded-full p-4 inline-block">
            <Calendar className="text-blue-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">Welcome to Your Appointment</h2>
          <p className="text-gray-600">Please complete the following steps for your visit with {appointment.doctorName}</p>
        </div>
        
        <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <Calendar size={20} className="text-blue-600 mt-1 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-medium text-gray-800">{appointment.appointmentDate} • {appointment.appointmentTime}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Stethoscope size={20} className="text-blue-600 mt-1 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Doctor</p>
                <p className="font-medium text-gray-800">{appointment.doctorName}</p>
                <p className="text-sm text-gray-500">{appointment.doctorSpecialty}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <User size={20} className="text-blue-600 mt-1 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Patient</p>
                <p className="font-medium text-gray-800">{appointment.patientName}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin size={20} className="text-blue-600 mt-1 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-800">{appointment.location}</p>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={nextStep}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center mx-auto"
        >
          Continue to Symptoms <ChevronRight size={18} className="ml-2" />
        </button>
      </div>
    );
  };

  // Step 2: Symptoms and notes
  const renderStep2 = () => {
    return (
      <div>
        <Step2_Medical nextStep={nextStep} prevStep={prevStep} />
      </div>
    );
  };
  
 

  // Step 3: Recommended Tests
  const renderStep3 = () => {
    return (
      <div>
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Stethoscope className="text-blue-600 mr-2" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Recommended Tests</h2>
          </div>
          
          <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
            {appointment.recommendedTests && appointment.recommendedTests.length > 0 ? (
              <div className="space-y-3">
                {appointment.recommendedTests.map((test, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
                    <h3 className="font-bold text-gray-800">{test.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{test.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="mb-3 text-gray-400">
                  <Stethoscope size={32} className="mx-auto" />
                </div>
                <p className="text-gray-600">No tests have been recommended yet.</p>
                <p className="text-sm text-gray-500 mt-1">The doctor will review your symptoms and provide recommendations.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between">
          <button 
            onClick={prevStep}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Back
          </button>
          
          <button 
            onClick={nextStep}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
          >
            Continue to Upload Results <ChevronRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
    );
  };

  // Step 4: Upload Test Results
  const renderStep4 = () => {
    return (
      <div>
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Upload className="text-blue-600 mr-2" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Upload Test Results</h2>
          </div>
          
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition duration-300">
              <input 
                type="file" 
                id="testReport"
                onChange={handleTestReportUpload}
                className="hidden"
              />
              <label htmlFor="testReport" className="cursor-pointer">
                <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-gray-600">Click to upload or drag and drop your test reports</p>
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (max. 10MB)</p>
              </label>
              {testReport && (
                <div className="mt-4 p-3 bg-green-50 rounded flex items-center">
                  <FileText size={18} className="text-green-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">{testReport.name}</span>
                </div>
              )}
            </div>
          </div>
          
          {appointment.testResults && (
            <div className="mt-6">
              <div className="flex items-center mb-4">
                <PieChart className="text-blue-600 mr-2" size={24} />
                <h3 className="font-bold text-gray-800">Test Results Summary</h3>
              </div>
              
              <div className="bg-gray-50 p-4 rounded border border-gray-200 font-mono text-sm whitespace-pre-line">
                {appointment.testResults}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-between">
          <button 
            onClick={prevStep}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Back
          </button>
          
          <button 
            onClick={nextStep}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
          >
            View Medications <ChevronRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
    );
  };

  // Step 5: Medications
  const renderStep5 = () => {
    return (
      <div>
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Pill className="text-blue-600 mr-2" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Prescribed Medications</h2>
          </div>
          
          <div className="space-y-4">
            {appointment.medications && appointment.medications.length > 0 ? (
              appointment.medications.map((med, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-green-500 shadow-sm">
                  <h4 className="font-bold text-lg text-gray-800">{med.name}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    <div>
                      <p className="text-sm text-gray-500">Dosage</p>
                      <p className="font-medium text-gray-700">{med.dosage}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Instructions</p>
                      <p className="font-medium text-gray-700">{med.instructions}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="mb-3 text-gray-400">
                  <Pill size={32} className="mx-auto" />
                </div>
                <p className="text-gray-600">No medications have been prescribed yet.</p>
                <p className="text-sm text-gray-500 mt-1">The doctor will review your test results and symptoms before prescribing.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-between mt-6">
          <button 
            onClick={prevStep}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Back
          </button>
          
          <div className="flex gap-3">
            <button 
              onClick={() => window.history.back()}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center"
            >
              Back to Appointments
            </button>
            
            {appointment.status === "scheduled" && (
              <button 
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Cancel Appointment
              </button>
            )}
            
            {appointment.medications && appointment.medications.length > 0 && (
              <button 
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 flex items-center"
              >
                Download Prescription <FileText size={18} className="ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render content based on current step
  const renderContent = () => {
    switch(currentStep) {
      case 0:
        return renderStep1();
      case 1:
        return renderStep2();
      case 2:
        return renderStep3();
      case 3:
        return renderStep4();
      case 4:
        return renderStep5();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center mb-4">
            <Stethoscope size={28} className="mr-2" />
            <h1 className="text-2xl font-bold">MediConsult</h1>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Appointment #{appointment.id}</h2>
              <div className="mt-1 text-blue-100 flex items-center">
                <Calendar size={16} className="mr-1" />
                <span>{appointment.appointmentDate} • {appointment.appointmentTime}</span>
              </div>
            </div>
            <div className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Step indicator */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center justify-between mb-2">
              <div className="flex items-center flex-wrap">
                <div className={`rounded-full w-8 h-8 flex items-center justify-center ${currentStep >= 0 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
                <div className={`h-1 w-8 mx-1 ${currentStep >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`rounded-full w-8 h-8 flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
                <div className={`h-1 w-8 mx-1 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`rounded-full w-8 h-8 flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>3</div>
                <div className={`h-1 w-8 mx-1 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`rounded-full w-8 h-8 flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>4</div>
                <div className={`h-1 w-8 mx-1 ${currentStep >= 4 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`rounded-full w-8 h-8 flex items-center justify-center ${currentStep >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>5</div>
              </div>
              <div className="text-sm text-gray-600 mt-2 md:mt-0">
                Step {currentStep + 1} of 5
              </div>
            </div>
            <div className="hidden md:flex text-xs text-gray-500 justify-between px-1">
              <span>Welcome</span>
              <span>Symptoms</span>
              <span>Tests</span>
              <span>Results</span>
              <span>Medications</span>
            </div>
          </div>
          
          {/* Render step content */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;



// "use client"
// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import {
//   Calendar,
//   FileUp,
//   FileText,
//   Stethoscope,
//   PieChart,
//   Pill,
//   Upload,
//   ClipboardList,
//   User,
//   MapPin,
//   ChevronRight,
//   Clock
// } from 'lucide-react';

// // Import Step1 and Step2 components
// import Step1_Medical from "./Step1_Medical";
// import Step2_Medical from "./Step2_Medical";

// // Define our types
// type AppointmentDetails = {
//   id: string;
//   patientName: string;
//   doctorName: string;
//   doctorSpecialty: string;
//   appointmentDate: string;
//   appointmentTime: string;
//   location: string;
//   status: string;
//   symptoms?: string[];
//   recommendedTests?: TestType[];
//   testResults?: string;
//   medications?: Medication[];
// };

// type TestType = {
//   name: string;
//   description: string;
// };

// type Medication = {
//   name: string;
//   dosage: string;
//   instructions: string;
// };

// const AppointmentDetails = () => {
//   const params = useParams();
//   const appointmentId = params?.AppointmentId;

//   console.log(appointmentId);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [appointment, setAppointment] = useState<AppointmentDetails | null>(null);
//   const [testReport, setTestReport] = useState<File | null>(null);
  
//   // Add state to control steps
//   const [currentStep, setCurrentStep] = useState<number>(0);

//   // Function to go to next step
//   const nextStep = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   // Fetch appointment data
//   useEffect(() => {
//     const fetchAppointmentData = async () => {
//       if (!appointmentId) {
//         setError("No appointment ID provided");
//         setIsLoading(false);
//         return;
//       }

//       try {
//         setIsLoading(true);
//         // Replace with your actual API endpoint
//         const response = await fetch(`/api/appointments/${appointmentId}`);
        
//         if (!response.ok) {
//           throw new Error("Failed to fetch appointment data");
//         }
        
//         const data = await response.json();
//         setAppointment(data);
//       } catch (err) {
//         setError("Error fetching appointment details. Using mock data instead.");
        
//         // Fallback to mock data for demonstration
//         setAppointment({
//           id: appointmentId || "AP12345",
//           patientName: "John Doe",
//           doctorName: "Dr. Emily Smith",
//           doctorSpecialty: "Cardiologist",
//           appointmentDate: "May 10, 2025",
//           appointmentTime: "10:30 AM",
//           location: "Medical Center, Room 305",
//           status: "scheduled",
//           symptoms: ["Chest pain", "Shortness of breath", "Fatigue"],
//           recommendedTests: [
//             { name: "Complete Blood Count", description: "Basic blood test to check overall health" },
//             { name: "Liver Function Test", description: "To check liver health and function" },
//             { name: "Lipid Profile", description: "To measure cholesterol levels and other fats in the blood" }
//           ],
//           testResults: "Blood glucose: 110 mg/dL\nHemoglobin: 14.5 g/dL\nWBC: 7,500/mcL\nPlatelets: 250,000/mcL\nLDL Cholesterol: 130 mg/dL\nHDL Cholesterol: 45 mg/dL\nTriglycerides: 150 mg/dL",
//           medications: [
//             { name: "Amoxicillin", dosage: "500mg", instructions: "Take 3 times daily after meals for 7 days" },
//             { name: "Paracetamol", dosage: "650mg", instructions: "Take when needed for fever or pain, max 4 tablets per day" },
//             { name: "Vitamin D", dosage: "1000 IU", instructions: "Take once daily with food" }
//           ]
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAppointmentData();
//   }, [appointmentId]);

//   // Handle test report upload
//   const handleTestReportUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];
//       setTestReport(file);
      
//       try {
//         // In a real app, you would upload the file to your server
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('appointmentId', appointmentId || '');
        
//         // Replace with your actual API endpoint
//         const response = await fetch('/api/upload-report', {
//           method: 'POST',
//           body: formData,
//         });
        
//         if (!response.ok) {
//           throw new Error("Failed to upload test report");
//         }
        
//         // Update appointment with new test results (in a real app, this would come from the server)
//         if (appointment) {
//           setAppointment({
//             ...appointment,
//             testResults: "Blood glucose: 110 mg/dL\nHemoglobin: 14.5 g/dL\nWBC: 7,500/mcL\nPlatelets: 250,000/mcL\nLDL Cholesterol: 130 mg/dL\nHDL Cholesterol: 45 mg/dL\nTriglycerides: 150 mg/dL"
//           });
//         }
//       } catch (err) {
//         console.error("Error uploading test report:", err);
//       }
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
//         <div className="bg-white p-8 rounded-xl shadow-xl">
//           <div className="flex items-center space-x-3">
//             <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
//             <span className="text-lg font-medium text-gray-700">Loading appointment details...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error && !appointment) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
//         <div className="bg-white p-8 rounded-xl shadow-xl text-center">
//           <div className="text-red-500 text-5xl mb-4">⚠️</div>
//           <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
//           <p className="text-gray-600">{error}</p>
//           <button 
//             onClick={() => window.history.back()}
//             className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
//           >
//             Go Back to Appointments
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!appointment) {
//     return null;
//   }

//   // Render appointment steps or full details based on current step
//   const renderContent = () => {
//     switch(currentStep) {
//       case 0:
//         return <Step1_Medical nextStep={nextStep} appointmentId={appointmentId} />;
//       case 1:
//         return <Step2_Medical nextStep={nextStep} />;
//       case 2:
//         return renderAppointmentDetails();
//       default:
//         return renderAppointmentDetails();
//     }
//   };

//   const renderAppointmentDetails = () => {
//     return (
//       <>
//         {/* Appointment Information */}
//         <div className="mb-8">
//           <div className="flex items-center mb-4">
//             <Calendar className="text-blue-600 mr-2" size={24} />
//             <h2 className="text-xl font-bold text-gray-800">Appointment Details</h2>
//           </div>
          
//           <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <div className="flex items-start mb-4">
//                   <User size={20} className="text-blue-600 mt-1 mr-2" />
//                   <div>
//                     <p className="text-sm text-gray-500">Patient</p>
//                     <p className="font-medium text-gray-800">{appointment.patientName}</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start mb-4">
//                   <Calendar size={20} className="text-blue-600 mt-1 mr-2" />
//                   <div>
//                     <p className="text-sm text-gray-500">Date & Time</p>
//                     <p className="font-medium text-gray-800">{appointment.appointmentDate} • {appointment.appointmentTime}</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div>
//                 <div className="flex items-start mb-4">
//                   <Stethoscope size={20} className="text-blue-600 mt-1 mr-2" />
//                   <div>
//                     <p className="text-sm text-gray-500">Doctor</p>
//                     <p className="font-medium text-gray-800">{appointment.doctorName}</p>
//                     <p className="text-sm text-gray-500">{appointment.doctorSpecialty}</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start">
//                   <MapPin size={20} className="text-blue-600 mt-1 mr-2" />
//                   <div>
//                     <p className="text-sm text-gray-500">Location</p>
//                     <p className="font-medium text-gray-800">{appointment.location}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Symptoms */}
//         {appointment.symptoms && (
//           <div className="mb-8">
//             <div className="flex items-center mb-4">
//               <ClipboardList className="text-blue-600 mr-2" size={24} />
//               <h2 className="text-xl font-bold text-gray-800">Symptoms</h2>
//             </div>
            
//             <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-100">
//               <ul className="space-y-2">
//                 {appointment.symptoms.map((symptom, index) => (
//                   <li key={index} className="flex items-center">
//                     <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
//                     <span className="text-gray-700">{symptom}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}
        
//         {/* Recommended Tests */}
//         {appointment.recommendedTests && (
//           <div className="mb-8">
//             <div className="flex items-center mb-4">
//               <Stethoscope className="text-blue-600 mr-2" size={24} />
//               <h2 className="text-xl font-bold text-gray-800">Recommended Tests</h2>
//             </div>
            
//             <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
//               <div className="space-y-3">
//                 {appointment.recommendedTests.map((test, index) => (
//                   <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
//                     <h3 className="font-bold text-gray-800">{test.name}</h3>
//                     <p className="text-sm text-gray-600 mt-1">{test.description}</p>
//                   </div>
//                 ))}
//               </div>
              
//               <div className="mt-6 bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
//                 <div className="flex items-center mb-4">
//                   <Upload className="text-gray-700 mr-2" size={20} />
//                   <h3 className="font-bold text-gray-800">Upload Test Reports</h3>
//                 </div>
                
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition duration-300">
//                   <input 
//                     type="file" 
//                     id="testReport"
//                     onChange={handleTestReportUpload}
//                     className="hidden"
//                   />
//                   <label htmlFor="testReport" className="cursor-pointer">
//                     <FileUp className="mx-auto h-12 w-12 text-gray-400" />
//                     <p className="mt-2 text-gray-600">Click to upload or drag and drop your test reports</p>
//                     <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (max. 10MB)</p>
//                   </label>
//                   {testReport && (
//                     <div className="mt-4 p-3 bg-green-50 rounded flex items-center">
//                       <FileText size={18} className="text-green-600 mr-2" />
//                       <span className="text-sm font-medium text-gray-700">{testReport.name}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
        
//         {/* Test Results */}
//         {appointment.testResults && (
//           <div className="mb-8">
//             <div className="flex items-center mb-4">
//               <PieChart className="text-blue-600 mr-2" size={24} />
//               <h2 className="text-xl font-bold text-gray-800">Test Results</h2>
//             </div>
            
//             <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
//               <h3 className="font-bold text-gray-800 mb-3 flex items-center">
//                 <FileText size={18} className="text-blue-600 mr-2" />
//                 Results Summary
//               </h3>
//               <div className="bg-gray-50 p-4 rounded border border-gray-200 font-mono text-sm whitespace-pre-line">
//                 {appointment.testResults}
//               </div>
//             </div>
//           </div>
//         )}
        
//         {/* Medications */}
//         {appointment.medications && (
//           <div className="mb-8">
//             <div className="flex items-center mb-4">
//               <Pill className="text-blue-600 mr-2" size={24} />
//               <h2 className="text-xl font-bold text-gray-800">Prescribed Medications</h2>
//             </div>
            
//             <div className="space-y-4">
//               {appointment.medications.map((med, index) => (
//                 <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-green-500 shadow-sm">
//                   <h4 className="font-bold text-lg text-gray-800">{med.name}</h4>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
//                     <div>
//                       <p className="text-sm text-gray-500">Dosage</p>
//                       <p className="font-medium text-gray-700">{med.dosage}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Instructions</p>
//                       <p className="font-medium text-gray-700">{med.instructions}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
        
//         {/* Actions */}
//         <div className="flex flex-wrap gap-3 justify-end mt-6">
//           <button 
//             onClick={() => window.history.back()}
//             className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center"
//           >
//             Back to Appointments
//           </button>
          
//           {appointment.status === "scheduled" && (
//             <button 
//               className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
//             >
//               Cancel Appointment
//             </button>
//           )}
          
//           {appointment.medications && (
//             <button 
//               className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 flex items-center"
//             >
//               Download Prescription <FileText size={18} className="ml-2" />
//             </button>
//           )}
//         </div>
//       </>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
//           <div className="flex items-center mb-4">
//             <Stethoscope size={28} className="mr-2" />
//             <h1 className="text-2xl font-bold">MediConsult</h1>
//           </div>
//           <div className="flex justify-between items-center">
//             <div>
//               <h2 className="text-xl font-semibold">Appointment #{appointment.id}</h2>
//               <div className="mt-1 text-blue-100 flex items-center">
//                 <Calendar size={16} className="mr-1" />
//                 <span>{appointment.appointmentDate} • {appointment.appointmentTime}</span>
//               </div>
//             </div>
//             <div className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
//               {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
//             </div>
//           </div>
//         </div>
        
//         {/* Content */}
//         <div className="p-6">
//           {/* Step indicator */}
//           {currentStep < 2 && (
//             <div className="mb-6">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <div className={`rounded-full w-8 h-8 flex items-center justify-center ${currentStep >= 0 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
//                   <div className={`h-1 w-12 mx-2 ${currentStep >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
//                   <div className={`rounded-full w-8 h-8 flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
//                   <div className={`h-1 w-12 mx-2 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
//                   <div className={`rounded-full w-8 h-8 flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>3</div>
//                 </div>
//                 <div className="text-sm text-gray-600">
//                   Step {currentStep + 1} of 3
//                 </div>
//               </div>
//             </div>
//           )}
          
//           {/* Render step content */}
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AppointmentDetails;