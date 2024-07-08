import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});
const userSocketMap = {}; // object with userId as key and socketId as value

io.on("connection", (socket) => {
  console.log(socket.id, "user connected!");

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") {
    userSocketMap[userId] = socket.id;
  }
  // soon as an user joins he'll get info about the other users online
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  console.log(userSocketMap);
});
io.on("disconnect", () => {
  console.log(socket.id, "user disconnected!");
  delete userSocketMap[userId];
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
});
export { app, io, server };
