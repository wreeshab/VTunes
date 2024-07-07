import FriendRequest from "../../models/FriendRequest.js";
import User from "../../models/User.js";

const sendFriendRequest = async (req, res) => {
  const { fromId, toId } = req.body;
  try {
    const existingRequest = await FriendRequest.findOne({
      from: fromId,
      to: toId,
    });
    if (existingRequest) {
      return res.status(400).send("Friend request already sent");
    }
    const requester = await User.findById(fromId);
    if (requester.friends.includes(toId)) {
      return res.status(400).send("You are already friends");
    }
    const newFriendRequest = new FriendRequest({
      from: fromId,
      to: toId,
    });
    await newFriendRequest.save();
    // Send notification to recipient
    const recipient = await User.findById(toId);
    recipient.friendRequests.push(newFriendRequest._id);
    await recipient.save();
    // Send notification to sender
    const sender = await User.findById(fromId);
    sender.friendRequests.push(newFriendRequest._id);
    await sender.save();

    res.status(200).send("Friend request sent");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

export default sendFriendRequest;
