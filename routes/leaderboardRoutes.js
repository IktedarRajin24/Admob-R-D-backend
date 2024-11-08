import express from "express";
import {
  getLeaderboard,
  getOneScore,
  updateLeaderboard,
} from "../controllers/leaderboardController.js";

const leaderBoardRouter = express.Router();

leaderBoardRouter.get("/leader-board", getLeaderboard);
leaderBoardRouter.get("/leader-board/:id", getOneScore);
leaderBoardRouter.put("/leader-board/:username", updateLeaderboard);

export default leaderBoardRouter;
