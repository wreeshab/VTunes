import express from "express";
import userAuthMiddleware from "../middleware/userAuthMiddleware.js";
import {
  addSongToPlaylist,
  createPlaylist,
  getAllPlaylistsMadeByUser,
  getPlaylistById,
  removeSongFromPlaylist,
} from "../controllers/playlistController.js";
const playlistRouter = express.Router();

//create playlist
playlistRouter.post("/create", userAuthMiddleware, createPlaylist);

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
