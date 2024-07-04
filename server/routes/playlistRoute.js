import express from "express";
import userAuthMiddleware from "../middleware/userAuthMiddleware.js";

import createPlaylist from "../controllers/playlist controllers/createPlaylistController.js";
import getPlaylistById from "../controllers/playlist controllers/getPlaylistByIdController.js";
import getAllPlaylistsMadeByUser from "../controllers/playlist controllers/getAllPlaylistsMadeByUserController.js";
import removeSongFromPlaylist from "../controllers/playlist controllers/removeSongFromPlaylistController.js";
import addSongToPlaylist from "../controllers/playlist controllers/addSongToPlaylistController.js";
import upload from "../middleware/multerMiddleware.js";

const playlistRouter = express.Router();

//create playlist
playlistRouter.post(
  "/create",
  userAuthMiddleware,
  upload.fields([{ name: "thumbnailImage", maxCount: 1 }]),
  createPlaylist
);

//get all playlists
playlistRouter.get("/", userAuthMiddleware, getAllPlaylistsMadeByUser);

//get playlist by id
playlistRouter.get("/:id", userAuthMiddleware, getPlaylistById);

//add song to playlist
playlistRouter.post("/:id/add-song", userAuthMiddleware, addSongToPlaylist);

//remove song from playlist
playlistRouter.post(
  "/:id/remove-song",
  userAuthMiddleware,
  removeSongFromPlaylist
);

export default playlistRouter;
