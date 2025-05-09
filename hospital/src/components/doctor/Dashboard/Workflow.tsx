import React, { useState, useEffect } from "react";
import { CheckCircle, ChevronRight, ArrowRight, Clipboard, FileText, Edit } from "lucide-react";

type Patient = {
  name: string;
  symptoms: string;
  medicalHistory: string;
  appointmentId: string;
};

type Test = {
  name: string;
  description: string;
};

type Medication = {
  name: string;
  dosage: string;
  instructions: string;
};

type ConsultationWorkflowProps = {
  activePatient: Patient;
  consultationStep: number;
  setConsultationStep: React.Dispatch<React.SetStateAction<number>>;
  completeConsultation: () => void;
};

const ConsultationWorkflow: React.FC<ConsultationWorkflowProps> = ({
  activePatient,
  consultationStep,
  setConsultationStep,
  completeConsultation,
}) => {
  const [patientNotes, setPatientNotes] = useState("");
  const [patientSymptoms, setPatientSymptoms] = useState("");

  const [recommendedTests, setRecommendedTests] = useState<Test[]>([]);
  const [testResults, setTestResults] = useState("");
  const [medications, setMedications] = useState<Medication[]>([]);
  const [newMedication, setNewMedication] = useState<Medication>({
    name: "",
    dosage: "",
    instructions: "",
  });

  // Fetch symptoms and notes based on appointment ID
  const fetchAppointmentDetails = async (appointmentId: string) => {
    try {
      const response = await fetch(`/api/appointments/details/${appointmentId}`);
      const data = await response.json();
      
      if (data.error) {
        console.error(data.error);
        return;
      }
      console.log(data)
      setPatientNotes(data.notes);
      setPatientSymptoms(data.symptoms); // Add this line
        // Set fetched notes
    } catch (error) {
      console.error("Error fetching appointment details:", error);
    }
  };

  useEffect(() => {
    if (activePatient.appointmentId) {
      fetchAppointmentDetails(activePatient.appointmentId);
    }
  }, [activePatient]);

  const nextConsultationStep = () => {
    setConsultationStep((prev) => prev + 1);

    if (consultationStep === 1) {
      setRecommendedTests([
        {
          name: "Complete Blood Count",
          description: "Basic blood test to check overall health",
        },
        {
          name: "ECG",
          description: "To check heart electrical activity",
        },
        {
          name: "Chest X-ray",
          description: "To visualize heart and lung condition",
        },
      ]);
    }

    if (consultationStep === 2) {
      setTestResults(
        `Blood glucose: 110 mg/dL
Hemoglobin: 14.5 g/dL
WBC: 7,500/mcL
Platelets: 250,000/mcL
ECG: Minimal ST elevation in leads V3-V5
Chest X-ray: No acute abnormalities`
      );
    }
  };

  const addMedication = () => {
    if (
      newMedication.name.trim() &&
      newMedication.dosage.trim() &&
      newMedication.instructions.trim()
    ) {
      setMedications((prev) => [...prev, newMedication]);
      setNewMedication({ name: "", dosage: "", instructions: "" });
    }
  };

  return (
    <>
      {/* Step Indicator */}
      <div className="bg-white shadow-sm p-4 border-t border-gray-100">
        <div className="flex justify-between">
          {["Patient Details", "Order Tests", "Review Results", "Prescribe Medicine"].map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${consultationStep > index + 1
                    ? "bg-green-500 text-white"
                    : consultationStep === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                  }`}
              >
                {consultationStep > index + 1 ? <CheckCircle size={16} /> : index + 1}
              </div>
              <div className="mt-1 text-xs font-medium text-gray-600">{step}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        {/* Step 1: Patient Details */}
        {consultationStep === 1 && (
          <div className="fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <Clipboard className="text-blue-600 mr-2" size={18} />
                  <h3 className="font-bold text-gray-800">Patient Symptoms</h3>
                </div>
                <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-4">
                  {/* <p className="text-gray-700">{activePatient.symptoms}</p> */}
                  <p className="text-gray-700">{patientSymptoms}</p>

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
                  <h3 className="font-bold text-gray-800">Patient Notes</h3>
                </div>
                <textarea
                  className="w-full h-48 p-3 border border-gray-300 rounded-md"
                  placeholder="Enter your notes about the patient here..."
                  value={patientNotes}
                  onChange={(e) => setPatientNotes(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={nextConsultationStep}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center"
            >
              Order Tests <ChevronRight size={18} className="ml-2" />
            </button>
          </div>
        )}

        {/* Step 2: Order Tests */}
        {consultationStep === 2 && (
          <div className="fade-in">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Recommended Tests</h3>
              <ul className="space-y-3">
                {recommendedTests.map((test, index) => (
                  <li key={index} className="border p-3 rounded-md bg-blue-50 border-blue-100">
                    <p className="font-medium text-blue-700">{test.name}</p>
                    <p className="text-sm text-gray-600">{test.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={nextConsultationStep}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center"
            >
              Review Test Results <ChevronRight size={18} className="ml-2" />
            </button>
          </div>
        )}

        {/* Step 3: Review Results */}
        {consultationStep === 3 && (
          <div className="fade-in">
            <div className="bg-white p-5 rounded-lg shadow-sm whitespace-pre-wrap">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Test Results</h3>
              <p className="text-gray-700">{testResults}</p>
            </div>

            <button
              onClick={nextConsultationStep}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center"
            >
              Prescribe Medication <ChevronRight size={18} className="ml-2" />
            </button>
          </div>
        )}

        {/* Step 4: Prescribe Medication */}
        {consultationStep === 4 && (
          <div className="fade-in">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Prescriptions</h3>

              <div className="grid gap-3 md:grid-cols-3">
                <input
                  className="border p-2 rounded"
                  placeholder="Medication name"
                  value={newMedication.name}
                  onChange={(e) =>
                    setNewMedication({ ...newMedication, name: e.target.value })
                  }
                />
                <input
                  className="border p-2 rounded"
                  placeholder="Dosage"
                  value={newMedication.dosage}
                  onChange={(e) =>
                    setNewMedication({ ...newMedication, dosage: e.target.value })
                  }
                />
                <input
                  className="border p-2 rounded"
                  placeholder="Instructions"
                  value={newMedication.instructions}
                  onChange={(e) =>
                    setNewMedication({ ...newMedication, instructions: e.target.value })
                  }
                />
              </div>
              <button
                onClick={addMedication}
                className="mt-3 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add Medication
              </button>

              <ul className="mt-6 space-y-2">
                {medications.map((med, index) => (
                  <li key={index} className="p-3 bg-blue-50 border border-blue-100 rounded">
                    <p className="font-medium text-blue-700">{med.name}</p>
                    <p className="text-sm text-gray-600">{med.dosage} - {med.instructions}</p>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={completeConsultation}
              className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg flex items-center"
            >
              Complete & Submit Prescription <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ConsultationWorkflow;






// import React, { useState } from "react";
// import {
//   CheckCircle,
//   ChevronRight,
//   ArrowRight,
//   Clipboard,
//   FileText,
//   Edit,
// } from "lucide-react";

// type Patient = {
//   name: string;
//   symptoms: string;
//   medicalHistory: string;
// };

// type Test = {
//   name: string;
//   description: string;
// };

// type Medication = {
//   name: string;
//   dosage: string;
//   instructions: string;
// };

// type ConsultationWorkflowProps = {
//   activePatient: Patient;
//   consultationStep: number;
//   setConsultationStep: React.Dispatch<React.SetStateAction<number>>;
//   completeConsultation: () => void;
// };

// const ConsultationWorkflow: React.FC<ConsultationWorkflowProps> = ({
//   activePatient,
//   consultationStep,
//   setConsultationStep,
//   completeConsultation,
// }) => {
//   const [patientNotes, setPatientNotes] = useState("");
//   const [recommendedTests, setRecommendedTests] = useState<Test[]>([]);
//   const [testResults, setTestResults] = useState("");
//   const [medications, setMedications] = useState<Medication[]>([]);
//   const [newMedication, setNewMedication] = useState<Medication>({
//     name: "",
//     dosage: "",
//     instructions: "",
//   });

//   const nextConsultationStep = () => {
//     setConsultationStep((prev) => prev + 1);

//     if (consultationStep === 1) {
//       setRecommendedTests([
//         {
//           name: "Complete Blood Count",
//           description: "Basic blood test to check overall health",
//         },
//         {
//           name: "ECG",
//           description: "To check heart electrical activity",
//         },
//         {
//           name: "Chest X-ray",
//           description: "To visualize heart and lung condition",
//         },
//       ]);
//     }

//     if (consultationStep === 2) {
//       setTestResults(
//         `Blood glucose: 110 mg/dL
// Hemoglobin: 14.5 g/dL
// WBC: 7,500/mcL
// Platelets: 250,000/mcL
// ECG: Minimal ST elevation in leads V3-V5
// Chest X-ray: No acute abnormalities`
//       );
//     }
//   };

//   const addMedication = () => {
//     if (
//       newMedication.name.trim() &&
//       newMedication.dosage.trim() &&
//       newMedication.instructions.trim()
//     ) {
//       setMedications((prev) => [...prev, newMedication]);
//       setNewMedication({ name: "", dosage: "", instructions: "" });
//     }
//   };

//   return (
//     <>
//       {/* Step Indicator */}
//       <div className="bg-white shadow-sm p-4 border-t border-gray-100">
//         <div className="flex justify-between">
//           {["Patient Details", "Order Tests", "Review Results", "Prescribe Medicine"].map((step, index) => (
//             <div key={index} className="flex flex-col items-center">
//               <div
//                 className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                   consultationStep > index + 1
//                     ? "bg-green-500 text-white"
//                     : consultationStep === index + 1
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-200 text-gray-600"
//                 }`}
//               >
//                 {consultationStep > index + 1 ? <CheckCircle size={16} /> : index + 1}
//               </div>
//               <div className="mt-1 text-xs font-medium text-gray-600">{step}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Step Content */}
//       <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
//         {/* Step 1: Patient Details */}
//         {consultationStep === 1 && (
//           <div className="fade-in">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div className="bg-white p-5 rounded-lg shadow-sm">
//                 <div className="flex items-center mb-4">
//                   <Clipboard className="text-blue-600 mr-2" size={18} />
//                   <h3 className="font-bold text-gray-800">Patient Symptoms</h3>
//                 </div>
//                 <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-4">
//                   <p className="text-gray-700">{activePatient.symptoms}</p>
//                 </div>

//                 <div className="flex items-center mb-4">
//                   <FileText className="text-blue-600 mr-2" size={18} />
//                   <h3 className="font-bold text-gray-800">Medical History</h3>
//                 </div>
//                 <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
//                   <p className="text-gray-700">{activePatient.medicalHistory}</p>
//                 </div>
//               </div>

//               <div className="bg-white p-5 rounded-lg shadow-sm">
//                 <div className="flex items-center mb-4">
//                   <Edit className="text-blue-600 mr-2" size={18} />
//                   <h3 className="font-bold text-gray-800">Consultation Notes</h3>
//                 </div>
//                 <textarea
//                   className="w-full h-48 p-3 border border-gray-300 rounded-md"
//                   placeholder="Enter your notes about the patient here..."
//                   value={patientNotes}
//                   onChange={(e) => setPatientNotes(e.target.value)}
//                 />
//               </div>
//             </div>

//             <button
//               onClick={nextConsultationStep}
//               className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center"
//             >
//               Order Tests <ChevronRight size={18} className="ml-2" />
//             </button>
//           </div>
//         )}

//         {/* Step 2: Order Tests */}
//         {consultationStep === 2 && (
//           <div className="fade-in">
//             <div className="bg-white p-5 rounded-lg shadow-sm">
//               <h3 className="font-bold text-lg text-gray-800 mb-4">Recommended Tests</h3>
//               <ul className="space-y-3">
//                 {recommendedTests.map((test, index) => (
//                   <li key={index} className="border p-3 rounded-md bg-blue-50 border-blue-100">
//                     <p className="font-medium text-blue-700">{test.name}</p>
//                     <p className="text-sm text-gray-600">{test.description}</p>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <button
//               onClick={nextConsultationStep}
//               className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center"
//             >
//               Review Test Results <ChevronRight size={18} className="ml-2" />
//             </button>
//           </div>
//         )}

//         {/* Step 3: Review Results */}
//         {consultationStep === 3 && (
//           <div className="fade-in">
//             <div className="bg-white p-5 rounded-lg shadow-sm whitespace-pre-wrap">
//               <h3 className="font-bold text-lg text-gray-800 mb-4">Test Results</h3>
//               <p className="text-gray-700">{testResults}</p>
//             </div>

//             <button
//               onClick={nextConsultationStep}
//               className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center"
//             >
//               Prescribe Medication <ChevronRight size={18} className="ml-2" />
//             </button>
//           </div>
//         )}

//         {/* Step 4: Prescribe Medication */}
//         {consultationStep === 4 && (
//           <div className="fade-in">
//             <div className="bg-white p-5 rounded-lg shadow-sm">
//               <h3 className="font-bold text-lg text-gray-800 mb-4">Prescriptions</h3>

//               <div className="grid gap-3 md:grid-cols-3">
//                 <input
//                   className="border p-2 rounded"
//                   placeholder="Medication name"
//                   value={newMedication.name}
//                   onChange={(e) =>
//                     setNewMedication({ ...newMedication, name: e.target.value })
//                   }
//                 />
//                 <input
//                   className="border p-2 rounded"
//                   placeholder="Dosage"
//                   value={newMedication.dosage}
//                   onChange={(e) =>
//                     setNewMedication({ ...newMedication, dosage: e.target.value })
//                   }
//                 />
//                 <input
//                   className="border p-2 rounded"
//                   placeholder="Instructions"
//                   value={newMedication.instructions}
//                   onChange={(e) =>
//                     setNewMedication({ ...newMedication, instructions: e.target.value })
//                   }
//                 />
//               </div>
//               <button
//                 onClick={addMedication}
//                 className="mt-3 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Add Medication
//               </button>

//               <ul className="mt-6 space-y-2">
//                 {medications.map((med, index) => (
//                   <li key={index} className="p-3 bg-blue-50 border border-blue-100 rounded">
//                     <p className="font-medium text-blue-700">{med.name}</p>
//                     <p className="text-sm text-gray-600">{med.dosage} - {med.instructions}</p>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <button
//               onClick={completeConsultation}
//               className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg flex items-center"
//             >
//               Complete & Submit Prescription <ArrowRight size={18} className="ml-2" />
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ConsultationWorkflow;
