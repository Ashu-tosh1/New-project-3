/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState, useEffect } from 'react';
import { Search, Filter,ChevronDown, ChevronUp,  } from 'lucide-react';
import { Doctor } from '@/components/mock/MockData';
import { sampleDoctors } from '@/components/mock/MockData';
import DoctorCard from '@/components/patient/DoctorCard';
import { DoctorBookingModal } from '@/components/patient/DoctorBookingModal';
import PatientSidebar from '@/components/patient/PatientSidebar';
interface FilterOptions {
  department: string;
  sortBy: 'name' | 'experience';
  sortOrder: 'asc' | 'desc';
}
// Department options
const departments = [...new Set(sampleDoctors.map(doctor => doctor.department))];
const AppointmentPage: React.FC = () => {
  const [doctors,] = useState<Doctor[]>(sampleDoctors);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    department: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(sampleDoctors);

  // Apply filters and search
  useEffect(() => {
    let result = [...doctors];
    
    // Search filter
    if (searchTerm) {
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Department filter
    if (filterOptions.department) {
      result = result.filter(doctor => doctor.department === filterOptions.department);
    }
        
    // Sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      if (filterOptions.sortBy === 'name') {
        comparison = a.name.localeCompare(b.name)
      } else if (filterOptions.sortBy === 'experience') {
        comparison = a.experience - b.experience;
      }
      
      return filterOptions.sortOrder === 'asc' ? comparison : -comparison;
    });
    
    setFilteredDoctors(result);
  }, [doctors, searchTerm, filterOptions]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilterOptions(prev => ({ ...prev, [key]: value }));
  };

  const handleToggleFilters = () => {
    setShowFilters(prev => !prev);
  };



  return (
    <div className="min-h-screen flex  bg-gray-50 pt-8 pb-12">
      <div>
        <h1>Appointment </h1>
        <PatientSidebar/>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Doctor Appointments</h1>
          <p className="mt-2 text-sm text-gray-600">Book your appointment with our specialists</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full sm:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search doctors by name or department"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            {/* Filter toggle */}
            <button
              onClick={handleToggleFilters}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Department Filter */}
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  id="department"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={filterOptions.department}
                  onChange={(e) => handleFilterChange('department', e.target.value)}
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  id="sortBy"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={filterOptions.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value as any)}
                >
                  <option value="name">Name</option>
                  <option value="experience">Experience</option>
                </select>
              </div>

              {/* Sort Order */}
              <div>
                <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                <select
                  id="sortOrder"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={filterOptions.sortOrder}
                  onChange={(e) => handleFilterChange('sortOrder', e.target.value as 'asc' | 'desc')}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Doctor Cards */}
        <DoctorCard doctors={filteredDoctors}
        onSelectDoctor={(doctor: Doctor) => setSelectedDoctor(doctor)} />
</div>
      {/* Booking Modal */}

      <div>
      {selectedDoctor && (
  <DoctorBookingModal
    selectedDoctor={selectedDoctor}
    onClose={() => setSelectedDoctor(null)}
  />
)}

    </div>
    </div>
  );
};

export default AppointmentPage;