"use client"
import React, { useState } from 'react';
import {
  Calendar,
  FileText,
  User,
  Settings,
  MessageSquare,
  HeartPulse,
  Stethoscope,
  ClipboardCheck,
  FolderOpen
} from 'lucide-react';

import { motion } from 'framer-motion';

const DoctorSidebar = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Stethoscope },
    { id: 'appointments', name: 'Appointments', icon: Calendar },  
    { id: 'patients', name: 'My Patients', icon: User },
    { id: 'diagnosis', name: 'Diagnoses', icon: ClipboardCheck },
    { id: 'reports', name: 'Medical Reports', icon: FileText },
    { id: 'messages', name: 'Messages', icon: MessageSquare },
    { id: 'healthInsights', name: 'Health Insights', icon: HeartPulse },
    { id: 'documents', name: 'Documents', icon: FolderOpen },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen relative">
      {/* Top Branding Section */}
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-blue-600">MediCare</h1>
        <p className="text-gray-500 text-sm">Doctor Portal</p>
      </div>

      {/* Sidebar Menu */}
      <div className="mt-6">
        {menuItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ x: 5, backgroundColor: "#f3f4ff" }}
            className={`flex items-center px-4 py-3 cursor-pointer transition-all rounded-lg ${
              activeMenu === item.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
            }`}
            onClick={() => setActiveMenu(item.id)}
          >
            <item.icon
              className={`mr-3 h-5 w-5 ${
                activeMenu === item.id ? 'text-blue-500' : 'text-gray-500'
              }`}
            />
            <span
              className={`${
                activeMenu === item.id ? 'text-blue-700 font-medium' : 'text-gray-600'
              }`}
            >
              {item.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DoctorSidebar;
