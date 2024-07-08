import Artist from "../../models/Artist.js";
import Song from "../../models/Song.js";
import uploadToCloudinary from "../../utils/cloudinary.js";

const createSong = async (req, res) => {
  console.log(req);
  const { name } = req.body;
  const thumbnailFile = req.files.thumbnailImage[0];
  const audioFile = req.files.trackFile[0];
  const artistID = req.userID.id;
  console.log(req.files, "req.files");

  if (!name || !thumbnailFile || !audioFile) {
    // console.log(name, thumbnailFile, audioFile);
    return res.status(400).json({ message: "All fields are required!" });
  }
  try {
    // console.log(thumbnailFile, audioFile);

    const thumbnailResponse = await uploadToCloudinary(thumbnailFile.path);
    const audioResponse = await uploadToCloudinary(audioFile.path);
    // console.log("thumbnailResponse", thumbnailResponse);
    // console.log("audioResponse", audioResponse);
    const newSong = new Song({
      name,
      thumbnailUrl: thumbnailResponse.secure_url,
      audioUrl: audioResponse.secure_url,
      artist: artistID,
    });
    await newSong.save();

    return res.status(201).json({
      message: "Track Published Successfully!",
      song: newSong,
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};

export default createSong;
