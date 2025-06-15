import React from 'react';
import Sidebar from '../components/shared/sidebar';

const appointments = [
    {
        id: 1,
        doctor: 'Dr. Sarah Ahmed',
        specialty: 'Cardiologist',
        date: '2025-06-05',
        time: '10:00 AM',
        status: 'Confirmed',
    },
    {
        id: 2,
        doctor: 'Dr. Khaled Mostafa',
        specialty: 'Dermatologist',
        date: '2025-06-10',
        time: '2:30 PM',
        status: 'Pending',
    },
  {
    id: 3,
    doctor: 'Dr. Reem Ali',
    specialty: 'Neurologist',
    date: '2025-06-12',
    time: '4:00 PM',
    status: 'Rejected', // 👈 New status
  },

    // Add more appointments here
];

export default function MyAppointments() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 bg-gray-50 p-6">
                <div className="flex-1 bg-white p-8 rounded-xl shadow mx-6 my-4">
                    <h2 className="text-2xl font-bold text-green-700 mb-6">My Appointments</h2>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-700">
                            <thead className="bg-green-100 text-green-800">
                                <tr>
                                    <th className="px-4 py-3">Doctor</th>
                                    <th className="px-4 py-3">Specialty</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Time</th>
                                    <th className="px-4 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appt) => (
                                    <tr key={appt.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{appt.doctor}</td>
                                        <td className="px-4 py-3">{appt.specialty}</td>
                                        <td className="px-4 py-3">{appt.date}</td>
                                        <td className="px-4 py-3">{appt.time}</td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${appt.status === 'Confirmed'
                                                        ? 'bg-green-100 text-green-700'
                                                        : appt.status === 'Pending'
                                                            ? 'bg-yellow-100 text-yellow-700'
                                                            : appt.status === 'Rejected'
                                                                ? 'bg-red-100 text-red-700'
                                                                : 'bg-gray-100 text-gray-600'
                                                    }`}
                                            >
                                                {appt.status}
                                            </span>


                                        </td>
                                    </tr>
                                ))}
                                {appointments.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center py-6 text-gray-500">
                                            No appointments found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
