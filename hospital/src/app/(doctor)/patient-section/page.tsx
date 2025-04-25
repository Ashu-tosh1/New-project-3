"use client"
import React, { useState } from 'react';
import { User, Search, Plus, ChevronRight, Phone, Mail, Clipboard, Heart } from 'lucide-react';

const Patients = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Sample patient data
  const patients = [
    { 
      id: 1, 
      name: 'James Wilson', 
      age: 42, 
      gender: 'Male', 
      phone: '(555) 123-4567', 
      email: 'james.wilson@example.com', 
      lastVisit: '2025-04-10', 
      condition: 'Hypertension',
      status: 'active',
      upcomingAppointment: '2025-04-25'
    },
    { 
      id: 2, 
      name: 'Emma Thompson', 
      age: 35, 
      gender: 'Female', 
      phone: '(555) 234-5678', 
      email: 'emma.t@example.com', 
      lastVisit: '2025-04-15', 
      condition: 'Pregnancy - 2nd trimester',
      status: 'active',
      upcomingAppointment: '2025-04-25'
    },
    { 
      id: 3, 
      name: 'Robert Garcia', 
      age: 58, 
      gender: 'Male', 
      phone: '(555) 345-6789', 
      email: 'robert.g@example.com', 
      lastVisit: '2025-03-22', 
      condition: 'Diabetes Type 2',
      status: 'critical',
      upcomingAppointment: '2025-04-25'
    },
    { 
      id: 4, 
      name: 'Sarah Johnson', 
      age: 29, 
      gender: 'Female', 
      phone: '(555) 456-7890', 
      email: 'sarah.j@example.com', 
      lastVisit: '2025-04-18', 
      condition: 'Asthma',
      status: 'active',
      upcomingAppointment: '2025-04-26'
    },
    { 
      id: 5, 
      name: 'Michael Brown', 
      age: 67, 
      gender: 'Male', 
      phone: '(555) 567-8901', 
      email: 'michael.b@example.com', 
      lastVisit: '2025-04-05', 
      condition: 'Arthritis',
      status: 'inactive',
      upcomingAppointment: null
    }
  ];
  
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'active') return matchesSearch && patient.status === 'active';
    if (activeFilter === 'critical') return matchesSearch && patient.status === 'critical';
    if (activeFilter === 'inactive') return matchesSearch && patient.status === 'inactive';
    
    return matchesSearch;
  });

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-800">My Patients</h1>
        <p className="text-gray-600">Manage and view your patient records</p>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search patients..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            className={`px-4 py-2 rounded-lg ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${activeFilter === 'active' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setActiveFilter('active')}
          >
            Active
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${activeFilter === 'critical' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setActiveFilter('critical')}
          >
            Critical
          </button>
          <button 
            className={`px-4 py-2 rounded-lg ${activeFilter === 'inactive' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setActiveFilter('inactive')}
          >
            Inactive
          </button>
        </div>
        
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 w-full md:w-auto justify-center">
          <Plus className="h-4 w-4" />
          Add New Patient
        </button>
      </div>
      
      {/* Patient Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Patient List</h2>
            </div>
            <div className="overflow-y-auto max-h-screen">
              {filteredPatients.map(patient => (
                <div 
                  key={patient.id}
                  className={`flex items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors duration-150 ${selectedPatient?.id === patient.id ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <User className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900">{patient.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        patient.status === 'active' ? 'bg-green-100 text-green-800' : 
                        patient.status === 'critical' ? 'bg-red-100 text-red-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {patient.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">{patient.gender}, {patient.age} years</div>
                    <div className="text-sm text-gray-600 mt-1">{patient.condition}</div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Patient Details */}
        <div className="lg:col-span-1">
          {selectedPatient ? (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto">
                  <User className="h-10 w-10" />
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900">{selectedPatient.name}</h2>
                <p className="text-gray-500">{selectedPatient.gender}, {selectedPatient.age} years</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-gray-600">{selectedPatient.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-gray-600">{selectedPatient.email}</span>
                </div>
                <div className="flex items-center">
                  <Clipboard className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-gray-600">Last visit: {selectedPatient.lastVisit}</span>
                </div>
                <div className="flex items-center">
                  <Heart className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-gray-600">{selectedPatient.condition}</span>
                </div>
              </div>
              
              {selectedPatient.upcomingAppointment && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-800">Upcoming Appointment</h3>
                  <p className="text-gray-600 mt-1">{selectedPatient.upcomingAppointment}</p>
                </div>
              )}
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  View Records
                </button>
                <button className="bg-white border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                  Schedule Visit
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center justify-center h-64">
              <User className="h-12 w-12 text-gray-300 mb-2" />
              <p className="text-gray-500 text-center">Select a patient to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Patients;