// src/socket.js
import { io } from "socket.io-client";
import baseURL from "./BaseURL";



const socket = io(baseURL, {
  transports: ["websocket"], // Ensure WebSocket transport
  autoConnect: false,        // Prevent auto-connection
});

export default socket;
