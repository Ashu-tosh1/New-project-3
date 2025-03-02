// components/Sidebar.tsx
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-900 text-white w-64 h-screen p-4">
      {/* Logo or Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">MyHospital</h1>
      </div>

      {/* Navigation Links */}
      <nav>
        <ul className="space-y-2">
          <li>
            <a href="#" className="block py-2 px-3 rounded hover:bg-gray-700">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 rounded hover:bg-gray-700">
              Appointments
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 rounded hover:bg-gray-700">
              Patients
            </a>
          </li>
          <li>
            <a href="#" className="block py-2 px-3 rounded hover:bg-gray-700">
              Reports
            </a>
          </li>
          {/* Add more as needed */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
