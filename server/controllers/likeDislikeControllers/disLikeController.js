import Song from "../../models/Song.js";
import User from "../../models/User.js";

// this is a bit complex to handle in db as it involves 2 models (user and song that is) at a time, ive added comments to make life easier

const dislikeSong = async (req, res) => {
  try {
    const songId = req.params.id;
    const userId = req.userID.id;

    const song = await Song.findById(songId);
    if (!song) {
      return res
        .status(404)
        .json({ message: "Song not found", success: false });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Check if user already disliked the song
    if (song.dislikes.includes(userId)) {
      // Undisliking the song
      song.dislikes = song.dislikes.filter((id) => id.toString() !== userId);
      await song.save();
      //remove disliked song id from user
      user.disLikedSongs = user.disLikedSongs.filter(
        (id) => id.toString() !== songId
      );
      await user.save();
      return res
        .status(200)
        .json({ message: "Song undisliked", success: true });
    }

    // Dislike the song
    song.dislikes.push(userId);
    song.likes = song.likes.filter((id) => id.toString() !== userId);
    await song.save();
    //add disliked song id to user
    user.disLikedSongs.push(songId);
    //remove liked song id from user
    user.likedSongs = user.likedSongs.filter((id) => id.toString() !== songId);
    await user.save();

    return res.status(200).json({ message: "Song disliked", success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export default dislikeSong;
