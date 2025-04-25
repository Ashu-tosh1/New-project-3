"use client"
import React, { useState } from 'react';
import { Calendar, Clock, Search, Plus } from 'lucide-react';

import Sidebar from '../diagonis-section/page';


// Main Appointments Component
const Appointments = () => {
  const [filter, setFilter] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample appointment data
  const appointments = [
    { id: 1, patient: 'James Wilson', time: '09:00 AM', date: '2025-04-25', status: 'confirmed', type: 'Checkup' },
    { id: 2, patient: 'Emma Thompson', time: '10:30 AM', date: '2025-04-25', status: 'confirmed', type: 'Consultation' },
    { id: 3, patient: 'Robert Garcia', time: '01:15 PM', date: '2025-04-25', status: 'pending', type: 'Follow-up' },
    { id: 4, patient: 'Sarah Johnson', time: '03:45 PM', date: '2025-04-26', status: 'confirmed', type: 'Vaccination' },
    { id: 5, patient: 'Michael Brown', time: '11:00 AM', date: '2025-04-27', status: 'cancelled', type: 'Specialist Referral' }
  ];
  
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'upcoming') {
      return matchesSearch && (appointment.status === 'confirmed' || appointment.status === 'pending');
    } else if (filter === 'confirmed') {
      return matchesSearch && appointment.status === 'confirmed';
    } else if (filter === 'pending') {
      return matchesSearch && appointment.status === 'pending';
    } else if (filter === 'cancelled') {
      return matchesSearch && appointment.status === 'cancelled';
    }
    return matchesSearch;
  });

  return (
    <div className="flex">
      <Sidebar activePage="appointments" />
      <div className="flex-1 lg:ml-64 transition-all duration-300">
        <div className="p-6 bg-blue-50 min-h-screen">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-blue-800 mt-8 lg:mt-0">Appointments</h1>
            <p className="text-gray-600">Manage your upcoming patient appointments</p>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search appointments..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              <button 
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${filter === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setFilter('upcoming')}
              >
                Upcoming
              </button>
              <button 
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${filter === 'confirmed' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setFilter('confirmed')}
              >
                Confirmed
              </button>
              <button 
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setFilter('pending')}
              >
                Pending
              </button>
              <button 
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${filter === 'cancelled' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                onClick={() => setFilter('cancelled')}
              >
                Cancelled
              </button>
            </div>
            
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 w-full md:w-auto justify-center">
              <Plus className="h-4 w-4" />
              New Appointment
            </button>
          </div>
          
          {/* Calendar Overview */}
          <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-blue-600" />
              Today&apos;s Schedule
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAppointments.slice(0, 3).map(appointment => (
                <div 
                  key={appointment.id} 
                  className="border border-gray-100 p-4 rounded-lg hover:shadow-md transition-shadow duration-200 bg-gradient-to-r from-blue-50 to-white"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-blue-800">{appointment.patient}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                      appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">{appointment.type}</div>
                  <div className="flex items-center mt-3 text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1 text-blue-500" />
                    {appointment.time} - {appointment.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Appointment List */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">All Appointments</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAppointments.map(appointment => (
                    <tr key={appointment.id} className="hover:bg-blue-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{appointment.patient}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{appointment.date}</div>
                        <div className="text-sm text-gray-900">{appointment.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                          appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        <button className="mr-2 hover:text-blue-800">View</button>
                        <button className="mr-2 hover:text-blue-800">Edit</button>
                        <button className="hover:text-red-600">Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;