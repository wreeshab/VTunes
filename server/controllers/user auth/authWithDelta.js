import axios from "axios";
import qs from "qs";
import User from "../../models/User.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginWithDelta = async (req, res) => {
  // console.log(req);
  const code = req.query.code;
  // console.log(code);

  const url = "https://auth.delta.nitt.edu/api/oauth/token";

  const values = {
    code,
    client_id: process.env.DELTA_CLIENT_ID,
    client_secret: process.env.DELTA_CLIENT_SECRET,
    redirect_uri: process.env.DELTA_OAUTH_REDIRECT_URL,
    grant_type: "authorization_code",
  };

  const result = await axios.post(url, qs.stringify(values), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const { id_token, access_token, state } = result.data;

  const deltaRes = await axios.post(
    "https://auth.delta.nitt.edu/api/resources/user",
    {},
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  // console.log(result);
  const deltaUser = deltaRes.data;
  // console.log(deltaUser);

  const user = await User.findOne({ email: deltaUser.email });
  if (!user) {
    const myUser = {
      name: deltaUser.name,
      email: deltaUser.email,
      dauth: true,
      password: await bcrypt.hash(uuidv4(), 10),
    };
    const currNewUser = new User(myUser);
    await currNewUser.save();

    const token = jwt.sign({ id: currNewUser._id }, process.env.JWT_SECRET);
    res.status(200).json({
      token,
      user: {
        id: currNewUser._id,
        name: currNewUser.name,
        email: currNewUser.email,
      },
      success: true,
      message: "Login successful",
    });
  } else {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      success: true,
      message: "Login successful",
    });
  }
};

export default loginWithDelta;
