import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { publicRouter } from "../routes/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../routes/api.js";

export const web = express();
dotenv.config();
web.use(express.json());
web.use(cors())

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);