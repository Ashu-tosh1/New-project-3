"use client"
import React, { useState } from "react";
import {Calendar,FileUp,FileText,Stethoscope,PieChart,Pill,ChevronRight,Upload,ClipboardList,User} from 'lucide-react';
import Step1_Medical from "./Step1_Medical";
import Step2_Medical from "./Step2_Medical";

// Define our types
type TestType = {
  name: string;
  description: string;
};

type Medication = {
  name: string;
  dosage: string;
  instructions: string;
};


const MedicalConsulation = () => {

  // Track the current step in the workflow
  const [currentStep, setCurrentStep] = useState(1);
  
  // Patient information state
  // const [patientInfo, setPatientInfo] = useState({
  //   name: "John Doe",
  //   age: 35,
  //   symptoms: "",
  //   medicalHistory: ""
  // });
  
  // Medical workflow states
  const [recommendedTests, setRecommendedTests] = useState<TestType[]>([]);
  const [testReport, setTestReport] = useState<File | null>(null);
 
  const [testResults, setTestResults] = useState<string>("");
  const [medications, setMedications] = useState<Medication[]>([]);
  
  // Handle symptom input

  
  // Move to next step in the workflow
  const nextStep = () => {
    if (currentStep === 2) {
      // After symptoms, doctor assigns tests
      setRecommendedTests([
        { name: "Complete Blood Count", description: "Basic blood test to check overall health" },
        { name: "Liver Function Test", description: "To check liver health and function" },
        { name: "Lipid Profile", description: "To measure cholesterol levels and other fats in the blood" }
      ]);
    }
    
    if (currentStep === 4) {
      // After test results are analyzed, doctor prescribes medications
      setMedications([
        { name: "Amoxicillin", dosage: "500mg", instructions: "Take 3 times daily after meals for 7 days" },
        { name: "Paracetamol", dosage: "650mg", instructions: "Take when needed for fever or pain, max 4 tablets per day" },
        { name: "Vitamin D", dosage: "1000 IU", instructions: "Take once daily with food" }
      ]);
    }
    
    setCurrentStep(currentStep + 1);
  };
  
  // Handle test report upload
  const handleTestReportUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setTestReport(e.target.files[0]);
      // Simulate test results being extracted from the report
      setTestResults("Blood glucose: 110 mg/dL\nHemoglobin: 14.5 g/dL\nWBC: 7,500/mcL\nPlatelets: 250,000/mcL\nLDL Cholesterol: 130 mg/dL\nHDL Cholesterol: 45 mg/dL\nTriglycerides: 150 mg/dL");
    }
  };

  // Handle previous medical file upload

  
  // Render step icon based on step number
  const renderStepIcon = (step: number) => {
    switch(step) {
      case 1: return <Calendar size={20} />;
      case 2: return <ClipboardList size={20} />;
      case 3: return <Stethoscope size={20} />;
      case 4: return <PieChart size={20} />;
      case 5: return <Pill size={20} />;
      default: return null;
    }
  };




    return (
        <div>
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center mb-4">
            <Stethoscope size={28} className="mr-2" />
            <h1 className="text-2xl font-bold">MediConsult</h1>
          </div>
          <div className="flex justify-between mt-6">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-white text-blue-600' : 'bg-blue-400 text-white'} transition-all duration-300`}>
                  {renderStepIcon(step)}
                </div>
                <div className="mt-2 text-xs font-medium text-blue-100">
                  {step === 1 && "Booking"}
                  {step === 2 && "Symptoms"}
                  {step === 3 && "Tests"}
                  {step === 4 && "Analysis"}
                  {step === 5 && "Medication"}
                </div>
                {step < 5 && <div className={`h-0.5 w-16 hidden sm:block absolute translate-x-12 ${currentStep > step ? 'bg-white' : 'bg-blue-400'}`}></div>}
              </div>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Step 1: Booking Confirmation */}
          {currentStep === 1 && (
                <Step1_Medical nextStep={nextStep} />
          )}
          
          {/* Step 2: Symptom Assessment with enhanced design */}
          {currentStep === 2 && (
            <Step2_Medical nextStep={nextStep} />
          )}
          
          {/* Step 3: Test Recommendation */}
          {currentStep === 3 && (
            <div className="animate-fadeIn">
              <div className="flex items-center mb-6">
                <Stethoscope className="text-blue-600 mr-2" size={24} />
                <h2 className="text-xl font-bold text-gray-800">Recommended Tests</h2>
              </div>
              
              <div className="mb-6 bg-blue-50 p-5 rounded-lg border border-blue-100">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600 mr-3">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Doctor&apos;s Recommendation</h3>
                    <p className="text-gray-600 mt-1">Based on your symptoms, Dr. Smith recommends the following tests:</p>
                  </div>
                </div>
                
                <div className="space-y-3 mt-4">
                  {recommendedTests.map((test, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
                      <h3 className="font-bold text-gray-800">{test.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{test.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center mb-4">
                  <Upload className="text-gray-700 mr-2" size={20} />
                  <h3 className="font-bold text-gray-800">Upload Test Reports</h3>
                </div>
                
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
              
              <button 
                onClick={nextStep}
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center disabled:bg-gray-400"
                disabled={!testReport}
              >
                Submit Reports <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
          )}
          
          {/* Step 4: Test Analysis */}
          {currentStep === 4 && (
            <div className="animate-fadeIn">
              <div className="flex items-center mb-6">
                <PieChart className="text-blue-600 mr-2" size={24} />
                <h2 className="text-xl font-bold text-gray-800">Test Results Analysis</h2>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm mb-6">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                  <FileText size={18} className="text-blue-600 mr-2" />
                  Test Results Summary
                </h3>
                <div className="bg-gray-50 p-4 rounded border border-gray-200 font-mono text-sm whitespace-pre-line">
                  {testResults}
                </div>
              </div>
              
              <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200 mb-6">
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-2 rounded-full text-yellow-700 mr-3">
                    <Stethoscope size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Doctor&apos;s Analysis</h3>
                    <p className="text-gray-600 mt-1">Your test results have been received and are being analyzed by Dr. Smith. The doctor will prescribe medications based on these results shortly.</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={nextStep}
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              >
                View Prescription <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
          )}
          
          {/* Step 5: Medication Prescription */}
          {currentStep === 5 && (
            <div className="animate-fadeIn">
              <div className="flex items-center mb-6">
                <Pill className="text-blue-600 mr-2" size={24} />
                <h2 className="text-xl font-bold text-gray-800">Your Prescription</h2>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600 mr-3">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Dr. Emily Smith, MD</h3>
                    <p className="text-sm text-gray-600">Cardiologist • Medical License #12345</p>
                    <p className="text-sm text-gray-600 mt-1">Prescription Date: April 6, 2025</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                  <Pill size={18} className="text-green-600 mr-2" />
                  Prescribed Medications
                </h3>
                
                <div className="space-y-4">
                  {medications.map((med, index) => (
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
                  ))}
                </div>
              </div>
              
              <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100 mb-6">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full text-indigo-600 mr-3">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Next Steps</h3>
                    <p className="text-gray-600 mt-1">Your medications have been sent to City Pharmacy and will be ready for pickup in 1 hour.</p>
                    <p className="text-gray-600 mt-2">Please schedule a follow-up appointment in 2 weeks to assess your progress.</p>
                    <button className="mt-3 bg-indigo-600 text-white px-4 py-2 text-sm rounded hover:bg-indigo-700 transition duration-300">
                      Schedule Follow-up
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button 
                  onClick={() => setCurrentStep(1)}
                  className="mt-4 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300"
                >
                  Start New Consultation
                </button>
                
                <button 
                  className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 flex items-center"
                >
                  Download Prescription <FileText size={18} className="ml-2" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
        </div>
    )

}
export default MedicalConsulation;


