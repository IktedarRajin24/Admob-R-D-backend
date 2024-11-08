import express from "express";
import { signup, login, getAllUsers } from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/users", authenticateToken, getAllUsers);

export default userRouter;
