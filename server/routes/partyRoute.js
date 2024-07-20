import express from "express";
import userAuthMiddleware from "../middleware/userAuthMiddleware.js";
import createPartyRoom from "../controllers/party Controllers/createParty.js";

const partyRouter = express.Router();

partyRouter.post("/create-party-room", userAuthMiddleware, createPartyRoom);

export default partyRouter;
