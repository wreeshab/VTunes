import express from "express";
import {
  loginArtist,
  registerArtist,
} from "../controllers/artistAuthController.js";

const artistAuthRouter = express.Router();

artistAuthRouter.post("/login", loginArtist);
artistAuthRouter.post("/register", registerArtist);

export default artistAuthRouter;
