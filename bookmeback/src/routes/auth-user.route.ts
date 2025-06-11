import { Router } from "express";
import { postUserAuthSignUp } from "../controllers/(userAuth)/auth/post-userauth-signup";
import { postUserAuthSignIn } from "../controllers/(userAuth)/auth/post-userauth-signin";
import { getUserAuthMe } from "../controllers/(userAuth)/auth/get-userauth-me";

const authUserRouter = Router();

authUserRouter
  .post("/signup", postUserAuthSignUp)
  .post("/login", postUserAuthSignIn)
  .get("/me", getUserAuthMe);
export default authUserRouter;
