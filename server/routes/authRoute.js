import express from "express";
import loginUser from "../controllers/user auth/loginUserController.js";
import registerUser from "../controllers/user auth/registerUserController.js";

const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);

export default authRouter;