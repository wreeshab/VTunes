import User from "../../models/User.js";

const getUserProfile = async (req, res) => {
  // const { userId } = req.params;
  const userId = req.userID.id
  try {
    const user = await User.findById(userId)
      .populate("friends")
      .populate("friendRequests")
      .populate("createdPlaylists")
      .populate("disLikedSongs")
      .populate("likedSongs");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export default getUserProfile;
