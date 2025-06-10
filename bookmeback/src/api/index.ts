import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDataBase } from "../database/connect-to-db";
import authUserRouter from "../routes/auth-user.route";

connectToDataBase();

const app = express();
const port = 3001;
dotenv.config();

app.use(express.json());
app.use(cors()).use("/authuser", authUserRouter);

app.listen(port, () => {
  console.log(`Sonsoj bnaa ${port}`);
});
