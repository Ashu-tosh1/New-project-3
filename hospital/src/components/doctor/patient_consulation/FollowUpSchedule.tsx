/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

interface FollowUpSchedulerProps {
  onSubmit: (data: any) => void;
  patientData: any;
}

const FollowUpScheduler: React.FC<FollowUpSchedulerProps> = ({ onSubmit, patientData }) => {
  const [followUpDate, setFollowUpDate] = useState('');
  const [followUpTime, setFollowUpTime] = useState('');
  const [followUpType, setFollowUpType] = useState('in-person');
  const [followUpReason, setFollowUpReason] = useState('');
  const [preparationInstructions, setPreparationInstructions] = useState('');
  const [reminders, setReminders] = useState(true);

  // Calculate date 2 weeks from now for default suggestion
  const twoWeeksFromNow = new Date();
  twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
  const defaultDateSuggestion = twoWeeksFromNow.toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      followUpDate,
      followUpTime,
      followUpType,
      followUpReason,
      preparationInstructions,
      reminders
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Schedule Follow-up</h2>
        <div className="text-sm text-gray-600">
          <p>Patient: <span className="font-semibold">{patientData.name}</span></p>
          <p>ID: <span className="font-semibold">{patientData.patientId}</span></p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-700 mb-2">Follow-up Date</label>
            <input
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              min={new Date().toISOString().split('T')[0]}
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Suggested: <button 
                type="button" 
                className="text-blue-600 hover:underline" 
                onClick={() => setFollowUpDate(defaultDateSuggestion)}
              >
                2 weeks from today
              </button>
            </p>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Follow-up Time</label>
            <input
              type="time"
              value={followUpTime}
              onChange={(e) => setFollowUpTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Appointment Type</label>
          <div className="flex space-x-4">
            {['in-person', 'video', 'phone'].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="radio"
                  checked={followUpType === type}
                  onChange={() => setFollowUpType(type)}
                  className="mr-2"
                  name="followUpType"
                />
                <span className="capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Reason for Follow-up</label>
          <textarea
            value={followUpReason}
            onChange={(e) => setFollowUpReason(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded h-24"
            placeholder="Detailed reason for the follow-up appointment"
            required
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Preparation Instructions</label>
          <textarea
            value={preparationInstructions}
            onChange={(e) => setPreparationInstructions(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded h-24"
            placeholder="Any preparations the patient should make before the appointment"
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              checked={reminders}
              onChange={(e) => setReminders(e.target.checked)}
              className="mr-2"
            />
            Send reminders to patient (24 hours before appointment)
          </label>
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
          >
            Schedule Follow-up & Complete
          </button>
        </div>
      </form>
    </div>
  );
};

export default FollowUpScheduler;