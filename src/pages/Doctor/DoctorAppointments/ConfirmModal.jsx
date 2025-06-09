import React from "react";

export default function ConfirmModal({ patient, cancelReason, onCancelReasonChange, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full border border-gray-200">
        <p className="text-center text-lg font-semibold text-gray-800 mb-4">
          Are you sure you want to remove {patient.name}'s appointment?
        </p>

        <label className="font-semibold">Cancellation Reason</label>
        <textarea
          value={cancelReason}
          onChange={(e) => onCancelReasonChange(e.target.value)}
          className="w-full h-20 border border-gray-300 rounded-md p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none mb-5"
        />

        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Yes, Remove
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
