import React, { useState } from 'react';

interface PatientInfoProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ onSubmit }) => {
  const [patientData, setPatientData] = useState({
    patientId: '',
    name: '',
    age: '',
    gender: '',
    contact: '',
    email: '',
    address: '',
    medicalHistory: '',
    allergies: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(patientData);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Patient Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Patient ID</label>
            <input
              type="text"
              name="patientId"
              value={patientData.patientId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={patientData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={patientData.age}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={patientData.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Contact Number</label>
            <input
              type="tel"
              name="contact"
              value={patientData.contact}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={patientData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={patientData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">Medical History</label>
            <textarea
              name="medicalHistory"
              value={patientData.medicalHistory}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded h-24"
              placeholder="Previous conditions, surgeries, etc."
            ></textarea>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">Allergies</label>
            <textarea
              name="allergies"
              value={patientData.allergies}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded h-16"
              placeholder="List any known allergies"
            ></textarea>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
          >
            Next: Record Symptoms
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientInfo;