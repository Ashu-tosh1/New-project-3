"use client"
import React, { useState } from 'react';
import { ChevronLeft, Minus, Plus, X, ShoppingCart, CreditCard } from 'lucide-react';
import Image from 'next/image';

const initialMedications = [
  {
    id: 1,
    name: "Acetaminophen 500mg",
    price: 9.99,
    image: "/api/placeholder/80/80",
    description: "Pain reliever and fever reducer",
    quantity: 1,
    prescription: false,
    discountPercent: 0
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    price: 24.99,
    image: "/api/placeholder/80/80",
    description: "Antibiotic for bacterial infections",
    quantity: 1,
    prescription: true,
    discountPercent: 5
  },
  {
    id: 3,
    name: "Lisinopril 10mg",
    price: 19.5,
    image: "/api/placeholder/80/80",
    description: "ACE inhibitor for blood pressure",
    quantity: 2,
    prescription: true,
    discountPercent: 0
  },
  {
    id: 4,
    name: "Vitamin D3 2000 IU",
    price: 14.75,
    image: "/api/placeholder/80/80",
    description: "Dietary supplement for bone health",
    quantity: 1,
    prescription: false,
    discountPercent: 10
  }
];

const PharmacyCart = () => {
  const [medications, setMedications] = useState(initialMedications);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = medications.reduce((total, med) => total + (med.price * med.quantity), 0);
  const discount = medications.reduce((total, med) => {
    return total + ((med.price * med.quantity) * med.discountPercent / 100);
  }, 0);
  const shipping = 5.99;
  const total = subtotal - discount + shipping;

  const updateQuantity = (id :number, newQuantity:number) => {
    if (newQuantity < 1) return;
    setMedications(medications.map(med =>
      med.id === id ? { ...med, quantity: newQuantity } : med
    ));
  };

  const removeItem = (id : number) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button className="p-1 rounded hover:bg-blue-500 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Your Pharmacy Cart</h1>
        </div>
        <div className="flex items-center space-x-3">
          <ShoppingCart size={24} />
          <span className="bg-white text-blue-600 font-bold px-2 py-1 rounded-full">
            {medications.length}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Medications ({medications.length})</h2>
          {medications.length > 0 ? (
            medications.map((med) => (
              <div key={med.id} className="flex border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  <Image width={1} height={1} src={med.image} alt={med.name} className="w-full h-full object-cover" />
                </div>
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-800">{med.name}</h3>
                    <button
                      onClick={() => removeItem(med.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{med.description}</p>
                  {med.prescription && (
                    <span className="inline-block mt-2 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                      Prescription Required
                    </span>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => updateQuantity(med.id, med.quantity - 1)}
                        className="px-2 py-1 text-gray-500 hover:bg-gray-100 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3 py-1">{med.quantity}</span>
                      <button
                        onClick={() => updateQuantity(med.id, med.quantity + 1)}
                        className="px-2 py-1 text-gray-500 hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-800">
                        ${(med.price * med.quantity).toFixed(2)}
                      </div>
                      {med.discountPercent > 0 && (
                        <div className="text-sm font-medium text-green-600">
                          {med.discountPercent}% OFF
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Browse Medications
              </button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-6 h-fit">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Discount</span>
              <span className="font-medium text-green-600">- ${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">${shipping.toFixed(2)}</span>
            </div>
            <div className="h-px bg-gray-200 my-2"></div>
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() => setIsCheckingOut(true)}
            disabled={medications.length === 0}
            className={`w-full mt-6 py-3 flex items-center justify-center space-x-2 rounded-md text-white font-medium transition-all transform hover:translate-y-[-2px]
              ${medications.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
              }`}
          >
            <CreditCard size={18} />
            <span>Proceed to Checkout</span>
          </button>
          
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckingOut && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-scaleIn">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Complete Your Order</h2>
            <p className="text-gray-600 mb-6">
              This is a demo checkout screen. In a real application, payment integration would be implemented here.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsCheckingOut(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Order placed successfully!');
                  setIsCheckingOut(false);
                  setMedications([]);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Optional Animation Styles */}
      { <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style> }
    </div>
  );
};

export default PharmacyCart;
