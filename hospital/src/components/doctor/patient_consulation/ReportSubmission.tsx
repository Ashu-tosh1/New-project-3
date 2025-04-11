/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

interface ReportSubmissionProps {
  onSubmit: (data: any) => void;
  recommendedTests: any;
}

const ReportSubmission: React.FC<ReportSubmissionProps> = ({ onSubmit, recommendedTests }) => {
  const [reports, setReports] = useState(
    recommendedTests.tests.map((test: any) => ({
      testId: test.id,
      testName: test.name,
      results: '',
      labName: '',
      testDate: '',
      fileUploaded: false,
      notes: ''
    }))
  );

  const handleReportChange = (index: number, field: string, value: string | boolean) => {
    const updatedReports = [...reports];
    updatedReports[index] = { ...updatedReports[index], [field]: value };
    setReports(updatedReports);
  };

  const simulateFileUpload = (index: number) => {
    handleReportChange(index, 'fileUploaded', true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      reports
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Test Report Submission</h2>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">Test Reports to Submit</h3>
        <p className="text-gray-700 mb-2">
          Please enter the results for the following tests recommended by the doctor:
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {reports.map((report, index) => (
          <div key={report.testId} className="mb-6 p-4 border border-gray-200 rounded bg-gray-50">
            <div className="mb-3">
              <h4 className="font-medium text-gray-700">{report.testName}</h4>
              <span className={`text-sm px-2 py-1 rounded ${getPriorityBadgeColor(
                recommendedTests.tests.find((t: any) => t.id === report.testId)?.priority || 'normal'
              )}`}>
                {recommendedTests.tests.find((t: any) => t.id === report.testId)?.priority || 'normal'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Laboratory/Facility Name</label>
                <input
                  type="text"
                  value={report.labName}onChange={(e) => handleReportChange(index, 'labName', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter lab name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Test Date</label>
                <input
                  type="date"
                  value={report.testDate}
                  onChange={(e) => handleReportChange(index, 'testDate', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>
            
            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Test Results</label>
              <textarea
                value={report.results}
                onChange={(e) => handleReportChange(index, 'results', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded h-24"
                placeholder="Enter detailed test results here"
                required
              ></textarea>
            </div>
            
            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Upload Report File (Optional)</label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  className="hidden"
                  id={`file-upload-${report.testId}`}
                  accept=".pdf,.jpg,.png,.doc,.docx"
                />
                <label 
                  htmlFor={`file-upload-${report.testId}`}
                  className="cursor-pointer bg-white border border-gray-300 rounded px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => simulateFileUpload(index)}
                >
                  Choose File
                </label>
                <span className="text-sm text-gray-600">
                  {report.fileUploaded ? 'File uploaded' : 'No file chosen'}
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-1">Additional Notes</label>
              <textarea
                value={report.notes}
                onChange={(e) => handleReportChange(index, 'notes', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded h-16"
                placeholder="Any additional information about the test or results"
              ></textarea>
            </div>
          </div>
        ))}

        <div className="mt-6 flex justify-end">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
          >
            Submit Test Reports
          </button>
        </div>
      </form>
    </div>
  );
};

// Helper function to get appropriate color class for priority badges
const getPriorityBadgeColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-100 text-red-800';
    case 'high':
      return 'bg-orange-100 text-orange-800';
    case 'normal':
      return 'bg-blue-100 text-blue-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default ReportSubmission;