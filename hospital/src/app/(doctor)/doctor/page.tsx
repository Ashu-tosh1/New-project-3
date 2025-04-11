"use client"
import React, { useState, useEffect } from "react";
import {
  Calendar,
  FileUp,
  FileText,
  Stethoscope,
  PieChart,
  Pill,
  ChevronRight,
  Users,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Clipboard,
  Edit,
  ArrowRight,
  MessageSquare,
  X,
  Send
} from 'lucide-react';

// Define our types
type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  appointmentTime: string;
  status: "waiting" | "in-progress" | "completed";
  symptoms?: string;
  medicalHistory?: string;
  image?: string;
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

const DoctorDashboard = () => {
  // Active patient in consultation
  const [activePatient, setActivePatient] = useState<Patient | null>(null);
  
  // Track the current consultation step
  const [consultationStep, setConsultationStep] = useState<number>(1);
  
  // Consultation states
  const [patientNotes, setPatientNotes] = useState<string>("");
  const [recommendedTests, setRecommendedTests] = useState<TestType[]>([]);
  const [testResults, setTestResults] = useState<string>("");
  const [medications, setMedications] = useState<Medication[]>([]);
  const [newMedication, setNewMedication] = useState<Medication>({ name: "", dosage: "", instructions: "" });
  
  // Search state
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // Chat state
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<{sender: string, message: string}[]>([]);
  
  // Mock patient data
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "P001",
      name: "John Doe",
      age: 35,
      gender: "Male",
      appointmentTime: "9:00 AM",
      status: "in-progress",
      symptoms: "Chest pain, shortness of breath, fatigue lasting for 1 week. Pain intensifies during physical activity.",
      medicalHistory: "Hypertension diagnosed 3 years ago. No previous cardiac issues. Family history of heart disease."
    },
    {
      id: "P002",
      name: "Sarah Johnson",
      age: 42,
      gender: "Female",
      appointmentTime: "9:30 AM",
      status: "waiting",
      symptoms: "Migraine headaches, sensitivity to light",
      medicalHistory: "Chronic migraines, allergic to penicillin"
    },
    {
      id: "P003",
      name: "Robert Chen",
      age: 58,
      gender: "Male",
      appointmentTime: "10:15 AM",
      status: "waiting",
      symptoms: "Joint pain in knees and hands",
      medicalHistory: "Arthritis, type 2 diabetes"
    },
    {
      id: "P004",
      name: "Emily Wilson",
      age: 29,
      gender: "Female",
      appointmentTime: "11:00 AM",
      status: "waiting",
      symptoms: "Persistent cough, fever",
      medicalHistory: "Asthma"
    }
  ]);
  
  // Set first patient as active on load
  useEffect(() => {
    const inProgressPatient = patients.find(p => p.status === "in-progress");
    if (inProgressPatient) {
      setActivePatient(inProgressPatient);
    }
  }, []);
  
  // Handle patient selection
  const selectPatient = (patient: Patient) => {
    setActivePatient(patient);
    setConsultationStep(1);
    updatePatientStatus(patient.id, "in-progress");
  };
  
  // Update patient status
  const updatePatientStatus = (patientId: string, newStatus: "waiting" | "in-progress" | "completed") => {
    setPatients(patients.map(p => 
      p.id === patientId ? {...p, status: newStatus} : p
    ));
  };
  
  // Advance consultation step
  const nextConsultationStep = () => {
    setConsultationStep(consultationStep + 1);
    
    // Initialize test recommendations at step 2
    if (consultationStep === 1) {
      setRecommendedTests([
        { name: "Complete Blood Count", description: "Basic blood test to check overall health" },
        { name: "ECG", description: "To check heart electrical activity" },
        { name: "Chest X-ray", description: "To visualize heart and lung condition" }
      ]);
    }
    
    // Simulate test results at step 3
    if (consultationStep === 2) {
      setTestResults("Blood glucose: 110 mg/dL\nHemoglobin: 14.5 g/dL\nWBC: 7,500/mcL\nPlatelets: 250,000/mcL\nECG: Minimal ST elevation in leads V3-V5\nChest X-ray: No acute abnormalities");
    }
  };
  
  // Add a new medication to the list
  const addMedication = () => {
    if (newMedication.name && newMedication.dosage && newMedication.instructions) {
      setMedications([...medications, newMedication]);
      setNewMedication({ name: "", dosage: "", instructions: "" });
    }
  };
  
  // Complete consultation
  const completeConsultation = () => {
    if (activePatient) {
      updatePatientStatus(activePatient.id, "completed");
      setActivePatient(null);
      setConsultationStep(1);
      setPatientNotes("");
      setRecommendedTests([]);
      setTestResults("");
      setMedications([]);
    }
  };
  
  // Handle search
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Send chat message
  const sendChatMessage = () => {
    if (chatMessage.trim()) {
      setChatHistory([...chatHistory, { sender: "doctor", message: chatMessage }]);
      setChatMessage("");
      
      // Simulate patient response after a short delay
      setTimeout(() => {
        setChatHistory(prev => [...prev, { 
          sender: "patient", 
          message: "Thank you doctor. I'll be sure to follow your instructions carefully." 
        }]);
      }, 2000);
    }
  };
  
  // Render badge based on patient status
  const renderStatusBadge = (status: string) => {
    switch(status) {
      case "waiting":
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Waiting</span>;
      case "in-progress":
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">In Progress</span>;
      case "completed":
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Completed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 bg-blue-600 text-white">
          <div className="flex items-center">
            <Stethoscope size={20} className="mr-2" />
            <h1 className="font-bold">MediConsult MD</h1>
          </div>
          <div className="mt-2 text-sm">
            <p>Dr. Emily Smith</p>
            <p className="text-blue-200">Cardiologist</p>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search patients..."
                className="w-full pl-8 pr-3 py-2 border rounded-md text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={16} className="absolute left-2.5 top-2.5 text-gray-400" />
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-3">
              <Calendar size={16} className="text-blue-600 mr-2" />
              <h2 className="font-medium text-gray-800">Today's Appointments</h2>
            </div>
            
            <div className="space-y-2">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => selectPatient(patient)}
                  className={`p-3 rounded-md cursor-pointer transition-all ${
                    activePatient?.id === patient.id ? 
                    "bg-blue-50 border-l-4 border-blue-500" : 
                    "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{patient.name}</h3>
                      <p className="text-xs text-gray-500">{patient.age} yrs • {patient.gender}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center text-xs text-gray-500 mb-1">
                        <Clock size={12} className="mr-1" />
                        {patient.appointmentTime}
                      </div>
                      {renderStatusBadge(patient.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {activePatient ? (
          <div className="h-full flex flex-col">
            {/* Patient header */}
            <div className="bg-white shadow-sm p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {activePatient.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <h2 className="font-bold text-lg">{activePatient.name}</h2>
                  <p className="text-sm text-gray-500">{activePatient.age} years old • {activePatient.gender} • Patient ID: {activePatient.id}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <button 
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  className="flex items-center mr-3 text-sm text-blue-600 hover:text-blue-800"
                >
                  <MessageSquare size={16} className="mr-1" />
                  Chat with Patient
                </button>
                
                <button 
                  onClick={completeConsultation}
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
                >
                  Complete Consultation
                </button>
              </div>
            </div>
            
            {/* Consultation progress */}
            <div className="bg-white shadow-sm p-4 border-t border-gray-100">
              <div className="flex justify-between">
                {["Patient Details", "Order Tests", "Review Results", "Prescribe Medicine"].map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      consultationStep > index + 1 ? 'bg-green-500 text-white' : 
                      consultationStep === index + 1 ? 'bg-blue-600 text-white' : 
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {consultationStep > index + 1 ? <CheckCircle size={16} /> : index + 1}
                    </div>
                    <div className="mt-1 text-xs font-medium text-gray-600">
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Consultation content */}
            <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
              {/* Step 1: Patient Details */}
              {consultationStep === 1 && (
                <div className="animate-fadeIn">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                      <div className="flex items-center mb-4">
                        <Clipboard className="text-blue-600 mr-2" size={18} />
                        <h3 className="font-bold text-gray-800">Patient Symptoms</h3>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-4">
                        <p className="text-gray-700">{activePatient.symptoms}</p>
                      </div>
                      
                      <div className="flex items-center mb-4">
                        <FileText className="text-blue-600 mr-2" size={18} />
                        <h3 className="font-bold text-gray-800">Medical History</h3>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                        <p className="text-gray-700">{activePatient.medicalHistory}</p>
                      </div>
                    </div>
                    
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                      <div className="flex items-center mb-4">
                        <Edit className="text-blue-600 mr-2" size={18} />
                        <h3 className="font-bold text-gray-800">Consultation Notes</h3>
                      </div>
                      <textarea
                        className="w-full h-48 p-3 border border-gray-300 rounded-md"
                        placeholder="Enter your notes about the patient here..."
                        value={patientNotes}
                        onChange={(e) => setPatientNotes(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  
                  <button 
                    onClick={nextConsultationStep}
                    className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                  >
                    Order Tests <ChevronRight size={18} className="ml-1" />
                  </button>
                </div>
              )}
              
              {/* Step 2: Order Tests */}
              {consultationStep === 2 && (
                <div className="animate-fadeIn">
                  <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
                    <div className="flex items-center mb-4">
                      <Stethoscope className="text-blue-600 mr-2" size={18} />
                      <h3 className="font-bold text-gray-800">Recommended Tests</h3>
                    </div>
                    
                    <div className="space-y-3">
                      {recommendedTests.map((test, index) => (
                        <div key={index} className="flex items-center bg-blue-50 p-3 rounded-md border border-blue-100">
                          <input
                            type="checkbox"
                            id={`test-${index}`}
                            className="h-5 w-5 text-blue-600 rounded"
                            defaultChecked
                          />
                          <label htmlFor={`test-${index}`} className="ml-3 flex-1">
                            <div className="font-medium text-gray-800">{test.name}</div>
                            <div className="text-sm text-gray-600">{test.description}</div>
                          </label>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center">
                        <button className="flex items-center text-blue-600 text-sm">
                          + Add Additional Test
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
                    <div className="flex items-center mb-4">
                      <AlertCircle className="text-amber-600 mr-2" size={18} />
                      <h3 className="font-bold text-gray-800">Special Instructions</h3>
                    </div>
                    
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="Add any special instructions for the lab or technician..."
                      rows={3}
                    ></textarea>
                  </div>
                  
                  <button 
                    onClick={nextConsultationStep}
                    className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                  >
                    Review Test Results <ChevronRight size={18} className="ml-1" />
                  </button>
                </div>
              )}
              
              {/* Step 3: Review Results */}
              {consultationStep === 3 && (
                <div className="animate-fadeIn">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                      <div className="flex items-center mb-4">
                        <PieChart className="text-blue-600 mr-2" size={18} />
                        <h3 className="font-bold text-gray-800">Test Results</h3>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded border border-gray-200 font-mono text-sm whitespace-pre-line">
                        {testResults}
                      </div>
                      
                      <div className="mt-4">
                        <button className="flex items-center text-blue-600 text-sm">
                          <FileText size={14} className="mr-1" />
                          View Full Report
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                      <div className="flex items-center mb-4">
                        <Edit className="text-blue-600 mr-2" size={18} />
                        <h3 className="font-bold text-gray-800">Analysis Notes</h3>
                      </div>
                      
                      <textarea
                        className="w-full h-48 p-3 border border-gray-300 rounded-md"
                        placeholder="Enter your analysis of the test results here..."
                      ></textarea>
                    </div>
                  </div>
                  
                  <button 
                    onClick={nextConsultationStep}
                    className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                  >
                    Prescribe Medication <ChevronRight size={18} className="ml-1" />
                  </button>
                </div>
              )}
              
              {/* Step 4: Prescribe Medicine */}
              {consultationStep === 4 && (
                <div className="animate-fadeIn">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                      <div className="flex items-center mb-4">
                        <Pill className="text-blue-600 mr-2" size={18} />
                        <h3 className="font-bold text-gray-800">Prescription</h3>
                      </div>
                      
                      {medications.length > 0 ? (
                        <div className="space-y-3 mb-4">
                          {medications.map((med, index) => (
                            <div key={index} className="bg-blue-50 p-3 rounded-md border border-blue-100">
                              <div className="font-medium text-gray-800">{med.name}</div>
                              <div className="grid grid-cols-2 gap-2 mt-1">
                                <div className="text-sm">
                                  <span className="text-gray-500">Dosage:</span> {med.dosage}
                                </div>
                                <div className="text-sm">
                                  <span className="text-gray-500">Instructions:</span> {med.instructions}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-gray-500">
                          No medications added yet
                        </div>
                      )}
                      
                      <div className="border-t pt-4">
                        <h4 className="font-medium text-gray-800 mb-3">Add Medication</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                          <input
                            type="text"
                            placeholder="Medication name"
                            className="p-2 border border-gray-300 rounded-md"
                            value={newMedication.name}
                            onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                          />
                          <input
                            type="text"
                            placeholder="Dosage"
                            className="p-2 border border-gray-300 rounded-md"
                            value={newMedication.dosage}
                            onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                          />
                          <input
                            type="text"
                            placeholder="Instructions"
                            className="p-2 border border-gray-300 rounded-md"
                            value={newMedication.instructions}
                            onChange={(e) => setNewMedication({...newMedication, instructions: e.target.value})}
                          />
                        </div>
                        <button 
                          onClick={addMedication}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          Add Medication
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                      <div className="flex items-center mb-4">
                        <Calendar className="text-blue-600 mr-2" size={18} />
                        <h3 className="font-bold text-gray-800">Follow-up Plan</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Follow-up Appointment
                          </label>
                          <select className="w-full p-2 border border-gray-300 rounded-md">
                            <option>In 1 week</option>
                            <option>In 2 weeks</option>
                            <option>In 1 month</option>
                            <option>In 3 months</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Special Instructions
                          </label>
                          <textarea
                            className="w-full p-2 border border-gray-300 rounded-md"
                            rows={4}
                            placeholder="Additional instructions for the patient..."
                          ></textarea>
                        </div>
                        
                        <div className="flex items-center">
                          <input type="checkbox" id="notify" className="h-4 w-4 text-blue-600 rounded" />
                          <label htmlFor="notify" className="ml-2 text-sm text-gray-700">
                            Send appointment reminder to patient
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={completeConsultation}
                    className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center"
                  >
                    Complete & Submit Prescription <ArrowRight size={18} className="ml-1" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center bg-gray-50">
            <div className="text-center p-8">
              <div className="bg-blue-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <User size={32} className="text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No Active Consultation</h2>
              <p className="text-gray-600 mb-6">Select a patient from the sidebar to begin consultation</p>
              <div className="flex justify-center">
                <button 
                  onClick={() => selectPatient(patients[0])}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Start Next Appointment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Chat sidebar */}
      {isChatOpen && activePatient && (
        <div className="w-80 bg-white shadow-md border-l border-gray-200 flex flex-col">
          <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
            <div className="flex items-center">
              <MessageSquare size={18} className="mr-2" />
              <h3 className="font-medium">Chat with Patient</h3>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:text-blue-200"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {chatHistory.length > 0 ? (
                chatHistory.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.sender === "doctor" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-3/4 p-3 rounded-lg ${
                        msg.sender === "doctor" 
                          ? "bg-blue-600 text-white rounded-br-none" 
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-6">
                  <MessageSquare size={24} className="mx-auto mb-2 text-gray-400" />
                  <p>Start chatting with {activePatient.name}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex">
              <input
                type="text"
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Type a message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
              />
              <button 
                className="bg-blue-600 text-white p-2 rounded-r-md hover:bg-blue-700"
                onClick={sendChatMessage}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;