import FriendRequest from "../../models/FriendRequest.js";

const getAllRequestsRecievedByUser = async (req, res) => {
  try {
    const toId = req.query.id; // Access 'id' from query parameters
    // console.log("toId:", toId);

    // Fetch all friend requests where 'to' field matches 'toId'
    const requests = await FriendRequest.find({ to: toId })
      .populate("from") // Populate 'from' field with user details
      .populate("to"); // Populate 'to' field with user details

    res.json(requests); // Send the array of requests as JSON response

  } catch (error) {
    console.error("Error fetching friend requests:", error);
    res.status(500).json({ message: "Failed to fetch friend requests" });
  }
};

export default getAllRequestsRecievedByUser;
