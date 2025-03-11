import React, { useState, useMemo } from "react";

interface Doctor {
  id: number;
  name: string;
  department: string;
  specialization: string;
  workingDays: string;
  workingHours: string;
  photo: string;
  rating: number;
}

const DoctorProfilePage: React.FC = () => {
  // Dummy data; in a real app, this could come from an API
  const [doctors] = useState<Doctor[]>([
    {
      id: 1,
      name: "Dr. Alice Johnson",
      department: "Cardiology",
      specialization: "Heart Specialist",
      workingDays: "Mon, Wed, Fri",
      workingHours: "09:00 AM - 03:00 PM",
      photo: "https://via.placeholder.com/150",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Dr. Bob Smith",
      department: "Neurology",
      specialization: "Brain & Nerve",
      workingDays: "Tue, Thu",
      workingHours: "10:00 AM - 04:00 PM",
      photo: "https://via.placeholder.com/150",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Dr. Carol Lee",
      department: "Dermatology",
      specialization: "Skin Specialist",
      workingDays: "Mon, Tue, Wed",
      workingHours: "11:00 AM - 05:00 PM",
      photo: "https://via.placeholder.com/150",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Dr. David Kim",
      department: "Orthopedics",
      specialization: "Bone & Joint",
      workingDays: "Fri, Sat",
      workingHours: "08:00 AM - 02:00 PM",
      photo: "https://via.placeholder.com/150",
      rating: 4.6,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<"name" | "department" | "specialization">("name");

  const filteredDoctors = useMemo(() => {
    return doctors
      .filter(
        (doc) =>
          doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortKey === "name") {
          return a.name.localeCompare(b.name);
        } else if (sortKey === "department") {
          return a.department.localeCompare(b.department);
        } else {
          return a.specialization.localeCompare(b.specialization);
        }
      });
  }, [doctors, searchTerm, sortKey]);

  const handleBookNow = (doctor: Doctor) => {
    // For now, just show an alert. In a real app, route to booking page.
    alert(`Booking appointment with ${doctor.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Find Your Doctor</h1>
        
        {/* Filter & Sorting Options */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Search by name, department or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
          />
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as "name" | "department" | "specialization")}
            className="w-full md:w-1/4 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          >
            <option value="name">Sort by Name</option>
            <option value="department">Sort by Department</option>
            <option value="specialization">Sort by Specialization</option>
          </select>
        </div>
        
        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
              <img src={doctor.photo} alt={doctor.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-1">{doctor.name}</h2>
                <p className="text-lg text-gray-400 mb-2">{doctor.department}</p>
                <p className="mb-2"><strong>Specialization:</strong> {doctor.specialization}</p>
                <p className="mb-2"><strong>Working Days:</strong> {doctor.workingDays}</p>
                <p className="mb-4"><strong>Working Hours:</strong> {doctor.workingHours}</p>
                <p className="mb-4"><strong>Rating:</strong> {doctor.rating} ⭐</p>
                <button
                  onClick={() => handleBookNow(doctor)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredDoctors.length === 0 && (
          <p className="text-center text-gray-400 mt-8">No doctors found. Try a different search.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorProfilePage;
