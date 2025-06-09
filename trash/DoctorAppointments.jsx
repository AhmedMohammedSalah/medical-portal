import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import PatientCard from "../src/components/DoctorAppointment/PatientCard";

export default function DoctorAppointments() {


  // TAILWIND CSS
  const headCellClass =  "px-6 py-4 text-lg text-center font-semibold text-green-800 bg-green-100 border border-green-200";
  const valueCellClass = "px-6 py-4 text-center border border-green-200 text-gray-800";

  // DAYS IN TABLE
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // NEED TO BE PREPARED FROM THE DATA THAT WILL BE FETCHED
  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"];


  // DATA MUST BE FETCHED 
  const initialPatients = {
    Ahmed: {
      name: "Ahmed",
      age: 32,
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    Sarah: {
      name: "Sarah",
      age: 28,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    John: {
      name: "John",
      age: 41,
      image: "https://randomuser.me/api/portraits/men/34.jpg",
    },
    Lina: {
      name: "Lina",
      age: 36,
      image: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    Omar: {
      name: "Omar",
      age: 29,
      image: "https://randomuser.me/api/portraits/men/55.jpg",
    },
  };

  // DATA MUST BE FETCHED 
  const initialAppointments = {
    "9:00 AM": {
      Monday: "Ahmed",
      Wednesday: "Sarah",
    },
    "10:00 AM": {
      Tuesday: "John",
      Thursday: "Lina",
    },
    "11:00 AM": {
      Friday: "Omar",
    },
    "12:00 PM": {},
  };


  // STATES
  const [patients, setPatients] = useState(initialPatients);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [patientToRemove, setPatientToRemove] = useState(null);
  const [cancelReason, setCancelReason] = useState("The doctor is sorry, but due to an unexpected situation, the appointment has to be cancelled.");
  // const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientStatus, setPatientStatus] = useState({
    Ahmed: "approved",
    Sarah: "approved",
    John: "approved",
    Lina: "approved",
    Omar: "approved",
  });



  // METHOD: CANCELL AND REMOVE APPOINTMENTS
  const handleRemoveClick = (patient) => {
    setPatientToRemove(patient);
  };


  // CONFIRM CANCEL/REMOVE
  const confirmRemove = () => {
    if (!patientToRemove) return;
    const name = patientToRemove.name;

    const newAppointments = { ...appointments };
    for (const time in newAppointments) {
      for (const day in newAppointments[time]) {
        if (newAppointments[time][day] === name) {
          delete newAppointments[time][day];
        }
      }
    }
  
    setAppointments(newAppointments);
    setPatientToRemove(null);
  };


  // UPDATE APPOINTMENT STATUS
  const handleStatusChange = (name, newStatus) => {
    setPatientStatus((prev) => ({
      ...prev,
      [name]: newStatus,
    }));
  };

  return (
    <div className="p-8 max-w-6xl mx-auto relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-5xl font-bold text-green-700">
        Appointments
        </h1>
        <Link
          to="/doctor/scheduler"
          className="flex items-center px-6 py-3 rounded-full bg-amber-100 text-amber-800 hover:bg-amber-200 transition"
        >
          Manage your Available Time
          <ChevronRight className="ms-2 w-8 h-8" />
        </Link>
      </div>

      <p className="text-xl text-gray-700 mb-10">
        This table displays and manage appointments for the current week, categorized by day and time
      </p>

      <div className="overflow-x-auto shadow-2xl rounded-2xl border border-green-200 bg-white">
        <table className="min-w-full divide-y divide-green-200 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className={headCellClass}>Time</th>
              {days.map((day) => (
                <th key={day} className={headCellClass}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-green-100">
            {timeSlots.map((time) => (
              <tr key={time} className="hover:bg-green-50">
                <td className={`${valueCellClass} font-bold text-green-800`}>
                  {time}
                </td>
                {days.map((day) => {
                  const patientName = appointments[time]?.[day];
                  const patient = patients[patientName];

                  return (
                    <td key={day} className={valueCellClass}>
                      {patient ? (
                        <PatientCard
                          patient={patient}
                          onRemoveClick={handleRemoveClick}
                          status={patientStatus[patient.name]}
                          onStatusChange={handleStatusChange}
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

      {/* Modal for confirming delete */}
      {patientToRemove && (
  <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full border border-gray-200">

      {/* TEXT-MODAL */}
      <p className="text-center text-lg font-semibold text-gray-800 mb-4">
        Are you sure you want to remove {patientToRemove.name}'s appointment?
      </p>

      {/* INPUT */}
      <label className="font-semibold">Cancellation Reason</label>
      <textarea
        value={cancelReason}
        onChange={(e) => setCancelReason(e.target.value)}
        className="w-full h-20 border border-gray-300 rounded-md p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none mb-5"
    />

      {/* BUTTONS */}
      <div className="flex justify-center gap-4">
        <button
          onClick={confirmRemove}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Yes, Remove
        </button>
        <button
          onClick={() => setPatientToRemove(null)}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
