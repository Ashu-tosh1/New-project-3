/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

// import { Medicine } from "@prisma/client";
import React, { useState } from "react";

const medicines = [
  { id: 1, name: "Paracetamol", disease: "Fever", price: 50 },
  { id: 2, name: "Ibuprofen", disease: "Pain Relief", price: 100 },
  { id: 3, name: "Metformin", disease: "Diabetes", price: 150 },
  { id: 4, name: "Salbutamol", disease: "Asthma", price: 120 },
];

const PharmacyPortal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("");
  const [cart, setCart] = useState([]);

  const filteredMedicines = medicines.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.disease.toLowerCase().includes(selectedDisease.toLowerCase())
  );

  const addToCart = (medicine:never) => {
    setCart([...cart, medicine]);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Hospital Pharmacy</h1>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search for medicine..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/3 p-3 rounded-lg bg-white border border-gray-300"
        />
        <select
          value={selectedDisease}
          onChange={(e) => setSelectedDisease(e.target.value)}
          className="w-full sm:w-1/4 p-3 rounded-lg bg-white border border-gray-300"
        >
          <option value="">Sort by Disease</option>
          <option value="Fever">Fever</option>
          <option value="Pain Relief">Pain Relief</option>
          <option value="Diabetes">Diabetes</option>
          <option value="Asthma">Asthma</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.map((medicine) => (
          <div key={medicine.id} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">{medicine.name}</h2>
            <p className="text-gray-600">For: {medicine.disease}</p>
            <p className="text-gray-800 font-semibold">₹{medicine.price}</p>
            <button
              onClick={() => addToCart(medicine)}
              className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* View Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg cursor-pointer hover:bg-green-600">
          View Cart ({cart.length})
        </div>
      )}
    </div>
  );
};

export default PharmacyPortal;