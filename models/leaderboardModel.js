import mongoose from "mongoose";

const LeaderBoardSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, ref: "User" },
    level: { type: Number, required: true },
    timeLeft: { type: Number, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Leaderboard", LeaderBoardSchema, "Leaderboard");
