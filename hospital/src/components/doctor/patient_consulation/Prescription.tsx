/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

interface PrescriptionProps {
  onSubmit: (data: any, needsFollowUp: boolean) => void;
  patientData: any;
  analysis: any;
}

const Prescription: React.FC<PrescriptionProps> = ({ onSubmit, patientData, analysis }) => {
  const [medications, setMedications] = useState([
    { 
      id: 1, 
      name: '', 
      dosage: '', 
      frequency: '', 
      duration: '', 
      specialInstructions: '' 
    }
  ]);
  
  const [lifestyle, setLifestyle] = useState('');
  const [diet, setDiet] = useState('');
  const [additionalInstructions, setAdditionalInstructions] = useState('');
  const [needsFollowUp, setNeedsFollowUp] = useState(false);

  const handleMedicationChange = (index: number, field: string, value: string) => {
    const updatedMedications = [...medications];
    updatedMedications[index] = { ...updatedMedications[index], [field]: value };
    setMedications(updatedMedications);
  };

  const addMedication = () => {
    setMedications([
      ...medications,
      { 
        id: medications.length + 1, 
        name: '', 
        dosage: '', 
        frequency: '', 
        duration: '', 
        specialInstructions: '' 
      }
    ]);
  };

  const removeMedication = (index: number) => {
    if (medications.length > 1) {
      const updatedMedications = medications.filter((_, i) => i !== index);
      setMedications(updatedMedications);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      medications,
      lifestyle,
      diet,
      additionalInstructions
    }, needsFollowUp);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Treatment & Prescription</h2>
        <div className="text-sm text-gray-600">
          <p>Patient: <span className="font-semibold">{patientData.name}</span></p>
          <p>ID: <span className="font-semibold">{patientData.patientId}</span></p>
        </div>
      </div>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">Diagnosis Summary</h3>
        <p className="text-gray-700 mb-2"><strong>Primary Diagnosis:</strong> {analysis.diagnosis}</p>
        {analysis.differentialDiagnosis && (
          <p className="text-gray-700"><strong>Differential Diagnosis:</strong> {analysis.differentialDiagnosis}</p>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-gray-700">Medication</label>
            <button 
              type="button" 
              onClick={addMedication}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 4v16m8-8H4"></path>
              </svg>
              Add Medication
            </button>
          </div>

          {medications.map((medication, index) => (
            <div key={medication.id} className="mb-4 p-4 border border-gray-200 rounded bg-gray-50">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium text-gray-700">Medication {index + 1}</h4>
                {medications.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeMedication(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Medication Name</label>
                  <input
                    type="text"
                    value={medication.name}
                    onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Medicine name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Dosage</label>
                  <input
                    type="text"
                    value={medication.dosage}
                    onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="e.g., 500mg"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Frequency</label>
                  <input
                    type="text"
                    value={medication.frequency}
                    onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="e.g., Twice daily"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Duration</label>
                  <input
                    type="text"
                    value={medication.duration}
                    onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="e.g., 7 days"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Special Instructions</label>
                <textarea
                  value={medication.specialInstructions}
                  onChange={(e) => handleMedicationChange(index, 'specialInstructions', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded h-16"
                  placeholder="e.g., Take after meals, Avoid alcohol, etc."
                ></textarea>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Lifestyle Recommendations</label>
          <textarea
            value={lifestyle}
            onChange={(e) => setLifestyle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded h-24"
            placeholder="Exercise, sleep, and other lifestyle recommendations"
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Dietary Recommendations</label>
          <textarea
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded h-24"
            placeholder="Foods to eat, avoid, and other dietary advice"
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Additional Instructions</label>
          <textarea
            value={additionalInstructions}
            onChange={(e) => setAdditionalInstructions(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded h-24"
            placeholder="Any other instructions or advice for the patient"
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              checked={needsFollowUp}
              onChange={(e) => setNeedsFollowUp(e.target.checked)}
              className="mr-2"
            />
            Schedule a follow-up appointment
          </label>
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
          >
            {needsFollowUp ? "Proceed to Follow-up" : "Complete Consultation"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Prescription;