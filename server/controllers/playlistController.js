import Playlist from "../models/Playlist.js";
import Song from "../models/Song.js";
import User from "../models/User.js";

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

const getPlaylistById = async (req, res) => {
  const playlistId = req.params.id;
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    return res.status(404).json({ message: "Playlist not found." });
  }
  res.status(200).json(playlist);
};

const getAllPlaylistsMadeByUser = async (req, res) => {
  const userId = req.userID.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }
  const playlistsByUser = await Playlist.find({ owner: userId });

  return res.status(200).json(playlistsByUser);

};

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
export {
  createPlaylist,
  getPlaylistById,
  getAllPlaylistsMadeByUser,
  removeSongFromPlaylist,
  addSongToPlaylist,
};
