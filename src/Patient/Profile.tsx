import React from "react";
import {  FaEnvelope, FaPhone, FaMapMarkerAlt, FaVenusMars, FaHeartbeat, FaWeight, FaTint } from "react-icons/fa";

const PatientProfile :React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full border-4 border-green-500 overflow-hidden">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-semibold text-green-600 mt-4">John Doe</h2>
          <p className="text-gray-600 text-sm">32 years | Male</p>
        </div>

        {/* Profile Info */}
        <div className="space-y-3">
          <div className="flex items-center border rounded-lg p-2 bg-gray-50">
            <FaEnvelope className="text-gray-400 mr-2" />
            <p className="text-gray-600 text-sm">johndoe@email.com</p>
          </div>
          <div className="flex items-center border rounded-lg p-2 bg-gray-50">
            <FaPhone className="text-gray-400 mr-2" />
            <p className="text-gray-600 text-sm">+1 234 567 890</p>
          </div>
          <div className="flex items-center border rounded-lg p-2 bg-gray-50">
            <FaMapMarkerAlt className="text-gray-400 mr-2" />
            <p className="text-gray-600 text-sm">123 Main Street, NY</p>
          </div>
          <div className="flex items-center border rounded-lg p-2 bg-gray-50">
            <FaVenusMars className="text-gray-400 mr-2" />
            <p className="text-gray-600 text-sm">Male</p>
          </div>
        </div>

        {/* Health Stats */}
        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Health Stats</h3>
        <div className="space-y-3">
          <div className="flex items-center border rounded-lg p-2 bg-gray-50">
            <FaTint className="text-gray-400 mr-2" />
            <p className="text-gray-600 text-sm">Blood Group: O+</p>
          </div>
          <div className="flex items-center border rounded-lg p-2 bg-gray-50">
            <FaHeartbeat className="text-gray-400 mr-2" />
            <p className="text-gray-600 text-sm">Heart Rate: 72 bpm</p>
          </div>
          <div className="flex items-center border rounded-lg p-2 bg-gray-50">
            <FaHeartbeat className="text-gray-400 mr-2" />
            <p className="text-gray-600 text-sm">Blood Pressure: 120/80 mmHg</p>
          </div>
          <div className="flex items-center border rounded-lg p-2 bg-gray-50">
            <FaWeight className="text-gray-400 mr-2" />
            <p className="text-gray-600 text-sm">Weight: 75 kg</p>
          </div>
        </div>

        {/* Edit Button */}
        <button className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition mt-6">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default PatientProfile;