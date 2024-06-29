import Artist from "../models/Artist.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import isEmail from "validator/lib/isEmail.js";

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

export { loginArtist, registerArtist };
