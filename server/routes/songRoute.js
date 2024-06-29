import express from "express";
import artistAuthMiddleware from "../middleware/artistAuthMiddleware.js";
import {
  createSong,
  getAllSongsForArtist,
} from "../controllers/songController.js";

const songRouter = express.Router();

songRouter.post("/create", artistAuthMiddleware, createSong);
songRouter.get(
  "/get-all-for-artist",
  artistAuthMiddleware,
  getAllSongsForArtist
);

export default songRouter;
