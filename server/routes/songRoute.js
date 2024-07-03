import express from "express";
import artistAuthMiddleware from "../middleware/artistAuthMiddleware.js";
import userAuthMiddleware from "../middleware/userAuthMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

import createSong from "../controllers/song controller/createSongController.js";
import getAllSongsGlobal from "../controllers/song controller/getAllSongsGlobalController.js";
import getAllSongsForArtist from "../controllers/song controller/getAllSongsForArtistController.js";
import getAllSongsByAnArtistForUser from "../controllers/song controller/getAllSongsByAnArtistForUserController.js";
import getSongByName from "../controllers/song controller/getSongByNameController.js";
import dislikeSong from "../controllers/likeDislikeControllers/disLikeController.js";
import likeSong from "../controllers/likeDislikeControllers/likeController.js";

const songRouter = express.Router();

//create song
songRouter.post(
  "/create",
  artistAuthMiddleware,
  upload.fields([
    { name: "thumbnailImage", maxCount: 1 },
    { name: "trackFile", maxCount: 1 },
  ]),
  createSong
);

songRouter.get("/", userAuthMiddleware, getAllSongsGlobal);

//get all songs for artist portal
songRouter.get(
  "/get-all-for-artist",
  artistAuthMiddleware,
  getAllSongsForArtist
);

// get all songs by an artist for admin portal
songRouter.get(
  "/get-all-by-artist-for-user/:artistId",
  userAuthMiddleware,
  getAllSongsByAnArtistForUser
);

// like a song
songRouter.post("/like/:id", userAuthMiddleware, likeSong);

// dislike a song
songRouter.post("/dislike/:id", userAuthMiddleware, dislikeSong);

// get song by name
songRouter.get("/song-by-name/:songName", userAuthMiddleware, getSongByName);

export default songRouter;
