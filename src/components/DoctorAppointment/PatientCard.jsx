import React from "react";
import { UserRound, X } from "lucide-react";

const statusColors = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};

export default function PatientCard({ patient, onRemoveClick, status, onStatusChange, cardLoading, currentStatus }) {
  console.log("from patient card: currentStatus: ", currentStatus)
  return (
    <div className="relative group bg-green-50 hover:bg-green-100 p-3 rounded-xl shadow transition-transform duration-300 transform hover:scale-105 flex items-center gap-3 justify-center flex-col min-h-[180px]">

      {/* ❌ REMOVE BUTTON */}
      <button
        className="absolute top-1 right-1 p-1 text-gray-500 hover:text-red-700 z-10"
        onClick={() => onRemoveClick(patient)}
        aria-label="Remove"
        disabled={cardLoading}
      >
        <X size={16} />
      </button>

      {/* 🌀 LOADING OVERLAY */}
      {cardLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-20 rounded-xl">
          <div className="flex flex-col items-center gap-2">
            <svg
              className="w-6 h-6 text-green-600 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3.536-3.536L12 0v4a8 8 0 000 16v4l3.536-3.536L12 20v-4a8 8 0 01-8-8z"
              />
            </svg>
            <p className="text-green-700 text-sm">Updating...</p>
          </div>
        </div>
      )}

      {/*  CARD CONTENT */}
      <img
        src={patient.patient_image_path}
        alt={patient.name}
        className="w-16 h-16 rounded-full object-cover border-2 border-green-300 shadow"
      />

      <div className="text-center">
        <p className="text-green-700 font-semibold text-lg flex items-center justify-center gap-1">
          <UserRound className="w-4 h-4" /> {patient.name}
        </p>
        <p className="text-sm text-gray-600">Age: {patient.age}</p>

        <select
          value={currentStatus}
          onChange={(e) => onStatusChange(patient.appointment_id, patient.patient_id, e.target.value)}
          className={`mt-2 text-sm px-2 py-1 rounded-full ${
            statusColors[currentStatus] || "bg-gray-100 text-gray-600"
          } focus:outline-none`}
          disabled={cardLoading}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
