import React from "react";
import PatientCard from "../../../components/DoctorAppointment/PatientCard";

// I want when click yes,remove to confirm the removal to imediatly the modal dissapear and the page start to load til is success then frontend remove the card or failed and the card stay
export default function ConfirmModal({
  patient,
  cancelReason,
  onCancelReasonChange,
  onConfirm,
  onClose,
}) {
  return (
  <div className="fixed inset-0 bg-white/0.5 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          Confirm Cancellation
        </h2>
        
        <div className="mb-6">
          <PatientCard
            patient={patient}
            status="pending"
            onRemoveClick={() => {}}
            onStatusChange={() => {}}
            cardLoading={false}
            currentStatus="pending"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="cancelReason"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Reason for Cancellation
          </label>
          <textarea
            id="cancelReason"
            value={cancelReason}
            onChange={(e) => onCancelReasonChange(e.target.value)}
            className="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={4}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
          >
            No
          </button>
          <button
            onClick={() => {
              onClose(); // Close modal immediately
              onConfirm(); // Trigger the confirmation logic
            }}
            className="px-6 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}