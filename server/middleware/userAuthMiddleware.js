import jwt from "jsonwebtoken";

const userAuthMiddleware = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized User", success: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = decoded;
    next();
  } catch (err) {
    console.log("not able to verify user ", err);
    return res
      .status(401)
      .json({ message: "Unauthorized User/ Invalid Token", success: false });
  }
};

export default userAuthMiddleware;
