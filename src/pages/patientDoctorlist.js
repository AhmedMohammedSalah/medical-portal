import React, { useState, useEffect } from 'react';
import Sidebar from '../components/shared/sidebar';

const doctorsData = [
    {
        id: 1,
        name: 'Dr. Alice Johnson',
        specialty: 'Cardiologist',
        availability: {
            Monday: ['10:00 AM', '11:00 AM'],
            Wednesday: ['2:00 PM'],
            Friday: ['9:00 AM'],
        },
    },
    {
        id: 2,
        name: 'Dr. Bob Smith',
        specialty: 'Dermatologist',
        availability: {
            Tuesday: ['11:00 AM'],
            Thursday: ['3:00 PM', '4:00 PM'],
        },
    },
    {
        id: 3,
        name: 'Dr. Carol Lee',
        specialty: 'Pediatrician',
        availability: {
            Monday: ['1:00 PM'],
            Wednesday: ['9:00 AM'],
        },
    },
    {
        id: 4,
        name: 'Dr. David White',
        specialty: 'Cardiologist',
        availability: {
            Friday: ['2:00 PM'],
            Saturday: ['10:00 AM'],
        },
    },
];

function BookingModal({ doctor, onClose }) {
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [note, setNote] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedDay && selectedTime) {
            setErrorMessage('');
            setSuccessMessage(`Successfully booked ${doctor.name} on ${selectedDay} at ${selectedTime}${note ? ` with note: "${note}"` : ''}`);
            setTimeout(() => {
                setSuccessMessage('');
                onClose();
            }, 3000);
        } else {
            setSuccessMessage('');
            setErrorMessage('Please select both day and time.');
            setTimeout(() => setErrorMessage(''), 2000);
        }
    };

    const days = Object.keys(doctor.availability);
    const times = selectedDay ? doctor.availability[selectedDay] : [];

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-green-700">Book Appointment</h2>
                <p className="mb-2"><strong>Doctor:</strong> {doctor.name}</p>

                {successMessage && (
                    <div className="mb-4 px-4 py-2 bg-green-100 text-green-800 rounded-md text-sm border border-green-300">
                        {successMessage}
                    </div>
                )}

                {errorMessage && (
                    <div className="mb-4 px-4 py-2 bg-red-100 text-red-800 rounded-md text-sm border border-red-300">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Select Day</label>
                        <select
                            value={selectedDay}
                            onChange={(e) => {
                                setSelectedDay(e.target.value);
                                setSelectedTime('');
                            }}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                            <option value="">-- Choose a day --</option>
                            {days.map((day) => (
                                <option key={day} value={day}>
                                    {day}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedDay && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Select Time</label>
                            <select
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            >
                                <option value="">-- Choose a time --</option>
                                {times.map((time, index) => (
                                    <option key={index} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* New Note Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Reason for visit(optional)</label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Add any notes or concerns for the doctor"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none"
                            rows={3}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                    >
                        Confirm Booking
                    </button>
                </form>

                <button
                    onClick={onClose}
                    className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default function DoctorListWithAvailability() {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [filters, setFilters] = useState({ name: '', specialty: '' });
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        setDoctors(doctorsData);
        setFilteredDoctors(doctorsData);
    }, []);

    useEffect(() => {
        const filtered = doctors.filter(
            (doc) =>
                doc.name.toLowerCase().includes(filters.name.toLowerCase()) &&
                (filters.specialty === '' || doc.specialty === filters.specialty)
        );
        setFilteredDoctors(filtered);
    }, [filters, doctors]);

    const specialties = [...new Set(doctors.map((doc) => doc.specialty))];

    const handleBook = (doctor) => {
        setSelectedBooking(doctor);
    };

    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 px-6 py-8">
                <h1 className="text-3xl font-bold text-center mb-8 text-green-700">Find a Doctor</h1>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                        value={filters.name}
                        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                    />

                    <select
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                        value={filters.specialty}
                        onChange={(e) => setFilters({ ...filters, specialty: e.target.value })}
                    >
                        <option value="">All Specialties</option>
                        {specialties.map((spec) => (
                            <option key={spec} value={spec}>
                                {spec}
                            </option>
                        ))}
                    </select>
                </div>

                {filteredDoctors.length === 0 ? (
                    <p className="text-center text-gray-500">No doctors found.</p>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDoctors.map((doc) => (
                            <div
                                key={doc.id}
                                className="bg-white min-h-[220px] rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 border border-gray-100"
                            >
                                <h2 className="text-xl font-semibold text-green-800 mb-2">{doc.name}</h2>
                                <p className="text-gray-600 mb-4">{doc.specialty}</p>

                                <button
                                    onClick={() => handleBook(doc)}
                                    className="text-sm text-white bg-green-600 px-5 py-2 rounded-lg hover:bg-green-700"
                                >
                                    Book Appointment
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedBooking && (
                <BookingModal
                    doctor={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                />
            )}
        </div>
    );
}
