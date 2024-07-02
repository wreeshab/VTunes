import Song from "../models/Song.js"

const likeSong = async (req, res) => {
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
    if (song.likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this song", success: false });
    }
    song.likes.push(userId);

    song.dislikes = song.dislikes.filter((id) => id !== userId);
    await song.save();

    return res.status(200).json({ message: "Song liked", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

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
    if (song.dislikes.includes(userId)) {
      return res.status(400).json({
        message: "You have already disliked this song",
        success: false,
      });
    }
    song.dislikes.push(userId);

    song.likes = song.likes.filter((id) => id.toString() !== userId);

    await song.save();

    return res.status(200).json({ message: "Song disliked", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export { likeSong, dislikeSong };