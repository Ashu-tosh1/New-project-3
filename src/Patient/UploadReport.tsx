import React, { useState } from "react";
import PatientSidebar from "./SideBar";
// import PatientSidebar from "./PatientSidebar";



const UploadReport: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [report, setReport] = useState({
    uploaded: false,
    doctorReview: "",
    medicines: [],
    additionalNotes: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      setReport({
        uploaded: true,
        doctorReview: "Your report is under review. Please wait for the doctor's feedback.",
        medicines: [],
        additionalNotes: "",
      });
      alert("Report uploaded successfully!");
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <PatientSidebar />
      <div className="flex-1 flex flex-col items-center p-6">
        <h2 className="text-3xl font-bold mb-6">Upload Medical Report</h2>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={handleFileChange}
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded-lg border"
          />
          <button
            onClick={handleUpload}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Upload Report
          </button>
        </div>
        {report.uploaded && (
          <div className="bg-gray-800 p-6 mt-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h3 className="text-2xl font-semibold">Report Details</h3>
            <p className="text-gray-300 mt-2">Doctor Review: {report.doctorReview}</p>
            <p className="text-gray-300 mt-2">Additional Notes: {report.additionalNotes || "No additional notes."}</p>
            <h4 className="text-xl font-semibold mt-4">Prescribed Medicines</h4>
            {report.medicines.length > 0 ? (
              <ul className="list-disc pl-5 mt-2">
                {report.medicines.map((med, index) => (
                  <li key={index}>{med}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-300">No medicines prescribed yet.</p>
            )}
            <div className="mt-4">
              <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 mr-2">
                View Report
              </button>
              <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
                Delete Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadReport;

