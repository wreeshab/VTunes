import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Artist from "../../models/Artist.js";
import isEmail from "validator/lib/isEmail.js";

const registerArtist = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please fill in all fields", success: false });
  }
  if (!isEmail(email)) {
    return res
      .status(400)
      .json({ message: "Please enter a valid email", success: false });
  }
  const artist = await Artist.findOne({ email });
  if (artist) {
    return res
      .status(400)
      .json({ message: "Artist already exists", success: false });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newArtist = new Artist({
    name,
    email,
    password: hashedPassword,
  });
  await newArtist.save();
  const token = jwt.sign({ id: newArtist._id }, process.env.JWT_SECRET);
  res.status(201).json({
    token,
    artist: {
      id: newArtist._id,
      name: newArtist.name,
      email: newArtist.email,
    },
    success: true,
    message: "Artist registered successfully",
  });
};

export default registerArtist;
