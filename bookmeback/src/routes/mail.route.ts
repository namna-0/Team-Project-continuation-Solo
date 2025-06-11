import { Router } from "express";
import { postMail } from "../controllers/mail/post-mail";

const emailRouter = Router();

emailRouter.post("/send-email", postMail);

export default emailRouter;
