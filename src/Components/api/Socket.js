// src/socket.js
import { io } from "socket.io-client";

 const SOCKET_URL = "https://personalwebsitebackend-ntzy.onrender.com";
//const SOCKET_URL = 'http://localhost:4020' // Replace with your backend URL

const socket = io(SOCKET_URL, {
  transports: ["websocket"], // Ensure WebSocket transport
  autoConnect: false,        // Prevent auto-connection
});

export default socket;
