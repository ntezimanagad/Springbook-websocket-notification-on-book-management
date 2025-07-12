// src/pages/NotificationPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import { over } from "stompjs";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    // Initial fetch
    axios.get("http://localhost:8080/api/notifications")
      .then(res => setNotifications(res.data))
      .catch(console.error);

    // WebSocket setup
    const socket = new SockJS("http://localhost:8080/ws");
    const stomp = over(socket);

    stomp.connect({}, () => {
      stomp.subscribe("/topic/notifications", (msg) => {
        const notif = JSON.parse(msg.body);
        setNotifications(prev => [notif, ...prev]);
      });
    });

    setStompClient(stomp);

    return () => {
      if (stompClient) stompClient.disconnect();
    };
  }, []);

  const markAsRead = async (id) => {
    await axios.patch(`http://localhost:8080/api/notifications/${id}/read`);
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.map(n => (
        <div key={n.id} style={{ border: "1px solid #ccc", margin: "10px", background: n.read ? "#eee" : "#fff" }}>
          <h4>{n.title}</h4>
          <p>{n.content}</p>
          <small>{n.timestamp}</small><br/>
          {!n.read && <button onClick={() => markAsRead(n.id)}>Mark as Read</button>}
        </div>
      ))}
    </div>
  );
};

export default NotificationPage;
