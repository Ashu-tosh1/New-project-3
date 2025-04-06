"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar,Clock,User,Bell,ChevronRight} from 'lucide-react';
import PatientSidebar from './PatientSidebar';
import { upcomingAppointments,recentReports,prescriptions } from '../mock/MockData';

export default function PatientDashboard() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
    {/* Sidebar */}
    <div className="w-64 bg-white shadow-lg relative">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-blue-600">MediCare</h1>
        <p className="text-gray-500 text-sm">Patient Portal</p>
      </div>
  
      <PatientSidebar />
  
      {/* User Info at Bottom */}
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <div className="flex items-center p-2 bg-blue-50 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-6 w-6 text-blue-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">John Smith</p>
          </div>
        </div>
      </div>
    </div>
  
    {/* Main Content */}
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              <Bell className="h-6 w-6 text-gray-500" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Book Appointment
            </motion.button>
          </div>
        </div>
      </header>
        
        {/* Dashboard Content */}
        <main className="max-w-7xl mx-auto py-6 px-6">
          {/* Welcome Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white mb-6"
          >
            <h2 className="text-2xl font-bold">Welcome back, John!</h2>
            <p className="mt-1">Your next appointment is on April 5, 2025 with Dr. Sarah Johnson.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-4 px-4 py-2 bg-white text-blue-600 rounded-lg font-medium flex items-center"
            >
              View Details <ChevronRight className="ml-1 h-4 w-4" />
            </motion.button>
          </motion.div>    
          {/* Appointments Section */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          >
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Upcoming Appointments</h3>

              </div>
              <div className="space-y-4">
                {upcomingAppointments.map(appointment => (
                  <motion.div 
                    key={appointment.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 border border-gray-100 rounded-lg hover:border-blue-200 transition-all"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{appointment.doctor}</h4>
                        <p className="text-sm text-gray-500">{appointment.department}</p>
                      </div>
                      <span className={`text-xs px-2 py-3 rounded-full ${
                        appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                    <div className="flex mt-3 text-sm text-gray-500">
                      <div className="flex items-center mr-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        {appointment.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {appointment.time}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Recent Reports</h3>
              </div>
              <div className="space-y-4">
                {recentReports.map(report => (
                  <motion.div 
                    key={report.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 border border-gray-100 rounded-lg hover:border-blue-200 transition-all"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <p className="text-sm text-gray-500">Date: {report.date}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        report.status === 'Ready' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {report.status}
                      </span>
                    </div>
                    {report.status === 'Ready' && (
                      <button className="mt-2 text-sm text-blue-500 hover:text-blue-700 flex items-center">
                        View Report <ChevronRight className="ml-1 h-4 w-4" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Prescriptions Section */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="bg-white p-6 rounded-xl shadow-sm mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Active Prescriptions</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {prescriptions.map(prescription => (
                    <tr key={prescription.id}>
                      <td className="px-4 py-4 whitespace-nowrap">{prescription.medication}</td>
                      <td className="px-4 py-4 whitespace-nowrap">{prescription.dosage}</td>
                      <td className="px-4 py-4 whitespace-nowrap">{prescription.frequency}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {prescription.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                        >
                          Order Refill
                        </motion.button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}