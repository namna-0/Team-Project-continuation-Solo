import { Router } from "express";
import { signupCompanyController } from "../controllers/(companyAuth)/auth/signUpCompanyController";
import { signInCompanyController } from "../controllers/(companyAuth)/auth/signInCompanyController";

const authCompanyRouter = Router()

authCompanyRouter
.post("/signup", signupCompanyController)
.post("/signin", signInCompanyController)

export default authCompanyRouter
