import React from "react";
import { CheckCircle, AlertCircle, Bell, Info } from "lucide-react";

const getIcon = (type) => {
  switch (type) {
    case "alert":
      return <AlertCircle className="text-red-500" size={20} />;
    case "reminder":
      return <Bell className="text-emerald-600" size={20} />;
    case "message":
      return <Info className="text-blue-500" size={20} />;
    default:
      return <CheckCircle className="text-gray-400" size={20} />;
  }
};

const NotificationItem = ({ notification }) => {
  const { notification_type, message, is_read, created_at, data } =
    notification;

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border ${
        is_read ? "bg-gray-50" : "bg-emerald-50 border-emerald-200"
      }`}
    >
      <div className="mt-1">{getIcon(notification_type)}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold capitalize">{notification_type}</span>
          {!is_read && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-emerald-100 text-emerald-700 rounded">
              New
            </span>
          )}
        </div>
        <div className="text-gray-800 mt-1">{message}</div>
        {data && (
          <pre className="text-xs text-gray-500 mt-1 bg-gray-100 rounded p-2 overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
        <div className="text-xs text-gray-400 mt-2">
          {new Date(created_at).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
