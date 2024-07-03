import Playlist from "../../models/Playlist.js";
import Song from "../../models/Song.js";
import User from "../../models/User.js";

const createPlaylist = async (req, res) => {
  const currentUserId = req.userID.id; //again that sme object appearing that no one anticipated
  const { name, thumbnail } = req.body;
  if (!name || !thumbnail) {
    return res
      .status(400)
      .json({ message: "Name and thumbnail are required." });
  }
  const playlistData = {
    name,
    thumbnail,
    owner: currentUserId,
  };
  const playlist = await Playlist.create(playlistData);
  const user = await User.findById(currentUserId);
  user.createdPlaylists.push(playlist._id);
  await user.save();

  res.status(201).json(playlist);
};

export default createPlaylist;