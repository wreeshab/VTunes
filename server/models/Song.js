import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  audioUrl: {
    type: String,
    required: true,
  },
  lyrics: {
    type: String,
    required: true,
  },
  djMode: {
    type: Number,
    required: true,
    min: 0,
    max: 35,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Song = mongoose.model("Song", songSchema);

export default Song;
