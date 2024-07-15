import Playlist from "../../models/Playlist.js";
import User from "../../models/User.js";
import uploadToCloudinary from "../../utils/cloudinary.js";


const createPlaylist = async (req, res) => {
  const userId = req.userID.id;
  const thumbnailFIle = req.files.thumbnailImage[0];
  const { name, private: isPrivate } = req.body; 

  if (!name || !thumbnailFIle) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const existingPlaylist = await Playlist.findOne({ name });
    if (existingPlaylist) {
      return res.status(400).json({ message: "Playlist already exists!" });
    }

    const thumbnailResponse = await uploadToCloudinary(thumbnailFIle.path);
    // console.log(thumbnailResponse);


    const newPlaylist = await Playlist.create({
      name,
      thumbnail: thumbnailResponse.secure_url,
      owner: userId,
      private: isPrivate, 
    });
    // console.log(newPlaylist);

    await newPlaylist.save();

    const user = await User.findById(userId);
    user.createdPlaylists.push(newPlaylist._id);
    await user.save();

    return res.status(201).json({ message: "Playlist created successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export default createPlaylist;
