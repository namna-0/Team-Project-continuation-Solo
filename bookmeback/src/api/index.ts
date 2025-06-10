import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import { connectToDataBase } from "../database/connect-to-db";


connectToDataBase();

const app = express();
const port = 3001;
dotenv.config()

app.use(express.json())
app.use(cors())


app.listen(port, () => {
    console.log(`Sonsoj bnaa ${port}`)
})