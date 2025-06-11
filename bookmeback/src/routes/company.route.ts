import { Router } from "express";
import {
  createCompanyController, deleteCompanyController, getCompaniesController,
  getCompanyController,
  updateCompanyController,
} from "../controllers/company";

const companyRouter = Router()

companyRouter
.post("/company", createCompanyController)
.get("/company", getCompaniesController)
.get("/company/:companyName", getCompanyController)
.put("/company/:companyId", updateCompanyController)
.delete("/company/:companyId", deleteCompanyController)

export default companyRouter