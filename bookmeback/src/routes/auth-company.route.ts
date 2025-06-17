import { Router } from "express";
import { signupCompanyController } from "../controllers/(companyAuth)/auth/sign-up-company";
import { signInCompanyController } from "../controllers/(companyAuth)/auth/sign-in-company";

const authCompanyRouter = Router();

authCompanyRouter
  .post("/signup", signupCompanyController)
  .post("/signin", signInCompanyController);

export default authCompanyRouter;
