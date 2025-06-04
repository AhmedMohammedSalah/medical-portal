import React from "react";
import { UserRound, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function DoctorAppointments() {
  const headCellClass =
    "px-6 py-4 text-lg text-center font-semibold text-green-800 bg-green-100 border border-green-200";
  const valueCellClass =
    "px-6 py-4 text-center border border-green-200 text-gray-800";

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"];

  // Dummy patient data with name, age, and image
  const patients = {
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

  const appointments = {
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

  const renderPatientCard = (patientName) => {
    const patient = patients[patientName];
    if (!patient) return "-";

    return (
      <div className="group bg-green-50 hover:bg-green-100 p-3 rounded-xl shadow transition-transform duration-300 transform hover:scale-105 flex items-center gap-3 justify-center flex-col">
        <img
          src={patient.image}
          alt={patient.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-green-300 shadow"
        />
        <div className="text-center">
          <p className="text-green-700 font-semibold text-lg flex items-center justify-center gap-1">
            <UserRound className="w-4 h-4" /> {patient.name}
          </p>
          <p className="text-sm text-gray-600">Age: {patient.age}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-6">
        <h1 className="text-5xl font-bold text-green-700">
            Approved Appointments
        </h1>

        <Link
            to="/doctor/scheduler"
            className="flex items-center px-6 py-3 rounded-full bg-amber-100 text-amber-800 hover:bg-amber-200 transition"
        >
            Go To Pending Patients
            <ChevronRight className="ms-2 w-8 h-8" />
        </Link>
        </div>

      <p className="text-xl text-gray-700 mb-10">
        This table displays all approved appointments for the current week, categorized by day and time
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
                {days.map((day) => (
                  <td key={day} className={valueCellClass}>
                    {appointments[time]?.[day]
                      ? renderPatientCard(appointments[time][day])
                      : "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
