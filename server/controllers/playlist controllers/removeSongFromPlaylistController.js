import Playlist from "../../models/Playlist.js";
import Song from "../../models/Song.js";
import User from "../../models/User.js";

const removeSongFromPlaylist = async (req, res) => {
  const playlistId = req.params.id;
  const songId = req.body.songId;
  if (!songId) {
    return res.status(400).json({ message: "Song ID is required." });
  }
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    return res.status(404).json({ message: "Playlist not found." });
  }
  if (!playlist.songs.includes(songId)) {
    return res.status(400).json({ message: "Song not found in playlist." });
  }
  playlist.songs = playlist.songs.filter((id) => id !== songId);
  await playlist.save();
  res
    .status(200)
    .json({ message: "Song removed from playlist.", success: true });
};

export default removeSongFromPlaylist;
