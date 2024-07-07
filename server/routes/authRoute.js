import express from "express";
import loginUser from "../controllers/user auth/loginUserController.js";
import registerUser from "../controllers/user auth/registerUserController.js";
import loginWithDelta from "../controllers/user auth/authWithDelta.js";

const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.get("/delta", loginWithDelta);

export default authRouter;
