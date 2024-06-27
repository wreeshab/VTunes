import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongooseConnectionDB from "./config/db.js";

const app = express();

const PORT = process.env.PORT || 5000;

//init db
mongooseConnectionDB(process.env.MONGO_URL);

//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
