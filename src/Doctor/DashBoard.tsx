import React from 'react'
import Sidebar from './SideBar';

interface Appointment {
  id: number;
  patientName: string;
  description: string;
  date: string;
  status: string;
}

const mockAppointments: Appointment[] = [
  {
    id: 1,
    patientName: 'John Doe',
    description: 'General Checkup',
    date: '2025-03-02 10:00 AM',
    status: 'Scheduled',
  },
  {
    id: 2,
    patientName: 'Jane Smith',
    description: 'Follow-up Visit',
    date: '2025-03-05 02:00 PM',
    status: 'Pending',
  },
  {
    id: 3,
    patientName: 'Mark Johnson',
    description: 'Lab Results Discussion',
    date: '2025-03-07 09:00 AM',
    status: 'Completed',
  },
];



const DashBoard :React.FC = () => {
    return (
      <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
     <Sidebar/>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Doctor Dashboard</h1>

        {/* Top Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Patients</h2>
            <p className="text-2xl">700</p>
          </div>
          <div className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Appointments</h2>
            <p className="text-2xl">420</p>
          </div>
          <div className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Doctors</h2>
            <p className="text-2xl">82</p>
          </div>
          <div className="bg-gray-800 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Representatives</h2>
            <p className="text-2xl">4</p>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-gray-800 rounded shadow mb-6">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-2 px-4 text-left">SL.NO</th>
                  <th className="py-2 px-4 text-left">Patient Name</th>
                  <th className="py-2 px-4 text-left">Description</th>
                  <th className="py-2 px-4 text-left">Date/Time</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockAppointments.map((appt) => (
                  <tr key={appt.id} className="border-b border-gray-700">
                    <td className="py-2 px-4">{appt.id}</td>
                    <td className="py-2 px-4">{appt.patientName}</td>
                    <td className="py-2 px-4">{appt.description}</td>
                    <td className="py-2 px-4">{appt.date}</td>
                    <td className="py-2 px-4">{appt.status}</td>
                    <td className="py-2 px-4">
                      <button className="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inbox/Notifications Table */}
        <div className="bg-gray-800 rounded shadow">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Inbox / Notifications</h2>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-2 px-4 text-left">SL.NO</th>
                  <th className="py-2 px-4 text-left">Sender Name</th>
                  <th className="py-2 px-4 text-left">Subject</th>
                  <th className="py-2 px-4 text-left">Message</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Example empty state */}
                <tr>
                  <td
                    className="py-2 px-4 text-center text-gray-400\"
                    colSpan={6}
                  >
                    No data available in table
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashBoard


  