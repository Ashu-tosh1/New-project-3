/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

interface SymptomRecorderProps {
  onSubmit: (data: any) => void;

  patientData: any;
}

const SymptomRecorder: React.FC<SymptomRecorderProps> = ({ onSubmit, patientData }) => {
  const [symptoms, setSymptoms] = useState([
    { id: 1, description: '', duration: '', severity: 'mild' }
  ]);
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleSymptomChange = (index: number, field: string, value: string) => {
    const updatedSymptoms = [...symptoms];
    updatedSymptoms[index] = { ...updatedSymptoms[index], [field]: value };
    setSymptoms(updatedSymptoms);
  };

  const addSymptom = () => {
    setSymptoms([
      ...symptoms,
      { 
        id: symptoms.length + 1, 
        description: '', 
        duration: '', 
        severity: 'mild' 
      }
    ]);
  };

  const removeSymptom = (index: number) => {
    if (symptoms.length > 1) {
      const updatedSymptoms = symptoms.filter((_, i) => i !== index);
      setSymptoms(updatedSymptoms);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      symptoms,
      chiefComplaint,
      additionalNotes
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Symptom Recording</h2>
        <div className="text-sm text-gray-600">
          <p>Patient: <span className="font-semibold">{patientData.name}</span></p>
          <p>ID: <span className="font-semibold">{patientData.patientId}</span></p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Chief Complaint</label>
          <input
            type="text"
            value={chiefComplaint}
            onChange={(e) => setChiefComplaint(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Main reason for visit"
            required
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-gray-700">Symptoms</label>
            <button 
              type="button" 
              onClick={addSymptom}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 4v16m8-8H4"></path>
              </svg>
              Add Symptom
            </button>
          </div>

          {symptoms.map((symptom, index) => (
            <div key={symptom.id} className="mb-4 p-4 border border-gray-200 rounded bg-gray-50">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium text-gray-700">Symptom {index + 1}</h4>
                {symptoms.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeSymptom(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">Description</label>
                  <input
                    type="text"
                    value={symptom.description}
                    onChange={(e) => handleSymptomChange(index, 'description', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Describe symptom"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Duration</label>
                  <input
                    type="text"
                    value={symptom.duration}
                    onChange={(e) => handleSymptomChange(index, 'duration', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="e.g., 3 days"
                    required
                  />
                </div>
                
                <div className="md:col-span-3">
                  <label className="block text-sm text-gray-600 mb-1">Severity</label>
                  <div className="flex space-x-4">
                    {['mild', 'moderate', 'severe'].map((severity) => (
                      <label key={severity} className="flex items-center">
                        <input
                          type="radio"
                          checked={symptom.severity === severity}
                          onChange={() => handleSymptomChange(index, 'severity', severity)}
                          className="mr-1"
                        />
                        <span className="capitalize">{severity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Additional Notes</label>
          <textarea
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded h-24"
            placeholder="Additional details, observations, or context"
          ></textarea>
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
          >
            Next: Recommend Tests
          </button>
        </div>
      </form>
    </div>
  );
};

export default SymptomRecorder;