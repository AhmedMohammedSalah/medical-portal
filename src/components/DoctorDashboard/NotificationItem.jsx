// components/dashboard/NotificationItem.jsx
const NotificationItem = ({ notification }) => (
    <div className={`p-3 rounded-lg ${!notification.read ? 'bg-emerald-50 border-l-4 border-emerald-500' : 'bg-gray-50'}`}>
      <div className="flex items-start">
        {!notification.read && (
          <span className="h-2 w-2 rounded-full bg-emerald-500 mt-1 mr-2"></span>
        )}
        <div className="flex-1">
          <p className="text-sm text-gray-800">{notification.message}</p>
          <p className="text-xs text-gray-500">{notification.time}</p>
        </div>
      </div>
    </div>
  );
  
  export default NotificationItem;
  