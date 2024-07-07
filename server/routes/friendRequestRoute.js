import express from "express";
import sendFriendRequest from "../controllers/friend Request/sendRequestController.js";
import acceptFriendRequest from "../controllers/friend Request/acceptRequestController.js";
import declineFriendRequest from "../controllers/friend Request/declineRequestController.js";

const friendRequstRouter = express.Router();

friendRequstRouter.post("/send", sendFriendRequest);
friendRequstRouter.post("/accept", acceptFriendRequest);
friendRequstRouter.post("/decline", declineFriendRequest);

export default friendRequstRouter;
