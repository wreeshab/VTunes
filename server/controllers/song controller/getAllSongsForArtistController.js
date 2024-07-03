import Song from "../../models/Song.js";

//get all songs that I (artist) has published
const getAllSongsForArtist = async (req, res) => {
  const artistID = req.userID.id;
  const songs = await Song.find({ artist: artistID });
  return res.status(200).json({ songs });
};

export default getAllSongsForArtist;
