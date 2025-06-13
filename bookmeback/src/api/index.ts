import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDataBase } from "../database/connect-to-db";
import authUserRouter from "../routes/auth-user.route";
import authCompanyRouter from "../routes/auth-company.route";
import companyRouter from "../routes/company.route";
import emailRouter from "../routes/mail.route";
import BookingRouter from "../routes/order.route";
import employeeRouter from "../routes/employee.route";
import googleApiRouter from "../routes/google-api.route";

connectToDataBase();

const app = express();
const port = 3001;
dotenv.config();

app.use(express.json());
app.use(authCompanyRouter);
app.use(companyRouter);
app.use(BookingRouter);
app.use(authCompanyRouter);
app.use(companyRouter);
app.use(cors()).use("/authuser", authUserRouter).use("/email", emailRouter);
app.use(employeeRouter);
app.use(googleApiRouter);

app.listen(port, () => {
  console.log(`Sonsoj bnaa ${port}`);
});
