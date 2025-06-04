import React, { useState } from "react";
import { UserRound, X, MoreHorizontal } from "lucide-react";

const statusColors = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};

export default function PatientCard({ patient, onRemove, onStatusChange }) {
  const [status, setStatus] = useState("approved");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRemoveClick = () => setShowConfirm(true);
  const handleConfirmRemove = () => {
    onRemove(patient.name);
    setShowConfirm(false);
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    if (onStatusChange) onStatusChange(patient.name, newStatus);
  };

  return (
    <div className="relative group bg-green-50 hover:bg-green-100 p-3 rounded-xl shadow transition-transform duration-300 transform hover:scale-105 flex items-center gap-3 justify-center flex-col">
      <button
        className="absolute top-1 right-1 p-1 text-red-500 hover:text-red-700"
        onClick={handleRemoveClick}
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
          onChange={handleStatusChange}
          className={`mt-2 text-sm px-2 py-1 rounded-full ${statusColors[status]} focus:outline-none`}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {showConfirm && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-90 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl text-sm p-4 text-gray-800 z-10">
          <p className="mb-2 font-semibold">Are you sure you want to remove this appointment?</p>
          <div className="flex gap-2">
            <button
              onClick={handleConfirmRemove}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Yes
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
