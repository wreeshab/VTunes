import FriendRequest from "../../models/FriendRequest.js";
import User from "../../models/User.js";

const getRequestStatus = async (req, res) => {
  try {
    const { toId } = req.body;
    const fromId = req.userID.id;
    console.log(fromId);
    console.log(req.params);

    // checking if the users are already friends
    const user = await User.findById(fromId);
    if (user.friends.includes(toId)) {
      return res.status(200).json({ status: "friends" });
    }

    // checking if there's a pending friend request be careful
    const request = await FriendRequest.findOne({ from: fromId, to: toId });
    console.log(request);
    if (request) {
      return res.status(200).json({ status: request.status });
    }

    // checkng if there's a received friend request
    const receivedRequest = await FriendRequest.findOne({
      from: toId,
      to: fromId,
    });
    if (receivedRequest) {
      return res.status(200).json({ status: receivedRequest.status });
    }

    // No request
    res.status(200).json({ status: "none" });
  } catch (error) {
    console.error("Error fetching friend request status:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching friend request status",
    });
  }
};

export default getRequestStatus;
