import React, { useState, useMemo } from "react";
import Sidebar from "./SideBar";

interface Patient {
  id: number;
  name: string;
  appointmentDate: string;
  disease: string;
  reportUrl?: string;
  age: number;
  gender: string;
  contact: string;
  address: string;
  notes?: string;
}

interface AdvancedInfo {
  medicineSuggestion: string;
  testReportDescription: string;
  testFileName?: string;
  nextVisitDate: string;
  nextVisitTime: string;
}

const PatientListView: React.FC = () => {
  // Dummy patient data
  const [patients] = useState<Patient[]>([
    {
      id: 1,
      name: "John Doe",
      appointmentDate: "2025-03-15",
      disease: "Hypertension",
      reportUrl: "https://example.com/report1.pdf",
      age: 45,
      gender: "Male",
      contact: "123-456-7890",
      address: "123 Main St, Cityville",
      notes: "Patient requires follow-up in two weeks.",
    },
    {
      id: 2,
      name: "Jane Smith",
      appointmentDate: "2025-03-16",
      disease: "Diabetes",
      reportUrl: "https://example.com/report2.pdf",
      age: 50,
      gender: "Female",
      contact: "987-654-3210",
      address: "456 Elm St, Townsville",
      notes: "Monitoring blood sugar levels regularly.",
    },
    {
      id: 3,
      name: "Alice Brown",
      appointmentDate: "2025-03-17",
      disease: "Asthma",
      age: 30,
      gender: "Female",
      contact: "555-123-4567",
      address: "789 Oak St, Villagetown",
      notes: "Prescribed inhaler, review in one month.",
    },
  ]);

  // State for search & sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // State for modal and selected patient
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Advanced info state (for the current patient only)
  const [advancedInfo, setAdvancedInfo] = useState<AdvancedInfo | null>(null);
  const [isEditing, setIsEditing] = useState(true);

  // Local states for advanced info inputs
  const [medicineSuggestion, setMedicineSuggestion] = useState("");
  const [testReportDescription, setTestReportDescription] = useState("");
  const [testFile, setTestFile] = useState<File | null>(null);
  const [nextVisitDate, setNextVisitDate] = useState("");
  const [nextVisitTime, setNextVisitTime] = useState("");

  const filteredPatients = useMemo(() => {
    return patients
      .filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.disease.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime();
        } else {
          return new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime();
        }
      });
  }, [patients, searchTerm, sortOrder]);

  const openModal = (patient: Patient) => {
    setSelectedPatient(patient);
    // Reset advanced info inputs on open; if there's already saved advanced info, switch to view mode
    if (advancedInfo) {
      setIsEditing(false);
    } else {
      setMedicineSuggestion("");
      setTestReportDescription("");
      setTestFile(null);
      setNextVisitDate("");
      setNextVisitTime("");
      setIsEditing(true);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPatient(null);
    setIsModalOpen(false);
  };

  const viewPatientReport = (reportUrl?: string) => {
    if (reportUrl) {
      window.open(reportUrl, "_blank");
    } else {
      alert("No report uploaded for this patient.");
    }
  };

  const handleTestFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setTestFile(e.target.files[0]);
    }
  };

  const handleSaveAdvancedInfo = () => {
    const info: AdvancedInfo = {
      medicineSuggestion,
      testReportDescription,
      testFileName: testFile ? testFile.name : undefined,
      nextVisitDate,
      nextVisitTime,
    };
    setAdvancedInfo(info);
    setIsEditing(false);
    alert("Advanced info saved successfully!");
  };

  const handleEditAdvancedInfo = () => {
    // Allow doctor to re-edit details
    setIsEditing(true);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Patient List</h1>
        
        {/* Search & Sorting */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <input
            type="text"
            placeholder="Search by name or disease..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="w-full sm:w-1/4 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          >
            <option value="asc">Sort by Date (Asc)</option>
            <option value="desc">Sort by Date (Desc)</option>
          </select>
        </div>

        {filteredPatients.length === 0 ? (
          <p className="text-gray-400">No patients found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg">
              <thead>
                <tr>
                  <th className="py-3 px-4 border-b">Name</th>
                  <th className="py-3 px-4 border-b">Appointment Date</th>
                  <th className="py-3 px-4 border-b">Disease</th>
                  <th className="py-3 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-700 transition-colors">
                    <td className="py-3 px-4 border-b">{patient.name}</td>
                    <td className="py-3 px-4 border-b">{patient.appointmentDate}</td>
                    <td className="py-3 px-4 border-b">{patient.disease}</td>
                    <td className="py-3 px-4 border-b space-x-2">
                      <button
                        onClick={() => openModal(patient)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => viewPatientReport(patient.reportUrl)}
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                      >
                        View Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal for Detailed View / Edit of Advanced Info */}
        {isModalOpen && selectedPatient && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-3xl relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
              >
                &times;
              </button>
              <h2 className="text-3xl font-bold mb-4">{selectedPatient.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Patient Info */}
                <div className="space-y-2">
                  <p><strong>Appointment Date:</strong> {selectedPatient.appointmentDate}</p>
                  <p><strong>Disease:</strong> {selectedPatient.disease}</p>
                  <p><strong>Age:</strong> {selectedPatient.age}</p>
                  <p><strong>Gender:</strong> {selectedPatient.gender}</p>
                  <p><strong>Contact:</strong> {selectedPatient.contact}</p>
                  <p><strong>Address:</strong> {selectedPatient.address}</p>
                  {selectedPatient.notes && <p><strong>Notes:</strong> {selectedPatient.notes}</p>}
                  <button
                    onClick={() => viewPatientReport(selectedPatient.reportUrl)}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-2"
                  >
                    View Report
                  </button>
                </div>
                {/* Advanced Info Section */}
                <div className="space-y-4">
                  {isEditing ? (
                    <>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Suggest Medicine</h3>
                        <textarea
                          value={medicineSuggestion}
                          onChange={(e) => setMedicineSuggestion(e.target.value)}
                          placeholder="Enter medicine suggestions..."
                          className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
                          rows={2}
                        ></textarea>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Testing Report Description</h3>
                        <textarea
                          value={testReportDescription}
                          onChange={(e) => setTestReportDescription(e.target.value)}
                          placeholder="Enter details about the testing report..."
                          className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
                          rows={3}
                        ></textarea>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Upload Test File</h3>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.png"
                          onChange={handleTestFileChange}
                          className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
                        />
                        {testFile && <p className="mt-1 text-sm text-gray-300">File: {testFile.name}</p>}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Next Visit Date</h3>
                          <input
                            type="date"
                            value={nextVisitDate}
                            onChange={(e) => setNextVisitDate(e.target.value)}
                            className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Next Visit Time</h3>
                          <input
                            type="time"
                            value={nextVisitTime}
                            onChange={(e) => setNextVisitTime(e.target.value)}
                            className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-4 mt-4">
                        <button
                          onClick={handleSaveAdvancedInfo}
                          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
                        >
                          Save Info
                        </button>
                        <button
                          onClick={closeModal}
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    // Detailed view mode: display saved advanced info
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold mb-2">Advanced Details</h3>
                      <p><strong>Medicine Suggestion:</strong> {advancedInfo?.medicineSuggestion}</p>
                      <p><strong>Testing Report Description:</strong> {advancedInfo?.testReportDescription}</p>
                      {advancedInfo?.testFileName && (
                        <p><strong>Test File:</strong> {advancedInfo.testFileName}</p>
                      )}
                      <p>
                        <strong>Next Visit:</strong> {advancedInfo?.nextVisitDate} at {advancedInfo?.nextVisitTime}
                      </p>
                      <div className="flex justify-end">
                        <button
                          onClick={handleEditAdvancedInfo}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded"
                        >
                          Edit Details
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientListView;
