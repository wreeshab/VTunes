import User from "../../models/User.js";

const getFriendDetails = async (req, res) => {
  const friendId = req.params.id;
  const user = await User.findById(friendId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
};

export default getFriendDetails;
