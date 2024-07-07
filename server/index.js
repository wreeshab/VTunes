import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongooseConnectionDB from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import artistAuthRouter from "./routes/artistAuthRoute.js";
import songRouter from "./routes/songRoute.js";
import playlistRouter from "./routes/playlistRoute.js";
import searchRouter from "./routes/searchRouter.js";
import friendRequstRouter from "./routes/friendRequestRoute.js";
import getUserProfile from "./controllers/user Controller/getUserInfoController.js";

//importing routes

const app = express();

const PORT = process.env.PORT || 5000;

//init db
mongooseConnectionDB(process.env.MONGO_URL);

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", authRouter);
app.use("/api/artist-auth", artistAuthRouter);
app.use("/api/user-info", getUserProfile); //this get user info does not have routes, direct connection to controller
app.use("/api/songs", songRouter);
app.use("/api/playlist", playlistRouter);
app.use("/api/search", searchRouter);
app.use("/api/friend-request", friendRequstRouter);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
