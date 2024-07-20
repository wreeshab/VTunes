import mongoose from "mongoose";

const partyRoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  queue: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  currentSong: { type: mongoose.Schema.Types.ObjectId, ref: "Song" },
  createdAt: { type: Date, default: Date.now },
});

const PartyRoom = mongoose.model("PartyRoom", partyRoomSchema);

export default PartyRoom;