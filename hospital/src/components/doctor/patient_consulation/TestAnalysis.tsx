/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

interface TestAnalysisProps {
  onSubmit: (data: any) => void;
  testReports: any;
}

const TestAnalysis: React.FC<TestAnalysisProps> = ({ onSubmit, testReports }) => {
  const [analyses, setAnalyses] = useState(
    testReports.reports.map((report: any) => ({
      testId: report.testId,
      testName: report.testName,
      findings: '',
      interpretation: '',
      abnormalities: '',
      recommendations: '',
    }))
  );
  
  const [summaryAnalysis, setSummaryAnalysis] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [differentialDiagnosis, setDifferentialDiagnosis] = useState('');

  const handleAnalysisChange = (index: number, field: string, value: string) => {
    const updatedAnalyses = [...analyses];
    updatedAnalyses[index] = { ...updatedAnalyses[index], [field]: value };
    setAnalyses(updatedAnalyses);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      analyses,
      summaryAnalysis,
      diagnosis,
      differentialDiagnosis
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Test Report Analysis</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-600 mb-3">Individual Test Analysis</h3>
          
          {analyses.map((analysis, index) => (
            <div key={analysis.testId} className="mb-6 p-4 border border-gray-200 rounded bg-gray-50">
              <div className="mb-3">
                <h4 className="font-medium text-gray-700">{analysis.testName}</h4>
                <div className="bg-blue-50 p-3 rounded-md mb-3">
                  <p className="text-sm text-gray-600"><strong>Lab:</strong> {testReports.reports[index].labName}</p>
                  <p className="text-sm text-gray-600"><strong>Date:</strong> {testReports.reports[index].testDate}</p>
                  <p className="text-sm text-gray-600"><strong>Results:</strong> {testReports.reports[index].results}</p>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">Clinical Findings</label>
                <textarea
                  value={analysis.findings}
                  onChange={(e) => handleAnalysisChange(index, 'findings', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded h-20"
                  placeholder="Key findings from the test results"
                  required
                ></textarea>
              </div>
              
              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">Interpretation</label>
                <textarea
                  value={analysis.interpretation}
                  onChange={(e) => handleAnalysisChange(index, 'interpretation', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded h-20"
                  placeholder="Medical interpretation of the results"
                  required
                ></textarea>
              </div>
              
              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">Abnormalities Detected</label>
                <textarea
                  value={analysis.abnormalities}
                  onChange={(e) => handleAnalysisChange(index, 'abnormalities', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded h-16"
                  placeholder="List any abnormal values or findings"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">Additional Recommendations</label>
                <textarea
                  value={analysis.recommendations}
                  onChange={(e) => handleAnalysisChange(index, 'recommendations', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded h-16"
                  placeholder="Any follow-up tests or actions recommended"
                ></textarea>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-600 mb-3">Overall Analysis</h3>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Summary Analysis</label>
            <textarea
              value={summaryAnalysis}
              onChange={(e) => setSummaryAnalysis(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded h-32"
              placeholder="Comprehensive analysis of all test results together"
              required
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Diagnosis</label>
            <textarea
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded h-20"
              placeholder="Primary diagnosis based on the test results and symptoms"
              required
            ></textarea>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Differential Diagnosis</label>
            <textarea
              value={differentialDiagnosis}
              onChange={(e) => setDifferentialDiagnosis(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded h-20"
              placeholder="Other possible diagnoses to consider"
            ></textarea>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
          >
            Proceed to Treatment
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestAnalysis;