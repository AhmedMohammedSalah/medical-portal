import React from 'react';
import IconButton from '../shared/btn';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <div className="flex flex-row items-center justify-between h-16 p-2">
            {/* Logo */}
            <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-white">Medical Portal</h1>
            </div>

            {/* Navigation Links */}
            <nav className="flex gap-6">
                <Link to="/admin/patients" className="text-white hover:bg-white hover:text-emerald-600 px-4 py-2 rounded-md transition">Patients</Link>
                <Link to="/admin/doctors" className="text-white hover:bg-white hover:text-emerald-600 px-4 py-2 rounded-md transition">Doctors</Link>
                <Link to="/admin/specialities" className="text-white hover:bg-white hover:text-emerald-600 px-4 py-2 rounded-md transition">Specialities</Link>
                <Link to="/admin/appointments" className="text-white hover:bg-white hover:text-emerald-600 px-4 py-2 rounded-md transition">Appointments</Link>
                <Link to="/admin/requests" className="text-white hover:bg-white hover:text-emerald-600 px-4 py-2 rounded-md transition">Requests</Link>
            </nav>

            {/* Profile & Logout */}
            <div className="flex items-center gap-4">
                <button className="text-white hover:underline font-medium">
                    Profile
                </button>
                <IconButton
                    btnColor="white"
                    btnShade="500"
                    textColor="emerald"
                    hoverShade="600"
                    focusShade="400"
                    path="/logout"
                    text="Logout"
                />
            </div>
        </div>
    );
}

export default Nav;
