import User from "../../models/User.js";

const getAllPublicPlaylistsMadeByUser = async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId).populate("createdPlaylists");
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }
  const publicPlaylists = user.createdPlaylists.filter(
    (playlist) => !playlist.private
  );
  return res.status(200).json(publicPlaylists);
};

export default getAllPublicPlaylistsMadeByUser;
