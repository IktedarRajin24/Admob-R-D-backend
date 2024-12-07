import express from "express";
import { signup, login } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
// userRouter.get("/users", authenticateToken, getAllUsers);

export default userRouter;
