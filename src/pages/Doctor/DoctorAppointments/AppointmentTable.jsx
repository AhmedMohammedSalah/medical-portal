import React from "react";
import PatientCard from "../../../components/DoctorAppointment/PatientCard";

export default function AppointmentTable({
  appointments,
  patients,
  days,
  timeSlots,
  headCellClass,
  valueCellClass,
  onRemoveClick,
  patientStatus,
  onStatusChange,
  loadingAppointments, // [SENU] add loading
}) {
  
  console.log("from the table: patients", patients)

  // Utility function to parse 24-hour time strings (e.g., "14:30") for sorting
  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes; // Convert to minutes for easy comparison
  };

  // Filter timeSlots to only include those with at least one patient
  const filteredTimeSlots = timeSlots.filter(time => 
    days.some(day => appointments[time]?.[day])
  );

  // Sort filtered timeSlots in ascending order
  const sortedTimeSlots = [...filteredTimeSlots].sort((a, b) => parseTime(a) - parseTime(b));

  return (
    <div className="overflow-x-auto shadow-2xl rounded-2xl border border-green-200 bg-white">
      <table className="min-w-full divide-y divide-green-200 rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className={headCellClass}>Time</th>
            {days.map(day => (
              <th key={day} className={headCellClass}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-green-100">
          {/*  */}
          {sortedTimeSlots.map(time => (
            <tr key={time} className="hover:bg-green-50">
              <td className={`${valueCellClass} font-bold text-green-800`}>
                {time}
              </td>
              {days.map(day => {
                // WE WILL PLAY HERE
                const PID = appointments[time]?.[day];
                const patientName = appointments[time]?.[day];
                const patient = patients[patientName];

                console.log("from table, patientStatus[patient?.name] =", patient ? patientStatus[patient.patient_id] : undefined);
                console.log("from table, patient.appointment_reserve_status =", patient ? patient.appointment_reserve_status : undefined);

                return (
                  <td key={day} className={valueCellClass}>
                    {patient ? (
                      <PatientCard
                        patient={patient}
                        onRemoveClick={onRemoveClick}
                        status={patientStatus[patient.patient_id]}
                        onStatusChange={onStatusChange}
                        cardLoading={loadingAppointments[patient.appointment_id] || false} // [SENU] add loading
                        currentStatus={patientStatus[patient.patient_id]}
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}