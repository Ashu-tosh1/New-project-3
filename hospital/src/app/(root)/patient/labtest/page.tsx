"use client"
import React, { useState } from 'react';
import { 
  Microscope, 
  FileText, 
  CreditCard, 
  CheckCircle, 
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
  AlertCircle,
  Send
} from 'lucide-react';

// Define our types
type LabTest = {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  selected: boolean;
};

type LabLocation = {
  id: string;
  name: string;
  address: string;
  distance: string;
  nextAvailable: string;
  selected: boolean;
};

export default function LabComponent() {
  // Lab test workflow states
  const [currentStep, setCurrentStep] = useState(1);
  const [labTests, setLabTests] = useState<LabTest[]>([
    { 
      id: "CBC001", 
      name: "Complete Blood Count", 
      description: "Measures red and white blood cells, platelets, hemoglobin, and other blood components", 
      price: 45.99, 
      duration: "15 min",
      selected: true 
    },
    { 
      id: "LFT002", 
      name: "Liver Function Test", 
      description: "Measures enzymes and proteins to evaluate liver health and function", 
      price: 65.50, 
      duration: "20 min",
      selected: true 
    },
    { 
      id: "LP003", 
      name: "Lipid Profile", 
      description: "Measures cholesterol levels and other fats in the blood", 
      price: 55.00, 
      duration: "15 min",
      selected: true 
    },
    { 
      id: "TFT004", 
      name: "Thyroid Function Test", 
      description: "Measures thyroid hormone levels to assess thyroid function", 
      price: 75.25, 
      duration: "25 min",
      selected: false 
    },
    { 
      id: "UA005", 
      name: "Urine Analysis", 
      description: "Examines the content of urine for various markers", 
      price: 30.00, 
      duration: "10 min",
      selected: false 
    }
  ]);

  const [labLocations, setLabLocations] = useState<LabLocation[]>([
    {
      id: "LAB1",
      name: "City Central Laboratory",
      address: "123 Main St, Downtown",
      distance: "1.2 miles away",
      nextAvailable: "Today, 2:30 PM",
      selected: false
    },
    {
      id: "LAB2",
      name: "MediLab Express",
      address: "456 Oak Ave, Westside",
      distance: "2.5 miles away",
      nextAvailable: "Today, 4:15 PM",
      selected: false
    },
    {
      id: "LAB3",
      name: "HealthFirst Diagnostics",
      address: "789 Elm St, Northside",
      distance: "3.0 miles away",
      nextAvailable: "Tomorrow, 9:00 AM",
      selected: true
    }
  ]);

  const [appointmentTime, setAppointmentTime] = useState("Tomorrow, 10:30 AM");
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [resultsSent, setResultsSent] = useState(false);

  // Toggle test selection
  const toggleTestSelection = (id: string) => {
    setLabTests(labTests.map(test => 
      test.id === id ? { ...test, selected: !test.selected } : test
    ));
  };

  // Select lab location
  const selectLabLocation = (id: string) => {
    setLabLocations(labLocations.map(location => 
      location.id === id ? { ...location, selected: true } : { ...location, selected: false }
    ));
  };

  // Process payment
  const processPayment = () => {
    // Simulating payment processing
    setTimeout(() => {
      setPaymentComplete(true);
      setCurrentStep(3);
    }, 1500);
  };

  // Send results to doctor
  const sendResultsToDoctor = () => {
    // Simulating sending results
    setTimeout(() => {
      setResultsSent(true);
    }, 1500);
  };

  // Calculate total cost
  const calculateTotal = () => {
    return labTests
      .filter(test => test.selected)
      .reduce((total, test) => total + test.price, 0);
  };

  // Format price
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  // Get selected lab location
  const getSelectedLocation = () => {
    return labLocations.find(location => location.selected);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
          <div className="flex items-center mb-4">
            <Microscope size={28} className="mr-2" />
            <h1 className="text-2xl font-bold">Laboratory Services</h1>
          </div>
          <div className="flex justify-between mt-6">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-white text-purple-600' : 'bg-purple-400 text-white'
                } transition-all duration-300`}>
                  {step === 1 && <FileText size={20} />}
                  {step === 2 && <CreditCard size={20} />}
                  {step === 3 && <Microscope size={20} />}
                  {step === 4 && <Send size={20} />}
                </div>
                <div className="mt-2 text-xs font-medium text-purple-100">
                  {step === 1 && "Select Tests"}
                  {step === 2 && "Payment"}
                  {step === 3 && "Complete Tests"}
                  {step === 4 && "Send Results"}
                </div>
                {step < 4 && <div className={`h-0.5 w-16 hidden sm:block absolute translate-x-12 ${
                  currentStep > step ? 'bg-white' : 'bg-purple-400'
                }`}></div>}
              </div>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Step 1: Select Tests */}
          {currentStep === 1 && (
            <div className="animate-fadeIn">
              <div className="flex items-center mb-6">
                <FileText className="text-purple-600 mr-2" size={24} />
                <h2 className="text-xl font-bold text-gray-800">Select Lab Tests</h2>
              </div>
              
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 mb-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600 mr-3">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Doctor's Recommendations</h3>
                    <p className="text-gray-600 mt-1">Dr. Smith has recommended the following tests based on your symptoms. You can add additional tests if needed.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {labTests.map((test) => (
                  <div 
                    key={test.id}
                    className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                      test.selected 
                        ? 'border-purple-300 bg-purple-50 shadow-sm' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => toggleTestSelection(test.id)}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded mr-3 flex items-center justify-center ${
                          test.selected ? 'bg-purple-600 text-white' : 'border border-gray-300'
                        }`}>
                          {test.selected && <CheckCircle size={16} />}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{test.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{test.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-semibold text-gray-800">{formatPrice(test.price)}</span>
                        <span className="text-xs text-gray-500 mt-1">Duration: {test.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-6">
                <h3 className="font-bold text-gray-800 mb-4">Select Lab Location</h3>
                <div className="space-y-3">
                  {labLocations.map((location) => (
                    <div 
                      key={location.id}
                      className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                        location.selected 
                          ? 'border-purple-300 bg-purple-50 shadow-sm' 
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                      onClick={() => selectLabLocation(location.id)}
                    >
                      <div className="flex justify-between">
                        <div className="flex items-start">
                          <div className={`w-5 h-5 rounded-full mt-1 mr-3 flex items-center justify-center ${
                            location.selected ? 'bg-purple-600' : 'border border-gray-300'
                          }`}>
                            {location.selected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">{location.name}</h4>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <MapPin size={14} className="mr-1" />
                              {location.address}
                              <span className="mx-2">•</span>
                              {location.distance}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-green-600">
                          <Clock size={14} className="mr-1" />
                          {location.nextAvailable}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-800">Order Summary</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {labTests.filter(test => test.selected).length} tests selected at {getSelectedLocation()?.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Total Cost</div>
                    <div className="text-2xl font-bold text-gray-800">{formatPrice(calculateTotal())}</div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setCurrentStep(2)}
                className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center w-full"
                disabled={!labTests.some(test => test.selected) || !labLocations.some(location => location.selected)}
              >
                Proceed to Payment <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
          )}
          
          {/* Step 2: Payment */}
          {currentStep === 2 && (
            <div className="animate-fadeIn">
              <div className="flex items-center mb-6">
                <CreditCard className="text-purple-600 mr-2" size={24} />
                <h2 className="text-xl font-bold text-gray-800">Payment</h2>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-6">
                <h3 className="font-bold text-gray-800 mb-3">Appointment Details</h3>
                <div className="flex items-center text-gray-700 mb-2">
                  <Calendar size={18} className="mr-2 text-purple-600" />
                  <span>{appointmentTime}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin size={18} className="mr-2 text-purple-600" />
                  <span>{getSelectedLocation()?.name}, {getSelectedLocation()?.address}</span>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-gray-200 mb-6">
                <h3 className="font-bold text-gray-800 mb-4">Selected Tests</h3>
                <div className="space-y-2">
                  {labTests.filter(test => test.selected).map((test) => (
                    <div key={test.id} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-700">{test.name}</span>
                      <span className="font-medium text-gray-800">{formatPrice(test.price)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-2 pt-3">
                    <span className="font-bold text-gray-800">Total</span>
                    <span className="font-bold text-gray-800">{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-5 rounded-lg border border-gray-200 mb-6">
                <h3 className="font-bold text-gray-800 mb-4">Payment Method</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center bg-gray-50 p-3 rounded border border-gray-200">
                    <div className="w-5 h-5 rounded-full bg-purple-600 mr-3 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-800">Credit Card</span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-8 h-5 bg-blue-600 rounded"></div>
                      <div className="w-8 h-5 bg-red-500 rounded"></div>
                      <div className="w-8 h-5 bg-gray-800 rounded"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Card Number</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Cardholder Name</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Expiry Date</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">CVV</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <button 
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition duration-300 flex items-center justify-center"
                >
                  Back to Tests
                </button>
                <button 
                  onClick={processPayment}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300 flex-1 flex items-center justify-center"
                >
                  Pay {formatPrice(calculateTotal())}
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Complete Tests */}
          {currentStep === 3 && (
            <div className="animate-fadeIn">
              <div className="flex items-center mb-6">
                <Microscope className="text-purple-600 mr-2" size={24} />
                <h2 className="text-xl font-bold text-gray-800">
                  {paymentComplete ? "Payment Successful" : "Processing Payment"}
                </h2>
              </div>
              
              {paymentComplete ? (
                <div>
                  <div className="flex flex-col items-center justify-center p-8 mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Payment Complete!</h3>
                    <p className="text-gray-600 text-center">Your lab appointment has been confirmed.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-6">
                    <h3 className="font-bold text-gray-800 mb-3">Appointment Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center text-gray-700 mb-2">
                          <Calendar size={18} className="mr-2 text-purple-600" />
                          <span>{appointmentTime}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <MapPin size={18} className="mr-2 text-purple-600" />
                          <span>{getSelectedLocation()?.name}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start text-gray-700">
                          <FileText size={18} className="mr-2 mt-1 text-purple-600" />
                          <div>
                            <span className="block mb-1">Tests:</span>
                            <ul className="list-disc list-inside text-sm pl-1">
                              {labTests.filter(test => test.selected).map((test) => (
                                <li key={test.id}>{test.name}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200 mb-6">
                    <div className="flex items-start">
                      <div className="bg-yellow-100 p-2 rounded-full text-yellow-700 mr-3">
                        <AlertCircle size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">Instructions</h3>
                        <ul className="mt-2 space-y-2 text-gray-700">
                          <li className="flex items-start">
                            <div className="h-5 w-5 rounded-full bg-yellow-200 text-yellow-700 flex items-center justify-center text-xs mr-2 mt-0.5">1</div>
                            <span>Please arrive 10 minutes before your appointment</span>
                          </li>
                          <li className="flex items-start">
                            <div className="h-5 w-5 rounded-full bg-yellow-200 text-yellow-700 flex items-center justify-center text-xs mr-2 mt-0.5">2</div>
                            <span>Bring a valid ID and your insurance card</span>
                          </li>
                          <li className="flex items-start">
                            <div className="h-5 w-5 rounded-full bg-yellow-200 text-yellow-700 flex items-center justify-center text-xs mr-2 mt-0.5">3</div>
                            <span>Fast for 8-10 hours before your appointment for accurate blood tests</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setCurrentStep(4)}
                    className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center w-full"
                  >
                    Continue to Results <ChevronRight size={18} className="ml-1" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-12">
                  <div className="w-16 h-16 border-4 border-t-purple-600 border-purple-200 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600">Processing your payment...</p>
                </div>
              )}
            </div>
          )}
          
          {/* Step 4: Send Results */}
          {currentStep === 4 && (
            <div className="animate-fadeIn">
              <div className="flex items-center mb-6">
                <Send className="text-purple-600 mr-2" size={24} />
                <h2 className="text-xl font-bold text-gray-800">Lab Results</h2>
              </div>
              
              {!resultsSent ? (
                <div>
                  <div className="bg-white p-5 rounded-lg border border-gray-200 mb-6">
                    <h3 className="font-bold text-gray-800 mb-4">Your Test Results</h3>
                    <div className="bg-gray-50 p-4 rounded border border-gray-200 font-mono text-sm mb-4">
                      <p>Blood Glucose: 110 mg/dL <span className="text-yellow-600">[Slightly Elevated]</span></p>
                      <p>Hemoglobin: 14.5 g/dL <span className="text-green-600">[Normal]</span></p>
                      <p>WBC: 7,500/mcL <span className="text-green-600">[Normal]</span></p>
                      <p>Platelets: 250,000/mcL <span className="text-green-600">[Normal]</span></p>
                      <p>LDL Cholesterol: 130 mg/dL <span className="text-yellow-600">[Borderline High]</span></p>
                      <p>HDL Cholesterol: 45 mg/dL <span className="text-green-600">[Normal]</span></p>
                      <p>Triglycerides: 150 mg/dL <span className="text-yellow-600">[Borderline High]</span></p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded border border-blue-100">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> These results need to be reviewed by your doctor for proper interpretation.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100 mb-6">
                    <div className="flex items-start">
                      <div className="bg-indigo-100 p-2 rounded-full text-indigo-600 mr-3">
                        <Send size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">Send Results to Dr. Smith</h3>
                        <p className="text-gray-600 mt-1">
                          Your results will be securely transmitted to Dr. Smith for review. You'll be notified once the doctor has assessed your results.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <button 
                      className="px-6 py-3 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition duration-300 flex items-center justify-center"
                    >
                      Download Results
                    </button>
                    <button 
                      onClick={sendResultsToDoctor}
                      className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300 flex-1 flex items-center justify-center"
                    >
                      Send to Doctor <Send size={18} className="ml-2" />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col items-center justify-center p-8 mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Results Sent Successfully!</h3>
                    <p className="text-gray-600 text-center">Your lab results have been securely transmitted to Dr. Smith.</p>
                  </div>
                  
                  <div className="bg-white p-5 rounded-lg border border-gray-200 mb-6">
                    <h3 className="font-bold text-gray-800 mb-3">Next Steps</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm mr-2">1</div>
                        <div className="flex-1 pt-0.5">Dr. Smith will review your results within 24-48 hours</div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm mr-2">2</div>
                        <div className="flex-1 pt-0.5">You'll receive a notification when your results have been reviewed</div>
                      </li>
                      <li className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm mr-2">3</div>
                        <div className="flex-1 pt-0.5">Based on the results, the doctor may prescribe medications or request a follow-up visit</div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-between">
                    <button 
                      className="px-6 py-3 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition duration-300 flex items-center justify-center"
                    >
                      Download Results
                    </button>
                    <button 
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}