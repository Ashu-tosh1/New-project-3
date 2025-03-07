import React, { useState } from "react";
// import DoctorSidebar from "./DoctorSidebar";
import Sidebar from "./SideBar";

interface Appointment {
  id: number;
  patientName: string;
  date: string;
  time: string;
  reason: string;
}

const DoctorAppointments: React.FC = () => {
  // Dummy data for pending and scheduled appointments
  const [pendingAppointments, setPendingAppointments] = useState<Appointment[]>([
    { id: 1, patientName: "John Doe", date: "2025-03-15", time: "10:00", reason: "Routine Checkup" },
    { id: 2, patientName: "Jane Smith", date: "2025-03-16", time: "11:30", reason: "Follow-up visit" },
  ]);

  const [scheduledAppointments, setScheduledAppointments] = useState<Appointment[]>([
    { id: 3, patientName: "Alice Brown", date: "2025-03-17", time: "09:00", reason: "Consultation" },
    { id: 4, patientName: "Bob Johnson", date: "2025-03-18", time: "14:00", reason: "Therapy Session" },
  ]);

  const handleAccept = (id: number) => {
    const accepted = pendingAppointments.find((appt) => appt.id === id);
    if (accepted) {
      // Move the accepted appointment to scheduled
      setScheduledAppointments((prev) => [...prev, accepted]);
      setPendingAppointments((prev) => prev.filter((appt) => appt.id !== id));
      alert(`Accepted appointment for ${accepted.patientName}`);
    }
  };

  const handleReject = (id: number) => {
    const rejected = pendingAppointments.find((appt) => appt.id === id);
    if (rejected) {
      setPendingAppointments((prev) => prev.filter((appt) => appt.id !== id));
      alert(`Rejected appointment for ${rejected.patientName}`);
    }
  };

  const handleEdit = (id: number) => {
    // Dummy edit handler
    alert(`Edit appointment ID: ${id}`);
  };
  
  const handleMessage = (id: number) => {
    // Dummy message handler
    alert(`Send message regarding appointment ID: ${id}`);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar for doctor */}
      <Sidebar />
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Doctor Appointments</h1>

        {/* Pending Appointments Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Pending Appointment Requests</h2>
          {pendingAppointments.length === 0 ? (
            <p className="text-gray-400">No pending appointments.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 rounded-lg">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Patient</th>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Time</th>
                    <th className="py-2 px-4 border-b">Reason</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingAppointments.map((appt) => (
                    <tr key={appt.id} className="hover:bg-gray-700 transition-colors">
                      <td className="py-2 px-4 border-b">{appt.patientName}</td>
                      <td className="py-2 px-4 border-b">{appt.date}</td>
                      <td className="py-2 px-4 border-b">{appt.time}</td>
                      <td className="py-2 px-4 border-b">{appt.reason}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleAccept(appt.id)}
                          className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mr-2"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(appt.id)}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Scheduled Appointments Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Scheduled Appointments</h2>
          {scheduledAppointments.length === 0 ? (
            <p className="text-gray-400">No scheduled appointments.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 rounded-lg">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Patient</th>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Time</th>
                    <th className="py-2 px-4 border-b">Reason</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduledAppointments.map((appt) => (
                    <tr key={appt.id} className="hover:bg-gray-700 transition-colors">
                      <td className="py-2 px-4 border-b">{appt.patientName}</td>
                      <td className="py-2 px-4 border-b">{appt.date}</td>
                      <td className="py-2 px-4 border-b">{appt.time}</td>
                      <td className="py-2 px-4 border-b">{appt.reason}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleEdit(appt.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleMessage(appt.id)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
                        >
                          Message
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Extra Options Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Extra Options</h2>
          <div className="flex space-x-4">
            <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded">
              View Calendar
            </button>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded">
              Export Appointments
            </button>
            <button className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded">
              Appointment Analytics
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DoctorAppointments;
