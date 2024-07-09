import { io, server } from "./socket";

const userSongMap = {};

io.on("connection", (socket) => {
  socket.on("updateCurrentSong", (data) => {
    const { userId, currentSongDetails } = data;
    userSongMap[userId] = currentSongDetails;
    io.emit("currentSongUpdate", userSongMap);
  });

  socket.on("disconnect", () => {
    const userId = socket.handshake.query.userId;
    delete userSongMap[userId];
    io.emit("currentSongUpdate", userSongMap);
  });
});
