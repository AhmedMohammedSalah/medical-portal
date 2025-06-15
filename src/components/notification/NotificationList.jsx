import React, { useEffect, useState } from "react";
import apiEndpoints from "../../services/api";
import NotificationItem from "./NotificationItem";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiEndpoints.notifications
      .list()
      .then((res) => setNotifications(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading notifications...</div>;

  return (
    <div className="space-y-4">
      {notifications.length === 0 ? (
        <div className="text-gray-500">No notifications found.</div>
      ) : (
        notifications.map((n) => (
          <NotificationItem key={n.id} notification={n} />
        ))
      )}
    </div>
  );
};

export default NotificationList;
