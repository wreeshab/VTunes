import User from "../../models/User.js";
import Song from "../../models/Song.js";

const getAllLikedSongs = async (req, res) => {
  const userId = req.userID.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }
    const likedSongs = await Song.find({
        _id: { $in: user.likedSongs },
    }).populate("artist","name");
  return res.status(200).json({ likedSongs, success: true });
};

export default getAllLikedSongs;
