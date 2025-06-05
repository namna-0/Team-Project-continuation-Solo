import express from "express";
import cors from "cors";
import { connectToDataBase } from "./database";
import dotenv from "dotenv";
dotenv.config();

connectToDataBase();
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (_req, res) => {
  res.json("Hello world");
});

app.listen(3001, () => {
  console.log("Server running http://localhost:3001");
});
