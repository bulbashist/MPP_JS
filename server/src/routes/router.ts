import cookieParser from "cookie-parser";
import {
  Router,
  json,
  urlencoded,
  Request,
  NextFunction,
  Response,
} from "express";
import apiRouter from "./api/tasks/tasks.js";
import authRouter from "./auth/auth.js";
import { isAuthenticated } from "./middleware/token.js";

const mainRouter = Router();

mainRouter.use(urlencoded({ extended: true, limit: "50mb" }));
mainRouter.use(json({ limit: "50mb" }));
mainRouter.use(cookieParser());

mainRouter.use(authRouter);
mainRouter.use(apiRouter);

export default mainRouter;
