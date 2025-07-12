import React, { useEffect, useState } from "react";
import axios from "axios";
import { connectWebSocket, disconnectWebSocket } from "../utils/websocket";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/notifications")
      .then(res => setNotifications(res.data))
      .catch(console.error);

    // connectWebSocket({
    //   onNotificationReceived: (notif) => {
    //     setNotifications((prev) => [notif, ...prev]);
    //   },
    // });

    // return () => disconnectWebSocket();
  }, []);

  useEffect(() => {
  const client = connectWebSocket({
    onNotificationReceived: (notif) => {
      setNotifications((prev) => [notif, ...prev]);
    }
  });

  return () => {
    if (client) disconnectWebSocket();
  };
}, []);


  const markAsRead = async (id) => {
    await axios.patch(`http://localhost:8080/api/notifications/${id}/read`);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.map((n) => (
        <div
          key={n.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px",
            background: n.read ? "#eee" : "#fff",
          }}
        >
          <h4>{n.title}</h4>
          <p>{n.content}</p>
          <small>{n.timestamp}</small>
          <br />
          {!n.read && (
            <button onClick={() => markAsRead(n.id)}>Mark as Read</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationPage;
