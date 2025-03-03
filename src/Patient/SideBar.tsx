// components/PatientSidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';




const PatientSidebar: React.FC = () => {
  return (
    <aside className="bg-gray-900 text-white w-64 h-screen p-4">
      {/* Logo / Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">MyHospital</h1>
      </div>

      {/* Nav Links */}
      <nav>
        <ul className="space-y-2">
          <li>
            <Link to={"/"}  className="block py-2 px-3 rounded hover:bg-gray-700">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to={"/book"} className="block py-2 px-3 rounded hover:bg-gray-700">
              Book Appointment
            </Link>
          </li>
          <li>
            <Link to={"#"} className="block py-2 px-3 rounded hover:bg-gray-700">
              Appointment Status
            </Link>
          </li>
          <li>
            <Link to={"#"} className="block py-2 px-3 rounded hover:bg-gray-700">
              View Doctors
            </Link>
          </li>
          <li>
            <Link to={"#"} className="block py-2 px-3 rounded hover:bg-gray-700">
              Payment Slips
            </Link>
          </li>
          <li>
            <Link to={"#"} className="block py-2 px-3 rounded hover:bg-gray-700">
              Upload Reports
            </Link>
          </li>
          {/* Additional Ideas */}
          <li>
            <Link to={"#"} className="block py-2 px-3 rounded hover:bg-gray-700">
              Health Summary
            </Link>
          </li>
          <li>
            <Link to={"#"} className="block py-2 px-3 rounded hover:bg-gray-700">
              Messages
            </Link>
          </li>
          <li>
            <Link to={"#"} className="block py-2 px-3 rounded hover:bg-gray-700">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default PatientSidebar;
