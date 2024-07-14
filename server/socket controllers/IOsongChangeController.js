import User from "../models/User.js";
import { userSocketMap } from "../socket/socket.js";

const songChangeIo = async ({ io, socket, userId, songDetails }) => {
  // console.log(
  //   userId,
  //   songDetails,
  //   "-----------------------------------------------------------------"
  // );

  if (!songDetails) {
    return;
  }

  try {
    await User.findByIdAndUpdate(userId, {
      currentlyPlaying: songDetails,
    });

    const user = await User.findById(userId).populate("friends", "_id");
    if (!user) {
      // console.log(`User with ID ${userId} not found.`);
      return;
    }

    const friends = user.friends;
    // console.log(friends);

    friends.forEach((friend) => {
      // console.log(userSocketMap);
      // here im emitting the update in song only to user"s friend to save some memory
      if (userSocketMap[friend._id.toString()]) {
        io.to(userSocketMap[friend._id.toString()]).emit("updateSong", {
          userId,
          songDetails,
        });
      } else {
        // console.log(`Socket not found for friend with ID ${friend._id}.`);
      }
    });
  } catch (error) {
    console.log("Error updating song details:", error);
  }
};

export default songChangeIo;
