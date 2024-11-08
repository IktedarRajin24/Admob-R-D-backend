import mongoose from "mongoose";

const LeaderBoardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    username: { type: String, required: true },
    level: { type: Number, required: true },
    timeLeft: { type: Number, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Leaderboard", LeaderBoardSchema, "Leaderboard");
