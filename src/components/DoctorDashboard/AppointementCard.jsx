// components/dashboard/AppointmentCard.jsx
import { Clock, MessageSquare, Phone, ClipboardList } from 'lucide-react';

const AppointmentCard = ({ appointment }) => {
  const statusColors = {
    pending: 'bg-amber-100 text-amber-800',
    approved: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-800">{appointment.patient}</h3>
          <p className="text-sm text-gray-600">{appointment.type}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[appointment.status]}`}>
          {appointment.status}
        </span>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm font-medium text-gray-700 flex items-center">
          <Clock className="mr-1" size={14} />
          {appointment.time}
        </span>
        <div className="flex space-x-2">
          <button className="p-1 text-gray-500 hover:text-emerald-600">
            <MessageSquare size={16} />
          </button>
          <button className="p-1 text-gray-500 hover:text-emerald-600">
            <Phone size={16} />
          </button>
          {/* <button className="p-1 text-gray-500 hover:text-emerald-600">
            <ClipboardList size={16} />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
