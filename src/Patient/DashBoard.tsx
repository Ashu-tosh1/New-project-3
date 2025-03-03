// app/patient/page.tsx (Next.js App Router)
'use client';

import React from 'react';
// import PatientSidebar from '@/components/PatientSidebar
import PatientSidebar from './SideBar';

interface Appointment {
  id: number;
  date: string;
  time: string;
  doctorName: string;
  status: string;
}

const mockAppointments: Appointment[] = [
  { id: 1, date: '2025-03-10', time: '10:00 AM', doctorName: 'Dr. Smith', status: 'Scheduled' },
  { id: 2, date: '2025-03-15', time: '02:00 PM', doctorName: 'Dr. Adams', status: 'Pending' },
];

interface PaymentSlip {
  id: number;
  date: string;
  amount: number;
  status: string;
}

const mockPayments: PaymentSlip[] = [
  { id: 1, date: '2025-02-28', amount: 150, status: 'Paid' },
  { id: 2, date: '2025-03-01', amount: 300, status: 'Unpaid' },
];

const  PatientDashboardPage : React.FC = () => {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <PatientSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>

        {/* Top Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Total Appointments</h2>
            <p className="text-2xl">8</p>
          </div>
          <div className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Pending Payments</h2>
            <p className="text-2xl">$300</p>
          </div>
          <div className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Uploaded Reports</h2>
            <p className="text-2xl">12</p>
          </div>
          <div className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Messages</h2>
            <p className="text-2xl">2</p>
          </div>
        </div>

        {/* Appointment Status Table */}
        <div className="bg-gray-800 rounded shadow mb-6">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Appointment Status</h2>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-2 px-4 text-left">SL.NO</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Time</th>
                  <th className="py-2 px-4 text-left">Doctor</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-4 text-center text-gray-400">
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  mockAppointments.map((appt) => (
                    <tr key={appt.id} className="border-b border-gray-700">
                      <td className="py-2 px-4">{appt.id}</td>
                      <td className="py-2 px-4">{appt.date}</td>
                      <td className="py-2 px-4">{appt.time}</td>
                      <td className="py-2 px-4">{appt.doctorName}</td>
                      <td className="py-2 px-4">{appt.status}</td>
                      <td className="py-2 px-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded">
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Slip Table */}
        <div className="bg-gray-800 rounded shadow mb-6">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Payment Slips</h2>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-2 px-4 text-left">SL.NO</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Amount</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockPayments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-gray-400">
                      No payments found
                    </td>
                  </tr>
                ) : (
                  mockPayments.map((pay) => (
                    <tr key={pay.id} className="border-b border-gray-700">
                      <td className="py-2 px-4">{pay.id}</td>
                      <td className="py-2 px-4">{pay.date}</td>
                      <td className="py-2 px-4">${pay.amount}</td>
                      <td className="py-2 px-4">{pay.status}</td>
                      <td className="py-2 px-4">
                        <button className="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded">
                          View Slip
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Health Summary / Extra Widget */}
        <div className="bg-gray-800 rounded shadow">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Health Summary</h2>
          </div>
          <div className="p-4">
            <p className="text-gray-200">No data available yet.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PatientDashboardPage