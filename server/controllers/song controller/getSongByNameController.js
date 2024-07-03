import Song from "../../models/Song.js";

//get a single song by name
const getSongByName = async (req, res) => {
  //exact name-matching is not good ---> do pattern matching
  const songName = req.params.songName;
  const songs = await Song.find({ name: songName });
  return res.status(200).json({ songs });
};

export default getSongByName;
