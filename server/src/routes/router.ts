import { Router, json, urlencoded } from "express";
import apiRouter from "./api/tasks/tasks.js";

const mainRouter = Router();

mainRouter.use(urlencoded({ extended: true, limit: "50mb" }));
mainRouter.use(json({ limit: "50mb" }));

mainRouter.use(apiRouter);

export default mainRouter;
