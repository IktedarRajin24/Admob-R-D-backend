import leaderboardModel from "../models/leaderboardModel.js";
import mongoose from "mongoose";

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await leaderboardModel.find().sort({ level: -1 });
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve data" });
  }
};

export const getOneScore = async (req, res) => {
  const userId = req.params.id;
  try {
    const leaderboard = await leaderboardModel.findOne({ userId });
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve data" });
  }
};

export const updateLeaderboard = async (req, res) => {
  const { username } = req.params;
  const { level, timeLeft } = req.body;

  try {
    const updatedLeaderboard = await leaderboardModel.findOneAndUpdate(
      { username: username },
      { level, timeLeft },
      { new: true }
    );

    if (!updatedLeaderboard) {
      console.error("User not found:", username);
      return res.status(404).json({ message: "User not found on leaderboard" });
    }

    res.status(200).json(updatedLeaderboard);
  } catch (error) {
    console.error("Error updating leaderboard data:", error);
    res.status(500).json({ error: "Failed to update data" });
  }
};
