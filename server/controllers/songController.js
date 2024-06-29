import Song from "../models/Song.js";

const createSong = async (req, res) => {
  const { name, thumbnailUrl, audioUrl } = req.body;
  if (!name || !thumbnailUrl || !audioUrl) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  //here idk why but artistID is not a string but object like this --->{ id: '66801733adb399ac07ea1ec7', iat: 1719670579 } where artistID.id will give actual mongoose id which is not what i anticipated
  const artistID = req.userID.id; // see here the jwt toke im signing is only the mongodb id not other info like username,email etc...
  const newSong = new Song({
    name,
    thumbnailUrl,
    audioUrl,
    artist: artistID,
  });
  await newSong.save();
  return res
    .status(201)
    .json({ message: "Song created successfully!", song: newSong });
};

//get all songs that an artist has published
const getAllSongsForArtist = async (req, res) => {
  const artistID = req.userID.id ;
  const songs = await Song.find({ artist: artistID });
  return res.status(200).json({ songs });
};

export { createSong, getAllSongsForArtist };
