/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

interface TestRecommendationProps {
  onSubmit: (data: any) => void;
  patientData: any;
  symptoms: any;
}

const TestRecommendation: React.FC<TestRecommendationProps> = ({ onSubmit, patientData, symptoms }) => {
  const [tests, setTests] = useState([
    { id: 1, name: '', type: '', instructions: '', priority: 'normal' }
  ]);
  const [notes, setNotes] = useState('');

  // Common test types for quick selection
  const commonTests = [
    'Complete Blood Count (CBC)',
    'Comprehensive Metabolic Panel (CMP)',
    'Urinalysis',
    'Electrocardiogram (ECG)',
    'Blood Glucose',
    'Liver Function Test',
    'Kidney Function Test',
    'Lipid Profile',
    'X-Ray',
    'CT Scan',
    'MRI',
    'Ultrasound'
  ];

  const handleTestChange = (index: number, field: string, value: string) => {
    const updatedTests = [...tests];
    updatedTests[index] = { ...updatedTests[index], [field]: value };
    setTests(updatedTests);
  };

  const addTest = () => {
    setTests([
      ...tests,
      { 
        id: tests.length + 1, 
        name: '', 
        type: '', 
        instructions: '', 
        priority: 'normal' 
      }
    ]);
  };

  const removeTest = (index: number) => {
    if (tests.length > 1) {
      const updatedTests = tests.filter((_, i) => i !== index);
      setTests(updatedTests);
    }
  };

  const selectCommonTest = (index: number, testName: string) => {
    handleTestChange(index, 'name', testName);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      tests,
      notes
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Test Recommendations</h2>
        <div className="text-sm text-gray-600">
          <p>Patient: <span className="font-semibold">{patientData.name}</span></p>
          <p>ID: <span className="font-semibold">{patientData.patientId}</span></p>
        </div>
      </div>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">Patient Symptoms Summary</h3>
        <p className="text-gray-700 mb-2"><strong>Chief Complaint:</strong> {symptoms.chiefComplaint}</p>
        <ul className="list-disc pl-5">
          {symptoms.symptoms.map((symptom: any) => (
            <li key={symptom.id} className="text-gray-700">
              {symptom.description} - {symptom.duration} - <span className="capitalize">{symptom.severity}</span>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-gray-700">Recommended Tests</label>
            <button 
              type="button" 
              onClick={addTest}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 4v16m8-8H4"></path>
              </svg>
              Add Test
            </button>
          </div>

          {tests.map((test, index) => (
            <div key={test.id} className="mb-4 p-4 border border-gray-200 rounded bg-gray-50">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium text-gray-700">Test {index + 1}</h4>
                {tests.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeTest(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Test Name</label>
                  <input
                    type="text"
                    value={test.name}
                    onChange={(e) => handleTestChange(index, 'name', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Test name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Test Type</label>
                  <input
                    type="text"
                    value={test.type}
                    onChange={(e) => handleTestChange(index, 'type', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="e.g., Blood test, Imaging, etc."
                    required
                  />
                </div>
              </div>

              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">Common Tests</label>
                <div className="flex flex-wrap gap-2">
                  {commonTests.slice(0, 6).map((testName) => (
                    <button
                      key={testName}
                      type="button"
                      onClick={() => selectCommonTest(index, testName)}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                    >
                      {testName}
                    </button>
                  ))}
                  <div className="relative group">
                    <button
                      type="button"
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                    >
                      More...
                    </button>
                    <div className="absolute hidden group-hover:block z-10 bg-white shadow-lg rounded p-2 border border-gray-200 w-64">
                      <div className="grid grid-cols-2 gap-1">
                        {commonTests.slice(6).map((testName) => (
                          <button
                            key={testName}
                            type="button"
                            onClick={() => selectCommonTest(index, testName)}
                            className="px-2 py-1 text-xs text-left bg-blue-50 text-blue-800 rounded hover:bg-blue-100"
                          >
                            {testName}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">Instructions</label>
                <textarea
                  value={test.instructions}
                  onChange={(e) => handleTestChange(index, 'instructions', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded h-16"
                  placeholder="Special instructions for this test"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Priority</label>
                <div className="flex space-x-4">
                  {['urgent', 'high', 'normal', 'low'].map((priority) => (
                    <label key={priority} className="flex items-center">
                      <input
                        type="radio"
                        checked={test.priority === priority}
                        onChange={() => handleTestChange(index, 'priority', priority)}
                        className="mr-1"
                      />
                      <span className="capitalize">{priority}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Additional Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded h-24"
            placeholder="Additional instructions or notes for the patient"
          ></textarea>
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
          >
            Submit Test Recommendations
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestRecommendation;