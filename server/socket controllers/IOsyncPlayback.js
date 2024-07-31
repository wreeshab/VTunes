const syncPlaybackIo = async ({ io, socket }) => {
  socket.on("join-room", (userId) => {
    socket.join(userId);
    console.log(userId)
    console.log(`${userId} joined the room`);
  });

  socket.on("leave-room", (userId) => {
    socket.leave(userId);
    console.log(`${userId} left the room`);
  });

  socket.on("play", (userId) => {
    socket.to(userId).emit("play");
    console.log(`Broadcasting play event in room: ${userId}`);
  });

  socket.on("pause", (userId) => {
    socket.to(userId).emit("pause");
    console.log(`Broadcasting pause event in room: ${userId}`);
  });

  socket.on("seek", (userId, time) => {
    socket.to(userId).emit("seek", time);
    console.log(`Broadcasting seek event in room: ${userId}, time: ${time}`);
  });

  socket.on("track-change", ({ userId, audioUrl, songDetails }) => {
    socket.to(userId).emit("track-change", { audioUrl, songDetails });
    console.log({audioUrl, songDetails})
    console.log(`Broadcasting track-change event in room: ${userId}`);
  });

  socket.on("update-queue", ({ userId, newQueue }) => {
    socket.to(userId).emit("update-queue", newQueue);
    console.log(`Broadcasting update-queue event in room: ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
};

export default syncPlaybackIo;
