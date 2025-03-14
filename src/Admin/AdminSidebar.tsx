import React from 'react'

const AdminSidebar:React.FC =  () => {
  return (
    <div>
      <div className="flex flex-col h-screen bg-gray-800 text-white w-64 p-4">
        <div className="text-2xl font-bold mb-8">Hospital Admin</div>
        
        <nav className="space-y-4">
          <a href="/admin/dashboard" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <span className="material-icons">dashboard</span>
            <span>Dashboard</span>
          </a>

          <a href="/admin/patients" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <span className="material-icons">people</span>
            <span>Patients</span>
          </a>

          <a href="/admin/doctors" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <span className="material-icons">medical_services</span>
            <span>Doctors</span>
          </a>

          <a href="/admin/appointments" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <span className="material-icons">event</span>
            <span>Appointments</span>
          </a>

          <a href="/admin/departments" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <span className="material-icons">business</span>
            <span>Departments</span>
          </a>

          <a href="/admin/billing" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <span className="material-icons">receipt</span>
            <span>Billing</span>
          </a>

          <a href="/admin/settings" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <span className="material-icons">settings</span>
            <span>Settings</span>
          </a>
        </nav>

        <div className="mt-auto">
          <a href="/logout" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
            <span className="material-icons">logout</span>
            <span>Logout</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar
