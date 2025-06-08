import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homePage';

// import Register from './pages/registerPage';
// import Dashboard from './pages/dashboardPage';
import DefaultLayout from './components/layout/default-layout';
import PatientlistDoctor from './pages/patientDoctorlist';
import BookAppointmentModal from './pages/bookmodel';
import PatientProfile from './pages/patient profile';
import NotFound from './pages/Notfound';
import MyAppointments from './pages/myappointment';
import DoctorLayout from './components/layout/doctor-layout.jsx';
import PatientLayout from './components/layout/patient-layout.jsx';
import DoctorDetails from './pages/appointments/DoctorDetails.jsx';
import PatientDetails from './pages/appointments/PatientDetails.jsx';
import DoctorTimeScheduler from './pages/Doctor/DoctorTimeScheduler/DoctorTimeScheduler.jsx'
import DoctorApprovedAppointments from './pages/Doctor/DoctorApprovedAppointments.jsx'
import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx';
// import IconButton from './components/shared/iconButton';     


function App() {
  return (
    <Router>
      <Routes>

        {/* [AMS] default layout for guest */}
        <Route path="/" element={<DefaultLayout />}>

          {/*[AMS] any route here will have auto header and footer */}
          <Route path="" element={<Home />} />

        </Route>


        {/*[AMS]: Doctor layout */}
        <Route path="/doctor" element={<DoctorLayout />}>

          {/* [SENU]: doctor dashboard */}
          <Route path='dashboard/' element={<DoctorDashboard/>}/>

          {/* [SENU]: doctor view approved appointments */}
          <Route path='appointments/view' element={<DoctorApprovedAppointments/>}/>

          {/*[AMS]: any route here will have auto header and footer and doctor side bar */}
          <Route path="appointments/:id" element={<DoctorDetails />} />

          {/* [SENU]: doctor time scheduler page route */}
          <Route path='scheduler/' element={<DoctorTimeScheduler/>}/>

        </Route>

        {/* [AMS] Patient layout */}
        <Route path="/patient" element={<PatientLayout />}>
          {/*[AMS] any route here will have auto header and footer and patient side bar */}
          <Route path="appointments/:id" element={<PatientDetails />} />
        <Route path="patientlist" element={<PatientlistDoctor />}/>
        <Route path="book" element={<BookAppointmentModal />}/>
        <Route path="patientprofile" element={<PatientProfile />}/>
        <Route path="appointment" element={<MyAppointments />}/>
        </Route>


        {/* [AMS]=> 🙂- amira 404  must be at the end of routes */}
        <Route path="*" element={<NotFound />}/>

      </Routes>
    </Router>
  );
}

export default App;
