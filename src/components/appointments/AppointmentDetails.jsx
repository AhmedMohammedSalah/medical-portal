import { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Trash2,
  MessageSquare,
} from "lucide-react";

const AppointmentDetails = ({
  appointment,
  userRole = "patient",
  onUpdate,
  onCancel,
  onApprove,
  onReject,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(appointment?.notes || "");
  const [showNotes, setShowNotes] = useState(false);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (!appointment) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No appointment selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            Appointment Details
          </h2>
          <div
            className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center space-x-1 ${getStatusColor(
              appointment.status
            )}`}
          >
            {getStatusIcon(appointment.status)}
            <span className="capitalize">{appointment.status}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-semibold text-gray-800">
                {formatDate(appointment.date)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="font-semibold text-gray-800">
                {formatTime(appointment.time)}
              </p>
            </div>
          </div>
        </div>

        {/* Doctor/Patient Info */}
        <div className="mb-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            <div className="flex-1">
              {userRole === "patient" ? (
                <>
                  <h3 className="font-semibold text-gray-800">
                    Dr. {appointment.doctorName}
                  </h3>
                  <p className="text-gray-600">{appointment.specialty}</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{appointment.location || "Clinic Address"}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Phone className="w-4 h-4" />
                      <span>{appointment.doctorPhone || "+1234567890"}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="font-semibold text-gray-800">
                    {appointment.patientName}
                  </h3>
                  <p className="text-gray-600">Patient</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Mail className="w-4 h-4" />
                      <span>{appointment.patientEmail}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Phone className="w-4 h-4" />
                      <span>{appointment.patientPhone}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Reason for Visit */}
        {appointment.reason && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-2">
              Reason for Visit
            </h4>
            <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
              {appointment.reason}
            </p>
          </div>
        )}

        {/* Notes Section */}
        {(userRole === "doctor" || appointment.notes) && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-800">Doctor's Notes</h4>
              {userRole === "doctor" && (
                <button
                  onClick={() => setShowNotes(!showNotes)}
                  className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center space-x-1"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{showNotes ? "Hide" : "Add"} Notes</span>
                </button>
              )}
            </div>

            {(showNotes || appointment.notes) && (
              <div className="bg-gray-50 p-3 rounded-lg">
                {userRole === "doctor" && showNotes ? (
                  <div>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add notes about this appointment..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      rows="4"
                    />
                    <div className="mt-2 flex space-x-2">
                      <button
                        onClick={() => {
                          onUpdate && onUpdate({ ...appointment, notes });
                          setShowNotes(false);
                        }}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                      >
                        Save Notes
                      </button>
                      <button
                        onClick={() => setShowNotes(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">
                    {appointment.notes || "No notes added yet."}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {userRole === "doctor" && appointment.status === "pending" && (
            <>
              <button
                onClick={() => onApprove && onApprove(appointment.id)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center space-x-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Approve</span>
              </button>
              <button
                onClick={() => onReject && onReject(appointment.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject</span>
              </button>
            </>
          )}

          {userRole === "patient" &&
            ["pending", "confirmed"].includes(appointment.status) && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Reschedule</span>
                </button>
                <button
                  onClick={() => onCancel && onCancel(appointment.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </>
            )}

          {userRole === "doctor" && appointment.status === "confirmed" && (
            <button
              onClick={() =>
                onUpdate && onUpdate({ ...appointment, status: "completed" })
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Mark Complete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
