import { Router } from "express";
import { createCompanyController } from "../controllers/company/create-company";

const companyRouter = Router()

companyRouter
.post("/company", createCompanyController)

export default companyRouter