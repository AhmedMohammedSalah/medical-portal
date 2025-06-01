import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homePage';
import Patients from './pages/patientsPage';
import Doctors from './pages/doctorsPage';
import Spetialities from './pages/specialitiesPage';
import Appointments from './pages/appointmentsPage';
import Requests from './pages/requestsPage';
import PharmacyList from './pages/pharamcieslist';

// import Login from './pages/loginPage';
// import Register from './pages/registerPage';
// import Dashboard from './pages/dashboardPage';
// import Drugs from './pages/drugPage'
import DefaultLayout from './components/layout/default-layout';
import DashboardLayout from './components/layout/dashboard-layout';
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
        <Route path="/admin" element={<DashboardLayout />}>
          <Route path="/admin/patients" element={<Patients />} />
          <Route path="/admin/doctors" element={<Doctors />} />
          <Route path="/admin/specialities" element={<Spetialities />} />
          <Route path="/admin/appointments" element={<Appointments />} />
          <Route path="/admin/requests" element={<Requests />} />
        </Route>

        <Route path="/pharmacies" element={<PharmacyList />}/>
      </Routes>
    </Router>
  );
}

export default App;
