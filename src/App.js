import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homePage';


// import Register from './pages/registerPage';
// import Dashboard from './pages/dashboardPage';
// import Drugs from './pages/drugPage'
import DefaultLayout from './components/layout/default-layout';
import AppointmentDetails from './components/appointments/AppointmentDetails.jsx';
import AppointmentDetailsPage from './pages/appointments/DoctorDetails.jsx';
import DoctorLayout from './components/layout/doctor-layout.jsx';
import PatientLayout from './components/layout/patient-layout.jsx';
import DoctorDetails from './pages/appointments/DoctorDetails.jsx';
import PatientDetails from './pages/appointments/PatientDetails.jsx';
// import IconButton from './components/shared/iconButton';     


function App() {
  return (
    <Router>
      <Routes>
        {/* [AMS] this is default layout for guest / client */}
        <Route path="/" element={<DefaultLayout />}>
          {/*[AMS] any route here will have auto header and footer */}
          <Route path="" element={<Home />} />
        </Route>
        {/*[ams] Doctor layout */}
        <Route path="/doctor" element={<DoctorLayout />}>
          {/*[AMS] any route here will have auto header and footer and doctor side bar */}
          <Route path="appointments/:id" element={<DoctorDetails />} />
        </Route>
        {/* [AMS] Patient layout */}
        <Route path="/patient" element={<PatientLayout />}>
          {/*[AMS] any route here will have auto header and footer and patient side bar */}
          <Route path="appointments/:id" element={<PatientDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
