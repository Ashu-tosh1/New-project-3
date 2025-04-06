import { ChevronRight, ClipboardList, FileText, FileUp } from 'lucide-react'
import React, { useState } from 'react'

type Step2props={
    nextStep :() =>void 
    }
    
const Step2_Medical:React.FC<Step2props> =  ({nextStep}) => {
    const [previousMedicalFile, setPreviousMedicalFile] = useState<File | null>(null);

    const [patientInfo, setPatientInfo] = useState({
        name: "John Doe",
        age: 35,
        symptoms: "",
        medicalHistory: ""
      });
      const handlePreviousMedicalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          setPreviousMedicalFile(e.target.files[0]);
        }
    };
    const handleSymptomsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPatientInfo({...patientInfo, symptoms: e.target.value});
      };
      
      // Handle medical history input
      const handleMedicalHistoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPatientInfo({...patientInfo, medicalHistory: e.target.value});
    };
    


  return (
    <div className="animate-fadeIn">
              <div className="flex items-center mb-6">
                <ClipboardList className="text-blue-600 mr-2" size={24} />
                <h2 className="text-xl font-bold text-gray-800">Symptom Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <label className="block text-gray-700 font-medium mb-2">Describe your symptoms:</label>
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={patientInfo.symptoms}
                      onChange={handleSymptomsChange}
                      placeholder="Please provide details about your symptoms, their severity, and when they started..."
                    />
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <label className="block text-gray-700 font-medium mb-2">Past medical history:</label>
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={patientInfo.medicalHistory}
                      onChange={handleMedicalHistoryChange}
                      placeholder="List any chronic conditions, previous surgeries, allergies, or medications you're currently taking..."
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <label className="block text-gray-700 font-medium mb-2">Upload previous medical records:</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition duration-300">
                      <input 
                        type="file" 
                        id="previousMedicalFile"
                        onChange={handlePreviousMedicalFileUpload}
                        className="hidden"
                      />
                      <label htmlFor="previousMedicalFile" className="cursor-pointer">
                        <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PDF, JPG, PNG (max. 10MB)</p>
                      </label>
                      {previousMedicalFile && (
                        <div className="mt-4 p-2 bg-blue-50 rounded flex items-center">
                          <FileText size={16} className="text-blue-600 mr-2" />
                          <span className="text-sm text-gray-700 truncate">{previousMedicalFile.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                    <h3 className="font-medium text-indigo-800 mb-2">Important Note</h3>
                    <p className="text-sm text-indigo-700">Please be as detailed as possible about your symptoms to help your doctor make an accurate assessment. Include when symptoms started, severity, and any factors that make them better or worse.</p>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={nextStep}
                className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center disabled:bg-gray-400"
                disabled={!patientInfo.symptoms}
              >
                Submit and Continue <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
  )
}

export default Step2_Medical