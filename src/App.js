import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/homePage";

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
import DefaultLayout from "./components/layout/default-layout";
import PatientlistDoctor from "./pages/patientDoctorlist";
import BookAppointmentModal from "./pages/bookmodel";
import PatientProfile from "./pages/patient profile";
import NotFound from "./pages/Notfound";
// import MyAppointments from "./pages/myappointment";
import MyAppointments from "./pages/appointments/PatientAppointments.jsx";
import DoctorLayout from "./components/layout/doctor-layout.jsx";
import DoctorProfile from "./pages/Doctor/DoctorProfile.jsx";
import PatientLayout from "./components/layout/patient-layout.jsx";
import DoctorDetails from "./pages/appointments/DoctorDetails.jsx";
import PatientDetails from "./pages/appointments/PatientDetails.jsx";
import DoctorTimeScheduler from "./pages/Doctor/DoctorTimeScheduler/DoctorTimeScheduler.jsx";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard.jsx";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments/index.jsx";
import DashboardLayout from './components/layout/dashboard-layout';
// import IconButton from './components/shared/iconButton';
import LoginPage from "./pages/login.js";
import RegisterPage from "./pages/register.js";
import {
  RequireAuth,
  RequireNoRole,
  RequireRole,
} from "./guards/authorization-guard.js";
import Unauthorized from "./components/shared/unauthorized.jsx";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "./features/authSlice.js";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // [AMS] check if user is logged in and has role
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    // [AMS] if user is logged in, set user in redux store
    if (user && accessToken && refreshToken) {
      dispatch(
        setCredentials({
          user: user,
          accessToken: accessToken,
          refreshToken: refreshToken,
        })
      );
    }
  }, []);
  return (
    <Router>
      <Routes>
        {/* [AMS] default layout for guest */}

        <Route element={<RequireNoRole />}>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="" element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Route>
        {/*[AMS]: Doctor layout */}
        {/* Doctor routes - only for authenticated doctors */}
        <Route element={<RequireAuth />}>
          <Route element={<RequireRole allowedRoles={["doctor"]} />}>
            <Route path="/doctor" element={<DoctorLayout />}>
              <Route index element={<DoctorDashboard />} />
              <Route
                path="appointments/view"
                element={<DoctorAppointments />}
              />
              <Route path="appointments/:id" element={<DoctorDetails />} />
              <Route path="scheduler/" element={<DoctorTimeScheduler />} />
              <Route path="DoctorProfile/" element={<DoctorProfile />} />
            </Route>
          </Route>
        </Route>

        {/* [AMS] Patient layout */}

        {/* Patient routes - only for authenticated patients */}
        <Route element={<RequireAuth />}>
          <Route element={<RequireRole allowedRoles={["patient"]} />}>
            <Route path="/patient" element={<PatientLayout />}>
              <Route index element={<PatientlistDoctor />} /> {/* Index route */}
              <Route path="appointments/:id" element={<PatientDetails />} />
              <Route path="book" element={<BookAppointmentModal />} />
              <Route path="patientprofile" element={<PatientProfile />} />
              <Route path="appointments" element={<MyAppointments />} />
            </Route>
          </Route>
        </Route>

        {/* [AMS]=> 🙂 unauthorized page */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* [AMS]=> 🙂- amira 404  must be at the end of routes */}
        <Route path="*" element={<NotFound />} />
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
