import React from "react";
import AppointmentDetails from "../../components/appointments/AppointmentDetails";

function DoctorDetails() {
  // Example appointment data
  const patientAppointment = {
    id: "appt-123",
    date: "2025-07-15",
    time: "10:30",
    status: "pending", // Can be "pending", "confirmed", "completed", "cancelled"
    doctorName: "Alice Smith",
    specialty: "Pediatrics",
    location: "123 Health Ave, Suite 400",
    doctorPhone: "+1 (555) 123-4567",
    patientName: "John Doe",
    patientEmail: "john.doe@example.com",
    patientPhone: "+1 (555) 987-6543",
    reason: "Routine check-up for child",
    notes: "", // Doctor's notes
  };

  const doctorAppointment = {
    id: "appt-456",
    date: "2025-07-16",
    time: "14:00",
    status: "confirmed",
    doctorName: "Bob Johnson",
    specialty: "Cardiology",
    location: "456 Medical St, Room 101",
    doctorPhone: "+1 (555) 111-2222",
    patientName: "Jane Roe",
    patientEmail: "jane.roe@example.com",
    patientPhone: "+1 (555) 333-4444",
    reason: "Follow-up on blood pressure",
    notes: "Patient advised to continue medication and monitor diet.",
  };

  // --- Handler Functions (you'll implement these in your parent component) ---

  const handleUpdateAppointment = (updatedAppointment) => {
    console.log("Appointment updated:", updatedAppointment);
    // In a real application, you'd send this to your backend API
    // and then update your state accordingly.
  };

  const handleCancelAppointment = (appointmentId) => {
    console.log("Appointment cancelled:", appointmentId);
    // Call API to cancel the appointment
  };

  const handleApproveAppointment = (appointmentId) => {
    console.log("Appointment approved:", appointmentId);
    // Call API to approve the appointment
  };

  const handleRejectAppointment = (appointmentId) => {
    console.log("Appointment rejected:", appointmentId);
    // Call API to reject the appointment
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Appointment Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        

        <div>
          <h2 className="text-2xl font-semibold mb-4">Doctor View</h2>
          <AppointmentDetails
            appointment={doctorAppointment}
            userRole="doctor"
            onUpdate={handleUpdateAppointment}
            onApprove={handleApproveAppointment}
            onReject={handleRejectAppointment}
            // onCancel is not applicable for doctor role in this component
          />
        </div>
      </div>

      {/* Example with no appointment */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">No Appointment Selected</h2>
        <AppointmentDetails appointment={null} userRole="patient" />
      </div>
    </div>
  );
}

export default DoctorDetails;