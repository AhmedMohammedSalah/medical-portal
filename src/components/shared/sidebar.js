import React from 'react';
import { NavLink } from 'react-router-dom';
import { CalendarDays, User, Stethoscope, Home } from 'lucide-react';

export default function Sidebar() {
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? 'bg-green-100 text-green-700 font-semibold'
        : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
    }`;

  return (
    <div className="w-64 min-h-screen bg-white shadow-sm p-4">
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">MediCare</h2>
      <nav className="space-y-2">
        <NavLink to="/" className={navLinkClasses}>
          <Home size={20} className="stroke-current" />
          Home
        </NavLink>
        <NavLink to="/appointment" className={navLinkClasses}>
          <CalendarDays size={20} className="stroke-current" />
          My Appointments
        </NavLink>
        <NavLink to="/patientlist" className={navLinkClasses}>
          <Stethoscope size={20} className="stroke-current" />
          Find Doctors
        </NavLink>
        <NavLink to="/patientprofile" className={navLinkClasses}>
          <User size={20} className="stroke-current" />
          Profile
        </NavLink>
      </nav>
    </div>
  );
}
