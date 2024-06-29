import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongooseConnectionDB from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import artistAuthRouter from "./routes/artistAuthRoute.js";

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

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
