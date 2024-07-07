import express from "express";
import sendFriendRequest from "../controllers/friend Request/sendRequestController.js";
import acceptFriendRequest from "../controllers/friend Request/acceptRequestController.js";
import declineFriendRequest from "../controllers/friend Request/declineRequestController.js";
import userAuthMiddleware from "../middleware/userAuthMiddleware.js";
import getRequestStatus from "../controllers/friend Request/getRequestStatus.js";
import getAllRequestsRecievedByUser from "../controllers/friend Request/getAllRequests.js";

const friendRequstRouter = express.Router();

friendRequstRouter.post("/send", userAuthMiddleware, sendFriendRequest);
friendRequstRouter.post("/accept", userAuthMiddleware, acceptFriendRequest);
friendRequstRouter.post("/decline", userAuthMiddleware, declineFriendRequest);
friendRequstRouter.post("/friend-status", userAuthMiddleware, getRequestStatus);
friendRequstRouter.get(
  "/get-all-req-recieved/",
  userAuthMiddleware,
  getAllRequestsRecievedByUser
);

export default friendRequstRouter;
