import FriendRequest from "../../models/FriendRequest.js";
import User from "../../models/User.js";

const acceptFriendRequest = async (req, res) => {
  const { requestId } = req.body;
  const friendRequest = await FriendRequest.findById(requestId);
  if (!friendRequest) {
    return res.status(404).send("Friend request not found");
  }
  if (friendRequest.status === "accepted") {
    return res.status(400).send("Friend request already accepted");
  }
  friendRequest.status = "accepted";
  await friendRequest.save();

  const fromUser = await User.findById(friendRequest.from);
  const toUser = await User.findById(friendRequest.to);

  fromUser.friends.push(toUser._id);
  toUser.friends.push(fromUser._id);

  fromUser.friends.push(toUser._id);
  toUser.friends.push(fromUser._id);

  fromUser.friendRequests = fromUser.friendRequests.filter(
    (request) => request.toString() !== requestId
  );
  toUser.friendRequests = toUser.friendRequests.filter(
    (request) => request.toString() !== requestId
  );

  await fromUser.save();
  await toUser.save();

  res.status(200).send("Friend request accepted");
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export default acceptFriendRequest;
