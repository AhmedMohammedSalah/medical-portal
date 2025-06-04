import React from "react";
import { UserRound, X } from "lucide-react";

const statusColors = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};

export default function PatientCard({ patient, onRemoveClick, status, onStatusChange }) {
  return (
    <div className="relative group bg-green-50 hover:bg-green-100 p-3 rounded-xl shadow transition-transform duration-300 transform hover:scale-105 flex items-center gap-3 justify-center flex-col">
      <button
        className="absolute top-1 right-1 p-1 text-gray-500 hover:text-red-700"
        onClick={() => onRemoveClick(patient)}
        aria-label="Remove"
      >
        <X size={16} />
      </button>

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
        <select
          value={status}
          onChange={(e) => onStatusChange(patient.name, e.target.value)}
          className={`mt-2 text-sm px-2 py-1 rounded-full ${statusColors[status]} focus:outline-none`}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
