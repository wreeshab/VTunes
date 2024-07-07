import FriendRequest from "../../models/FriendRequest.js";
import User from "../../models/User.js";


const declineFriendRequest = async (req, res) => {
  const { requestId } = req.body;

  try {
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.status === "accepted") {
      return res
        .status(400)
        .json({ message: "Friend request already accepted" });
    }

    friendRequest.status = "declined";
    await friendRequest.save();

    const toUser = await User.findById(friendRequest.to);
    toUser.friendRequests = toUser.friendRequests.filter(
      (request) => request.toString() !== requestId
    );

    await toUser.save();

    res.status(200).json({ message: "Friend request declined" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default declineFriendRequest;
