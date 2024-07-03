import Artist from "../../models/Artist.js";
import Song from "../../models/Song.js";


//get all songs by any (single) artist
const getAllSongsByAnArtistForUser = async (req, res) => {
  const artistId = req.params.artistId;
  const artist = await Artist.findById(artistId);
  if (!artist) {
    return res.status(404).json({ message: "Artist not found" });
  }

  const songs = await Song.find({ artist: artistId });
  return res.status(200).json({ songs });
};

export default getAllSongsByAnArtistForUser;
