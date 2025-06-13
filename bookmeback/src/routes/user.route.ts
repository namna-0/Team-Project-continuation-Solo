import { Router } from "express";
import { patchUser } from "../controllers/user/patch-user";

const userRouter = Router();

userRouter.patch("/patch", patchUser);

export default userRouter;
