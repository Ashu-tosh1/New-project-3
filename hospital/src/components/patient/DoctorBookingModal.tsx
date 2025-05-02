'use client';

import { useState, useEffect } from 'react';
import { CalendarIcon, Check, Clock3, X } from 'lucide-react';
import { Doctor } from '../mock/MockData';
import axios from 'axios';  // Or your preferred method for API requests

interface Props {
  selectedDoctor: Doctor;
  onClose: () => void;
}

const getDayName = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' });

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export const DoctorBookingModal = ({ selectedDoctor, onClose }: Props) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [weekStart, setWeekStart] = useState(new Date());
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [availability, setAvailability] = useState<Record<string, string[]>>({});

  // Fetch availability from the backend
  const fetchAvailability = async (doctorId: number) => {
    try {
      const response = await axios.get(`/api/doctor/${doctorId}/availability`);
      setAvailability(response.data);
    } catch (error) {
      console.error("Error fetching doctor availability:", error);
    }
  };

  useEffect(() => {
    if (selectedDoctor.id) {
      fetchAvailability(selectedDoctor.id);
    }
  }, [selectedDoctor]);

  const getWeekDates = (startDate: Date) => {
    const dates: string[] = [];
    for (let i = 0; i < 7; i++) {
      const next = new Date(startDate);
      next.setDate(startDate.getDate() + i);
      dates.push(next.toISOString().split('T')[0]);
    }
    return dates;
  };

  const weekDates = getWeekDates(weekStart);

  const handlePrevWeek = () => {
    const prev = new Date(weekStart);
    prev.setDate(prev.getDate() - 7);
    setWeekStart(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(weekStart);
    next.setDate(next.getDate() + 7);
    setWeekStart(next);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleBookAppointment = () => {
    // Mock booking logic — you can replace this with an API call
    setIsBookingComplete(true);
  };

  const handleClose = () => {
    setIsBookingComplete(false);
    setSelectedDate(null);
    setSelectedTime(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-2xl w-full z-50">
          {isBookingComplete ? (
            <div className="p-6">
              <div className="flex items-center">
                <div className="rounded-full bg-green-100 p-2">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="ml-4 text-lg font-medium text-gray-900">
                  Appointment Booked!
                </h3>
              </div>
              <p className="mt-4 text-gray-700">
                Your appointment with <strong>{selectedDoctor.name}</strong> is confirmed for:
              </p>
              <p className="mt-2 text-blue-800 font-medium">
                {formatDate(selectedDate!)} at {selectedTime}
              </p>
              <div className="mt-4 text-sm text-blue-700 bg-blue-50 p-3 rounded">
                A confirmation email has been sent. Please arrive 15 minutes early.
              </div>
              <div className="mt-6 text-right">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Book Appointment with {selectedDoctor.name}
                </h2>
                <button onClick={handleClose}>
                  <X className="h-6 w-6 text-gray-400 hover:text-gray-600" />
                </button>
              </div>

              {/* Doctor Info */}
              <div className="mt-4 flex gap-4">
                <div>
                  <h4 className="font-semibold">{selectedDoctor.name}</h4>
                  <p className="text-sm text-gray-600">{selectedDoctor.department}</p>
                  <p className="text-sm text-gray-500">{selectedDoctor.experience} years experience</p>
                  <p className="text-sm text-gray-500">{selectedDoctor.location}</p>
                </div>
              </div>

              {/* Date Picker */}
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <button onClick={handlePrevWeek} className="text-sm text-gray-600 hover:underline">
                    &lt; Previous
                  </button>
                  <span className="text-sm font-medium text-gray-800">
                    {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
                  </span>
                  <button onClick={handleNextWeek} className="text-sm text-gray-600 hover:underline">
                    Next &gt;
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {weekDates.map((date) => (
                    <div
                      key={date}
                      className={`p-2 rounded text-center text-sm cursor-pointer ${availability[date] ? (selectedDate === date ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200') : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                      onClick={() => {
                        if (availability[date]) {
                          setSelectedDate(date);
                          setSelectedTime(null);
                        }
                      }}
                    >
                      <div className="font-semibold">{getDayName(date)}</div>
                      <div>{new Date(date).getDate()}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Available Time Slots</h5>
                {selectedDate && availability[selectedDate] ? (
                  <div className="grid grid-cols-3 gap-2">
                    {availability[selectedDate].map((time) => (
                      <div
                        key={time}
                        className={`p-2 text-center rounded cursor-pointer ${selectedTime === time ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-800 hover:bg-blue-100'}`}
                        onClick={() => handleTimeSelect(time)}
                      >
                        <div className="flex justify-center items-center gap-1">
                          <Clock3 className="h-4 w-4" />
                          {time}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-2 p-4 bg-gray-50 text-center text-sm text-gray-500 rounded">
                    <CalendarIcon className="mx-auto h-6 w-6 text-gray-400 mb-2" />
                    {selectedDate ? 'No time slots available for this date.' : 'Please select a date to view time slots.'}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookAppointment}
                  disabled={!selectedTime}
                  className={`px-4 py-2 rounded text-white ${selectedTime ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
