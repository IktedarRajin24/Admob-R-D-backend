import userModel from "../models/userModel.js";
import leaderboardModel from "../models/leaderboardModel.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, email, password, country } = req.body;
  try {
    const existingUser = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "Username or email already exists" });

    const newUser = new userModel({ username, email, password, country });
    await newUser.save();
    const newLeaderboardEntry = new leaderboardModel({
      username,
      level: 0,
      timeLeft: 0,
      country,
    });
    await newLeaderboardEntry.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Error during signup", error });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username, password });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error during login", error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};
