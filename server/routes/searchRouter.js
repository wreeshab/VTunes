import express from "express";
import userAuthMiddleware from "../middleware/userAuthMiddleware.js";
import search from "../controllers/searchController/searchController.js";

const searchRouter = express.Router();

searchRouter.get("/", userAuthMiddleware, search);

export default searchRouter;
