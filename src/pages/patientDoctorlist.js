import axios from 'axios';
import React, { useState, useEffect } from 'react';
import apiEndpoints from '../services/api';
import LoadingOverlay from '../components/shared/LoadingOverlay';
// import Sidebar from '../components/shared/sidebar';


function BookingModal({ doctor, onClose }) {
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [note, setNote] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [times, setTimes] = useState([]); // State to store available time slots for the selected day

    // Extract available appointments from the doctor object
    const availableAppointments = doctor.availableAppointments || [];
    const days = [...new Set(availableAppointments.map((appt) => appt.day))];

    // Handle day selection and update time slots
    const handleDayChange = (day) => {
        setSelectedDay(day);
        setSelectedTime(''); // Reset selected time when day changes

        // Filter available appointments for the selected day and extract time slots with IDs
        const filteredTimes = availableAppointments
            .filter((appt) => appt.day === day)
            .map((appt) => ({ id: appt.id, time: `${appt.from_time} - ${appt.to_time}` })); // Include appointment ID
        setTimes(filteredTimes);

        console.log('Filtered times for selected day:', filteredTimes); // Debugging
    };


    // HANDE CONFIRMING BOOKING THE APPOINTMNET
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedDay && selectedTime) {
            try {
                // Extract the appointment ID from the selected time
                const appointmentId = selectedTime;
                console.log('Selected appointment ID:', appointmentId);

                // Get the current user's patient ID
                const currentUserResponse = await apiEndpoints.profile.getPatientProfile();
                const patientId = currentUserResponse.data.patient_id;

                // Update the appointment
                await apiEndpoints.appointments.bookAppointment(appointmentId, {
                    reserve_status: 'pending',
                    patient_id: patientId,
                });

                // Find the selected time object
                const selectedTimeObject = times.find((time) => time.id === appointmentId);

                // Show success message
                setErrorMessage('');
                setSuccessMessage(
                    `Successfully booked ${doctor.doctor_name} on ${selectedDay} at ${
                        selectedTimeObject ? selectedTimeObject.time : 'Unknown Time'
                    }${note ? ` with note: "${note}"` : ''}`
                );

                setTimeout(() => {
                    setSuccessMessage('');
                    onClose();
                }, 3000);
            } catch (error) {
                console.error('Error updating appointment:', error);
                setErrorMessage('Failed to book the appointment. Please try again.');
            }
        } else {
            setSuccessMessage('');
            setErrorMessage('Please select both day and time.');
            setTimeout(() => setErrorMessage(''), 2000);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-green-700">Book Appointment</h2>
                <p className="mb-2">
                    <strong>Doctor:</strong> {doctor.doctor_name}
                </p>

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
                            onChange={(e) => handleDayChange(e.target.value)}
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
                                {times.map((time) => (
                                    <option key={time.id} value={time.id}>
                                        {time.time}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Reason for visit (optional)</label>
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

    const [loading, setLoading] = useState(false); // SENU: start loading
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [filters, setFilters] = useState({ name: '', specialty: '' });
    const [selectedBooking, setSelectedBooking] = useState(null);


    // ON MOUNT
    useEffect(() => {
        const fetchAvailableDoctors = async () => {
            try {
                setLoading(true); // Start loading


                //FETCH CURRENT USER [PATIENT]
                const currentUserResponse = await apiEndpoints.profile.getPatientProfile();
                const patient_id = currentUserResponse.data.patient_id;
                console.log('patient_id:', patient_id);
                
                // FETCHING AVAILBLE DOCTORS
                const doctorsResponse = await apiEndpoints.doctors.doctorsResponse();
                const doctors = doctorsResponse.data;
                console.log('Fetched doctors:', doctors);

                // Filter doctors with has_available_appointment = true
                const availableDoctors = doctors.filter((doc) => doc.has_available_appointment);
                setDoctors(availableDoctors);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchAvailableDoctors(); // Call it
    }, []);
    

    // ON UPDATE
    useEffect(() => {
        const filtered = doctors.filter(
            (doc) =>
                doc.doctor_name.toLowerCase().includes(filters.name.toLowerCase()) && // Use doctor_name
                (filters.specialty === '' || doc.specialty === filters.specialty)
        );
        setFilteredDoctors(filtered);
    }, [filters, doctors]);

    const specialties = [...new Set(doctors.map((doc) => doc.specialty))];

    const handleBook = async (doctor) => {
        if (!doctor) {
            console.error('Doctor object is undefined:', doctor);
            return;
        }

        try {
            // Fetch appointments for the selected doctor with reserve_status='available'
            const response = await apiEndpoints.appointments.getDoctorAvailableAppointments(doctor.doctor_id);
            console.log('Available appointments:', response.data);
            if (!response.data || response.data.length === 0) {
                console.error('No available appointments found for this doctor.');
                return;
            }

            const availableAppointments = response.data;

            // Add available appointments to the doctor object
            setSelectedBooking({ ...doctor, availableAppointments });
        } catch (error) {
            console.error('Error fetching available appointments:', error);
        }
    };

    return (
        <div className="flex">
            {/* <Sidebar /> [SENU] */}
            
            { loading && <LoadingOverlay/>}

            <div className="flex-1 px-6 py-8">
                <h1 className="text-3xl font-bold text-center mb-8 text-green-700">Find a Doctor</h1>

                {/* FILTER */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">

                    {/* SEARCH BY NAME */}
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                        value={filters.name}
                        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                    />

                    {/* SEARCH BY SPECILAIZATION */}
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
                

                {/* EMPTY CASE */}
                {filteredDoctors.length === 0 ? (
                    <p className="text-center text-gray-500">No doctors found.</p>
                ) : (

                    // LOOP ON DOCTORS
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDoctors.map((doc) => (
                            <div
                                key={doc.doctor_id} // Use doctor_id as the key
                                className="bg-white min-h-[220px] rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 border border-gray-100"
                            >
                                <h2 className="text-xl font-semibold text-green-800 mb-2">{doc.doctor_name}</h2> {/* Use doctor_name */}
                                <p className="text-gray-600 mb-4">
                                    <strong></strong>{' '}
                                    {doc.specializations.map((spec) => spec.name).join(', ')}
                                </p>
                                <p className="text-gray-600 mb-4">{doc.location}</p>

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
