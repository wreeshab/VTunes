import Artist from "../../models/Artist.js";
import Song from "../../models/Song.js";
import uploadToCloudinary from "../../utils/cloudinary.js";

const createSong = async (req, res) => {
  console.log(req);
  const { name, genre, language, lyrics, djMode } = req.body;
  const thumbnailFile = req.files.thumbnailImage[0];
  const audioFile = req.files.trackFile[0];
  const artistID = req.userID.id;

  if (
    !name ||
    !thumbnailFile ||
    !audioFile ||
    !genre ||
    !language ||
    !lyrics ||
    !djMode
  ) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const thumbnailResponse = await uploadToCloudinary(thumbnailFile.path);
    const audioResponse = await uploadToCloudinary(audioFile.path);

    const newSong = new Song({
      name,
      genre,
      language,
      lyrics,
      djMode,
      thumbnailUrl: thumbnailResponse.secure_url,
      audioUrl: audioResponse.secure_url,
      artist: artistID,
    });
    await newSong.save();

    const artist = await Artist.findById(artistID);
    artist.composedSongs.push(newSong._id);
    await artist.save();

    return res.status(201).json({
      message: "Track Published Successfully!",
      song: newSong,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error publishing track." });
  }
};

export default createSong;
