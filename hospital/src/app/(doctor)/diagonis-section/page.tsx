"use client"
import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  ClipboardList, 
  MessageSquare, 
  Settings, 
  Home, 
  Menu, 
  X, 

} from 'lucide-react';
import Link from 'next/link';

const Sidebar = ({ activePage = 'patients' }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard', id: 'dashboard' },
    { name: 'Patients', icon: Users, path: '/patients', id: 'patients' },
    { name: 'Appointments', icon: Calendar, path: '/appointments', id: 'appointments' },
    { name: 'Medical Records', icon: ClipboardList, path: '/records', id: 'records' },
    { name: 'Messages', icon: MessageSquare, path: '/messages', id: 'messages' },
    { name: 'Settings', icon: Settings, path: '/settings', id: 'settings' },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          onClick={toggleMobileSidebar}
          className="p-2 bg-blue-600 text-white rounded-md"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-20 flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-md bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">MD</span>
              </div>
              <h1 className="ml-2 text-xl font-bold text-gray-800">MediCare</h1>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md text-gray-500 hover:bg-gray-100 hidden lg:block"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className={`p-4 border-b border-gray-200 ${isCollapsed ? 'text-center' : ''}`}>
          <div className="relative inline-block">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <span className="font-semibold">DR</span>
            </div>
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
          {!isCollapsed && (
            <div className="mt-2">
              <h2 className="font-medium text-gray-800">Dr. Sarah Miller</h2>
              <p className="text-xs text-gray-500">General Practitioner</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className={`flex items-center p-3 rounded-md transition-colors ${
                    activePage === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <item.icon size={20} className={isCollapsed ? '' : 'mr-3'} />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;