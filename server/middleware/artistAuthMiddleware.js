import jwt from "jsonwebtoken";
import express from "express";

const artistAuthMiddleware = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized Artist", success: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = decoded;
    next();
  } catch (err) {
    console.log("not able to verify artist ", err);
    return res
      .status(401)
      .json({ message: "Unauthorized Artist/ Invalid Token", success: false });
  }
};

export default artistAuthMiddleware;
