import React, { useState } from 'react'

import { Calendar,User,FileText,ShoppingBag,Settings, MessageSquare,Home,HeartPulse,Pill} from 'lucide-react';

import {motion} from "framer-motion"

const PatientSidebar = () => {

    const [activeMenu, setActiveMenu] = useState('dashboard');
  
    const menuItems = [
      { id: 'dashboard', name: 'Dashboard', icon: Home },
      { id: 'appointments', name: 'Appointments', icon: Calendar },
      { id: 'doctors', name: 'Find Doctors', icon: User },
      { id: 'reports', name: 'Medical Reports', icon: FileText },
      { id: 'pharmacy', name: 'Pharmacy', icon: ShoppingBag },
      { id: 'prescriptions', name: 'Prescriptions', icon: Pill },
      { id: 'healthMetrics', name: 'Health Metrics', icon: HeartPulse },
      { id: 'messages', name: 'Messages', icon: MessageSquare },
      { id: 'settings', name: 'Settings', icon: Settings },
    ];
  



    return (
        <div className="mt-6">
        {menuItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ x: 5, backgroundColor: "#f3f4ff" }}
            className={`flex items-center px-4 py-3 cursor-pointer ${activeMenu === item.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''}`}
            onClick={() => setActiveMenu(item.id)}
          >
            <item.icon className={`mr-3 h-5 w-5 ${activeMenu === item.id ? 'text-blue-500' : 'text-gray-500'}`} />
            <span className={`${activeMenu === item.id ? 'text-blue-700 font-medium' : 'text-gray-600'}`}>
              {item.name}
            </span>
          </motion.div>
        ))}
      </div>
  )
}

export default PatientSidebar