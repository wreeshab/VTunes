import Playlist from "../../models/Playlist.js";
import Song from "../../models/Song.js";

const getPlaylistById = async (req, res) => {
  try {
    const playlistId = req.params.id;

    const playlist = await Playlist.findById(playlistId).populate("owner","name");
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found." });
    }

    const songsArray = await Promise.all(
      playlist.songs.map(async (songId) => {
        const song = await Song.findById(songId.toString()).populate(
          "artist",
          "name"
        );
        return song;
      })
    );

    res.status(200).json({ success: true, playlist, songsArray });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export default getPlaylistById;
