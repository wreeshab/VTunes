import mongoose from "mongoose";

const mongooseConnectionDB = (mongoURL) => {
  mongoose
    .connect(mongoURL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));
};

export default mongooseConnectionDB;