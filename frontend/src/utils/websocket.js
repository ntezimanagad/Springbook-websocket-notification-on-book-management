// src/utils/websocket.js
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

/**
 * Connect to WebSocket and subscribe to topics.
 * @param {Object} options
 * @param {Function} [options.onBookReceived] - Callback when book update is received
 * @param {Function} [options.onNotificationReceived] - Callback when notification is received
 * @returns {Client} The active STOMP client
 */
export const connectWebSocket = ({ onBookReceived, onNotificationReceived }) => {
  if (stompClient && stompClient.active) {
    console.warn('🟡 WebSocket is already connected.');
    return stompClient;
  }

  const socket = new SockJS('http://localhost:8080/ws');

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    debug: (str) => console.log('[WebSocket]', str),
    onConnect: () => {
      console.log('✅ WebSocket connected');

      // Subscribe to /topic/books
      if (onBookReceived) {
        stompClient.subscribe('/topic/books', (message) => {
          const book = JSON.parse(message.body);
          console.log('📚 Book received:', book);
          onBookReceived(book);
        });
      }

      // Subscribe to /topic/notifications
      if (onNotificationReceived) {
        stompClient.subscribe('/topic/notifications', (message) => {
          const notif = JSON.parse(message.body);
          console.log('🔔 Notification received:', notif);
          onNotificationReceived(notif);
        });
      }
    },
    onStompError: (frame) => {
      console.error('❌ STOMP error:', frame);
    },
    onWebSocketError: (event) => {
      console.error('❌ WebSocket error:', event);
    },
    onDisconnect: () => {
      console.log('🔌 Disconnected from WebSocket');
    },
  });

  stompClient.activate();
  return stompClient;
};

/**
 * Disconnect from the WebSocket server.
 */
export const disconnectWebSocket = () => {
  if (stompClient && stompClient.active) {
    stompClient.deactivate();
    console.log('🛑 WebSocket deactivated');
  }
};
