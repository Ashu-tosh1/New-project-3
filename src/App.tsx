
import './App.css'
// import DashBoard from './Doctor/DashBoard'
import PatientDashboardPage from './Patient/DashBoard'
import { BrowserRouter } from 'react-router-dom'
import BookAppointment from './Patient/Appointment'
import UploadReport from './Patient/UploadReport'
function App() {


  return (
    <BrowserRouter>
     <div>
      {/* <DashBoard/>       */}
      <PatientDashboardPage/>
      <BookAppointment/>
      <UploadReport/>
   </div>
    </BrowserRouter>
  
)}

export default App
