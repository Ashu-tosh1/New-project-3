/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import PatientInfo from './PatientInfo';
import SymptomRecorder from './SymptonRecorder';
import TestRecommendation from './TestRecommendation';
import ReportSubmission from './ReportSubmission';
import TestAnalysis from './TestAnalysis';
import Prescription from './Prescription';
import FollowUpScheduler from './FollowUpSchedule';


const PatientConsulation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [patientData, setPatientData] = useState({});
  const [symptoms, setSymptoms] = useState([]);
  const [recommendedTests, setRecommendedTests] = useState([]);
  const [testReports, setTestReports] = useState({});
  const [analysis, setAnalysis] = useState('');
  const [medications, setMedications] = useState([]);
  const [followUp, setFollowUp] = useState(null);

  // Handle data from each step and move to next step
  const handlePatientInfoSubmit = (data: any) => {
    setPatientData(data);
    setCurrentStep(2);
  };

  const handleSymptomsSubmit = (data: any) => {
    setSymptoms(data);
    setCurrentStep(3);
  };

  const handleTestsSubmit = (data: any) => {
    setRecommendedTests(data);
    setCurrentStep(4);
  };

  const handleReportSubmit = (data: any) => {
    setTestReports(data);
    setCurrentStep(5);
  };

  const handleAnalysisSubmit = (data: any) => {
    setAnalysis(data);
    setCurrentStep(6);
  };

  const handleMedicationSubmit = (data: any, needsFollowUp: boolean) => {
    setMedications(data);
    if (needsFollowUp) {
      setCurrentStep(7);
    } else {
      // Consultation complete
      setCurrentStep(8);
    }
  };

  const handleFollowUpSubmit = (data: any) => {
    setFollowUp(data);
    // Consultation complete
    setCurrentStep(8);
  };

  // Render the appropriate component based on the current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PatientInfo onSubmit={handlePatientInfoSubmit} />;
      case 2:
        return <SymptomRecorder onSubmit={handleSymptomsSubmit} patientData={patientData} />;
      case 3:
        return <TestRecommendation onSubmit={handleTestsSubmit} patientData={patientData} symptoms={symptoms} />;
      case 4:
        return <ReportSubmission onSubmit={handleReportSubmit} recommendedTests={recommendedTests} />;
      case 5:
        return <TestAnalysis onSubmit={handleAnalysisSubmit} testReports={testReports} />;
      case 6:
        return <Prescription onSubmit={handleMedicationSubmit} patientData={patientData} analysis={analysis} />;
      case 7:
        return <FollowUpScheduler onSubmit={handleFollowUpSubmit} patientData={patientData} />;
      case 8:
        return (
          <div className="p-6 bg-green-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Consultation Complete</h2>
            <p className="text-lg text-green-600">
              All steps have been completed successfully.
            </p>
            <button 
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              onClick={() => setCurrentStep(1)}
            >
              Start New Consultation
            </button>
          </div>
        );
      default:
        return <PatientInfo onSubmit={handlePatientInfoSubmit} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">MedicoHub - Doctor Dashboard</h1>
      
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <div 
              key={step} 
              className={`h-3 w-3 rounded-full ${currentStep >= step ? 'bg-blue-600' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Patient Info</span>
          <span>Symptoms</span>
          <span>Tests</span>
          <span>Reports</span>
          <span>Analysis</span>
          <span>Meds</span>
          <span>Follow-up</span>
        </div>
      </div>
      
      {/* Current step component */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default PatientConsulation;