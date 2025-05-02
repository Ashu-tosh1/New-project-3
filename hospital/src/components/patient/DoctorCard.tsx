import React, { useState } from 'react';
import { Doctor } from '../mock/MockData';
import { Calendar, X } from 'lucide-react';
import Image from 'next/image';

interface DoctorCardProps {
  doctors: Doctor[];
  onSelectDoctor: (doctor: Doctor) => void;
}

// Helper to get weekday name
const getDayName = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

// Helper to get next 7 days
const getNextWeekDates = () => {
  const today = new Date();
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const next = new Date(today);
    next.setDate(today.getDate() + i);
    dates.push(next.toISOString().split('T')[0]);
  }
  return dates;
};

const DoctorCard: React.FC<DoctorCardProps> = ({ doctors, onSelectDoctor }) => {
  const [hoverDoctor, setHoverDoctor] = useState<number | null>(null);

  const weekDates = getNextWeekDates();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.length > 0 ? (
        doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 relative"
            onMouseEnter={() => setHoverDoctor(doctor.id)}
            onMouseLeave={() => setHoverDoctor(null)}
          >
            <div className="p-6">
              <div className="flex items-center">
                {/* <Image
                  width={80}
                  height={80}
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-20 w-20 rounded-full object-cover border-2 border-blue-100"
                /> */}
                <div className="ml-4">
                  <h3 className="font-bold text-lg text-gray-900">{doctor.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {doctor.department}
                    </span>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-600">{doctor.experience} years exp.</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectDoctor(doctor)}
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Book Appointment
              </button>
            </div>

            {/* Hover Calendar Preview */}
            {hoverDoctor === doctor.id && (
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-white shadow-lg rounded-lg z-10 p-4 flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Availability</h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setHoverDoctor(null);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-3">
                  {weekDates.map((date) => (
                    <div
                      key={date}
                      className={`text-center p-1 rounded-md ${
                        Object.keys(doctor.availability).includes(date)
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      <div className="text-xs font-medium">{getDayName(date)}</div>
                      <div className="text-xs mt-1">{new Date(date).getDate()}</div>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-gray-500 mb-2">
                  {Object.keys(doctor.availability).length} available days in the next week
                </div>

                <button
                  onClick={() => onSelectDoctor(doctor)}
                  className="mt-auto w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Book Appointment
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="col-span-3 text-center py-12">
          <div className="flex flex-col items-center justify-center">
            <Calendar className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No doctors found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
