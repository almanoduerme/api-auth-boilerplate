import { Router } from "express";
import { userController } from "./auth.controller";

const userRouter = Router();

userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);

export { userRouter };