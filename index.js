import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT;

connectDB();
app.use("/", (req, res) => {
  res.send("<h1>Hello from backend</h1>");
});

app.use("/api", userRoutes);
app.use("/api", leaderboardRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
