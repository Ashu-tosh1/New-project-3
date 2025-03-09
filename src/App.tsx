
import './App.css'
// import DashBoard from './Doctor/DashBoard'
import PatientDashboardPage from './Patient/DashBoard'
import { BrowserRouter } from 'react-router-dom'
import BookAppointment from './Patient/Appointment'
import UploadReport from './Patient/UploadReport'
import DoctorAppointments from './Doctor/Appoitnment'
import PatientListView from './Doctor/PatientView'
import DoctorProfile from './Doctor/Profile'
function App() {


  return (
    <BrowserRouter>
     <div>
      {/* <DashBoard/>       */}
      <PatientDashboardPage/>
      <BookAppointment/>
      <UploadReport/>
      <DoctorAppointments/>
      <PatientListView/>
      <DoctorProfile/>
   </div>
    </BrowserRouter>
  
)}

export default App
