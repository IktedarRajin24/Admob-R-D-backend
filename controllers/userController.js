import userModel from "../models/userModel.js";
import leaderboardModel from "../models/leaderboardModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { username, email, password, country } = req.body;
  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({
        message: "Username or email already exists",
        errorCode: "USER_EXISTS",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      country,
    });
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
    // Find the user by username
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: "Invalid username or password",
        errorCode: "INVALID_CREDENTIALS",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid username or password",
        errorCode: "INVALID_CREDENTIALS",
      });
    }

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


