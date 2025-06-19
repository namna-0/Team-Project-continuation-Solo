import { Router } from "express";
import { postUserAuthSignUp } from "../controllers/(userAuth)/auth/post-userauth-signup";
import { postUserAuthSignIn } from "../controllers/(userAuth)/auth/post-userauth-signin";
import { getUserAuthMe } from "../controllers/(userAuth)/auth/get-userauth-me";
import { authenticationMiddleware } from "../middlewares/authentication-middlewares";
import { Forgotpass } from "../controllers/(userAuth)/auth/post-forgotpassword";

const authUserRouter = Router();

authUserRouter
  .post("/signup", postUserAuthSignUp)
  .post("/login", postUserAuthSignIn)
  .get("/me", authenticationMiddleware, getUserAuthMe)
  .post("/forgot-password", Forgotpass);
export default authUserRouter;
