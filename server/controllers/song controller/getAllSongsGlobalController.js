import Song from "../../models/Song.js";

const getAllSongsGlobal = async (req, res) => {
  const songs = await Song.find().populate("artist", "name");
  return res.status(200).json({ songs });
};
export default getAllSongsGlobal;