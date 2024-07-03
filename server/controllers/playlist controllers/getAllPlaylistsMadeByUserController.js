import Playlist from "../../models/Playlist.js";
import User from "../../models/User.js";

const getAllPlaylistsMadeByUser = async (req, res) => {
  const userId = req.userID.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }
  const playlistsByUser = await Playlist.find({ owner: userId });

  return res.status(200).json(playlistsByUser);
};

export default getAllPlaylistsMadeByUser;
