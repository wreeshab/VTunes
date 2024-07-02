import Artist from "../models/Artist.js";
import Song from "../models/Song.js";
import uploadToCloudinary from "../utils/cloudinary.js";


const getAllSongsGlobal = async (req, res) => {
  const songs = await Song.find();
  return res.status(200).json({ songs });
};



const createSong = async (req, res) => {
  // console.log(req);
  const { name } = req.body;
  const thumbnailFile = req.files.thumbnailImage[0];
  const audioFile = req.files.trackFile[0];
  const artistID = req.userID.id;
  console.log(req.files,"req.files");
  
  if (!name || !thumbnailFile || !audioFile) {
    console.log(name , thumbnailFile, audioFile)
    return res.status(400).json({ message: "All fields are required!" });
  }
  try {
    console.log(thumbnailFile, audioFile);

    const thumbnailResponse = await uploadToCloudinary(thumbnailFile.path);
    const audioResponse = await uploadToCloudinary(audioFile.path);
    console.log("thumbnailResponse", thumbnailResponse);
    console.log("audioResponse" ,audioResponse);
    const newSong = new Song({
      name,
      thumbnailUrl: thumbnailResponse.secure_url,
      audioUrl: audioResponse.secure_url,
      artist: artistID,
    });
    await newSong.save();

    return res
      .status(201)
      .json({
        message: "Track Published Successfully!",
        song: newSong,
        success: true,
      });
  } catch (error) {
    console.error(error);
  }
};

//get all songs that I (artist) has published
const getAllSongsForArtist = async (req, res) => {
  const artistID = req.userID.id;
  const songs = await Song.find({ artist: artistID });
  return res.status(200).json({ songs });
};

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

//get a single song by name
const getSongByName = async (req, res) => {
  //exact name-matching is not good ---> do pattern matching
  const songName = req.params.songName;
  const songs = await Song.find({ name: songName });
  return res.status(200).json({ songs });
};

export {
  createSong,
  getAllSongsForArtist,
  getAllSongsByAnArtistForUser,
  getSongByName,
  getAllSongsGlobal
};
