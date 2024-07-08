import Artist from "../../models/Artist.js";
import Song from "../../models/Song.js";
import User from "../../models/User.js";

const search = async (req, res) => {
  const { query, type } = req.query;
  // console.log(query, type);
  if (!query || !type) {
    return res.status(400).json({ message: "Missing query or type" });
  }

  try {
    let results = [];

    switch (type) {
      case "users":
        results = await User.find({ name: { $regex: query, $options: "i" } });
        break;
      case "music":
        results = await Song.find({
          name: { $regex: query, $options: "i" },
        }).populate("artist", "name");

        break;
      case "artists":
        // console.log("artists case");
        results = await Artist.find({ name: { $regex: query, $options: "i" } });
        break;
      default:
        return res
          .status(400)
          .json({ message: "Invalid search type", type: type });
    }
    res.status(200).json({ results });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default search;
