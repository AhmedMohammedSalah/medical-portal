import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import AppointmentCard from '../../components/DoctorDashboard/AppointementCard';
import apiEndpoints from '../../services/api';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const res = await apiEndpoints.appointments.listMy(); // Patient-specific API
      setAppointments(res.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCancel = async (id) => {
    try {
      await apiEndpoints.appointments.cancel(id);
      fetchAppointments();
    } catch (error) {
      alert(error?.response?.data?.detail || "Cancellation failed");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
      {loading ? (
        <p className="text-gray-600">Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        appointments.map((appointment, index) => (
          <div key={appointment.id} className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => handleToggle(index)}
              className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
            >
              <span className="text-gray-800 font-medium">
                {appointment.doctor?.name 
                  ? `Dr. ${appointment.doctor.name}` 
                  : `Dr.#unknown`}
              </span>
              {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {openIndex === index && (
              <div className="p-4 space-y-2 bg-white">
                <AppointmentCard appointment={{
                  patient: 'You',
                  type: appointment.reason_of_visit || 'N/A',
                  time: `${appointment.date || 'Unknown'} (${appointment.day}) | ${appointment.from_time} - ${appointment.to_time}`,
                  status: appointment.reserve_status.toLowerCase(),
                }} />
                {appointment.reserve_status.toLowerCase() === 'pending' && (
                  <button
                    onClick={() => handleCancel(appointment.id)}
                    className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
                  >
                    Cancel Appointment
                  </button>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PatientAppointments;
