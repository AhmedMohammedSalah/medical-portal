import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homePage';
import Drugs from './pages/drugPage';

// import Login from './pages/loginPage';
// import Register from './pages/registerPage';
// import Dashboard from './pages/dashboardPage';
// import Drugs from './pages/drugPage'
import DefaultLayout from './components/layout/default-layout';
import PatientlistDoctor from './pages/patientDoctorlist';
import BookAppointmentModal from './pages/bookmodel';
import PatientProfile from './pages/patient profile';
import NotFound from './pages/Notfound';
import MyAppointments from './pages/myappointment';
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
        <Route path="/Drugs" element={<Drugs />}/>
        <Route path="/patientlist" element={<PatientlistDoctor />}/>
        <Route path="/book" element={<BookAppointmentModal />}/>
        <Route path="/patientprofile" element={<PatientProfile />}/>
        <Route path="/appointment" element={<MyAppointments />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </Router>
  );
}

export default App;
