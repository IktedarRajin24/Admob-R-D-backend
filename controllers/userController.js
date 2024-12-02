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
      return res.status(400).json({
        message: "Username or email already exists",
        errorCode: "USER_EXISTS",
      });

    // Create a new user
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
    res.status(500).json({
      message: "Error during signup",
      error: error.message,
      errorCode: "SIGNUP_ERROR",
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username, password });
    if (!user) {
      return res.status(400).json({
        message: "Invalid username or password",
        errorCode: "INVALID_CREDENTIALS",
      });
    }

    // Generate a JWT token for the user
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      message: "Error during login",
      error: error.message,
      errorCode: "LOGIN_ERROR",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
      errorCode: "FETCH_USERS_ERROR",
    });
  }
};
