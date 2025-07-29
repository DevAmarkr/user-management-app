import { io } from "socket.io-client";
const socket = io("http://localhost:5001", {
  transports: ["websocket"]
});

socket.on("connect_error", (err) => {
  console.error("Socket connect error:", err);
});

export default socket;
