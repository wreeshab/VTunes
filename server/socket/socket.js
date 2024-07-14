import { Server } from "socket.io";
import http from "http";
import express from "express";
import songChangeIo from "../socket controllers/IOsongChangeController.js";
import syncPlaybackIo from "../socket controllers/IOsyncPlayback.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});
export const userSocketMap = {}; // object with userId as key and socketId as value

io.on("connection", (socket) => {
  console.log(socket.id, "user connected!");

  const userId = socket.handshake.query.userId;
  if (userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }
  // As soon as a user joins, they'll get info about the other users online
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("start-playing", (data) => {
    songChangeIo({
      io,
      socket,
      userId: data.userId,
      songDetails: data.songDetails,
    });
  });
  syncPlaybackIo({ io, socket });

  // console.log(userSocketMap);

  socket.on("disconnect", () => {
    console.log(socket.id, "user disconnected!");
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
