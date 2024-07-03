import Playlist from "../../models/Playlist.js";
import Song from "../../models/Song.js";

const addSongToPlaylist = async (req, res) => {
  const playlistId = req.params.id;
  const songId = req.body.songId;
  if (!songId) {
    return res.status(400).json({ message: "Song ID is required." });
  }
  const song = await Song.findById(songId);
  if (!song) {
    return res.status(404).json({ message: "Song not found." });
  }
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    return res.status(404).json({ message: "Playlist not found." });
  }
  if (playlist.songs.includes(songId)) {
    return res
      .status(400)
      .json({ message: "Song already exists in playlist." });
  }
  playlist.songs.push(songId);
  await playlist.save();
  res.status(200).json({ message: "Song added to playlist.", success: true });
};

export default addSongToPlaylist;
