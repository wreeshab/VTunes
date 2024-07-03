import isEmail from "validator/lib/isEmail.js";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import bcrypt from "bcrypt";


const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please fill in all fields", success: false });
  }
  if (!isEmail(email)) {
    return res
      .status(400)
      .json({ message: "Please enter a valid email address", success: false });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists", success: false });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(201).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    success: true,
    message: "Registration successful",
  });
};

export default registerUser;