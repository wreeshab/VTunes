import express from "express";
import loginArtist from "../controllers/Artist Auth/loginArtistController.js";
import registerArtist from "../controllers/Artist Auth/registerArtistController.js";

const artistAuthRouter = express.Router();

artistAuthRouter.post("/login", loginArtist);
artistAuthRouter.post("/register", registerArtist);

export default artistAuthRouter;
