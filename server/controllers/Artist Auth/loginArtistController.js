import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Artist from "../../models/Artist.js";

const loginArtist = async (req, res) => {
  const { email, password } = req.body;
  const artist = await Artist.findOne({ email });
  if (!artist) {
    return res.status(404).json({
      message: "Artist not found",
      success: false,
    });
  }
  const isMatch = await bcrypt.compare(password, artist.password);
  if (!isMatch) {
    return res.status(400).json({
      message: "username or password is incorrect",
      success: false,
    });
  }
  const token = jwt.sign({ id: artist._id }, process.env.JWT_SECRET);
  res.status(200).json({
    token,
    artise: {
      id: artist._id,
      name: artist.name,
      email: artist.email,
    },
    success: true,
    message: "Artist Login successful",
  });
};

export default loginArtist;
