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
}) {
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
          {timeSlots.map(time => (
            <tr key={time} className="hover:bg-green-50">
              <td className={`${valueCellClass} font-bold text-green-800`}>
                {time}
              </td>
              {days.map(day => {

                // WE WILL PLAY HERE
                const PID = appointments[time]?.[day];

                const patientName = appointments[time]?.[day];
                const patient = patients[patientName];

                return (
                  <td key={day} className={valueCellClass}>
                    {patient ? (
                      <PatientCard
                        patient={patient}
                        onRemoveClick={onRemoveClick}
                        status={patientStatus[patient.name]}
                        onStatusChange={onStatusChange}
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
