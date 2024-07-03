import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "User does not exist", success: false });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect", success: false });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    success: true,
    message: "Login successful",
  });
};

export default loginUser;