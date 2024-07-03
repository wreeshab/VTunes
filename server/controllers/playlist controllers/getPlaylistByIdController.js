import Playlist from "../../models/Playlist.js";

const getPlaylistById = async (req, res) => {
  const playlistId = req.params.id;
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    return res.status(404).json({ message: "Playlist not found." });
  }
  res.status(200).json(playlist);
};

export default getPlaylistById;
