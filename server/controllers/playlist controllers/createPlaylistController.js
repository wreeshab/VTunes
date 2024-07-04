import Playlist from "../../models/Playlist.js";
import Song from "../../models/Song.js";
import User from "../../models/User.js";
import uploadToCloudinary from "../../utils/cloudinary.js";

const createPlaylist = async (req, res) => {
  const userId = req.userID.id; //again that sme object appearing that no one anticipated
  const thumbnailFIle = req.files.thumbnailIMage[0];

  const { name } = req.body;
  if (!name || !thumbnailFIle) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  try {
    const thumbnailResponse = await uploadToCloudinary(thumbnailFIle.path);
    console.log("thumbnailresp", thumbnailResponse);

    const newPlaylist = await Playlist.create({
      name,
      thumbnail: thumbnailResponse.secure_url,
      owner: userId,
    });
    await newPlaylist.save();
    const user = await User.findById(userId);
    user.playlists.push(newPlaylist._id);
    await user.save();

    return res.status(201).json({ message: "Playlist created successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export default createPlaylist;
