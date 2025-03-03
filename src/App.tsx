
import './App.css'
// import DashBoard from './Doctor/DashBoard'
import PatientDashboardPage from './Patient/DashBoard'
import { BrowserRouter } from 'react-router-dom'
function App() {


  return (
    <BrowserRouter>
     <div>
      {/* <DashBoard/>       */}
      <PatientDashboardPage/>
   </div>
    </BrowserRouter>
  
)}

export default App
