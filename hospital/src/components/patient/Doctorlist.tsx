// "use client"
// import React, { useState } from "react";

// const doctors = [
//   { id: 1, name: "Dr. John Doe", specialty: "Cardiologist", experience: "10 years", image: "/Doctor1.png", availability: [4, 7, 11, 14, 18, 22] },
//   { id: 2, name: "Dr. Jane Smith", specialty: "Endocrinologist", experience: "8 years", image: "/doctor2.jpg", availability: [2, 5, 9, 12, 16, 20] },
//   { id: 3, name: "Dr. Alice Brown", specialty: "Pulmonologist", experience: "12 years", image: "/doctor3.jpg", availability: [3, 6, 10, 15, 19, 25] },
// ];

// const PatientHomePage = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedSpecialty, setSelectedSpecialty] = useState("");
//   const [hoveredDoctor, setHoveredDoctor] = useState(null);

//   const filteredDoctors = doctors.filter(
//     (doctor) =>
//       doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       doctor.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-green-100 text-gray-900 p-6">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-5xl font-extrabold text-center mb-8 text-green-700">Find Your Specialist</h1>

//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
//           <input
//             type="text"
//             placeholder="Search by doctor name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full sm:w-1/3 p-3 rounded-lg bg-white border border-green-300 text-gray-900 placeholder-gray-500 shadow-sm"
//           />
//           <select
//             value={selectedSpecialty}
//             onChange={(e) => setSelectedSpecialty(e.target.value)}
//             className="w-full sm:w-1/4 p-3 rounded-lg bg-white border border-green-300 text-gray-900 shadow-sm"
//           >
//             <option value="">Filter by Specialty</option>
//             <option value="Cardiologist">Cardiologist</option>
//             <option value="Endocrinologist">Endocrinologist</option>
//             <option value="Pulmonologist">Pulmonologist</option>
//           </select>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredDoctors.length > 0 ? (
//             filteredDoctors.map((doctor) => (
//               <div
//                 key={doctor.id}
//                 className="relative bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center transition duration-300 hover:shadow-xl"
//                 onMouseEnter={() => setHoveredDoctor(doctor.id)}
//                 onMouseLeave={() => setHoveredDoctor(null)}
//               >
//                 {/* Doctor Image with Fallback */}
//                 <img
//                   src={doctor.image}
//                   onError={(e) => (e.target.src = "/fallback.png")}
//                   alt={doctor.name}
//                   className="w-24 h-24 rounded-full mb-3 border border-gray-300"
//                 />

//                 {/* Minimalist Doctor Info */}
//                 <h2 className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
//                 <p className="text-sm text-gray-600">{doctor.specialty}</p>
//                 <p className="text-sm text-gray-500">{doctor.experience} Experience</p>

//                 {/* Availability Calendar (Appears on Hover) */}
//                 {hoveredDoctor === doctor.id && (
//                   <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-52 bg-white border border-gray-300 rounded-md shadow-lg p-3 text-sm">
//                     <p className="font-semibold text-center mb-2">Availability This Month:</p>
//                     <div className="grid grid-cols-7 gap-1 text-xs text-gray-700">
//                       {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
//                         <div
//                           key={day}
//                           className={`w-6 h-6 flex items-center justify-center rounded ${
//                             doctor.availability.includes(day) ? "bg-green-500 text-white font-bold" : "bg-gray-100"
//                           }`}
//                         >
//                           {day}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-lg text-green-700 font-semibold">No doctors found. Try another search.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientHomePage;