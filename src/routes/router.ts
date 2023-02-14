import express, { Router, json, urlencoded } from "express";
import fileUpload from "express-fileupload";
import coreRouter from "./core/core.js";
import sortRouter from "./sort/sort.js";
import tasksRouter from "./tasks/tasks.js";
import path, { dirname } from "path";
import url, { fileURLToPath } from "url";

const mainRouter = Router();

mainRouter.use(urlencoded({ extended: true }));
mainRouter.use(json());
mainRouter.use(fileUpload());
mainRouter.use(
  express.static(
    path.join(fileURLToPath(import.meta.url), "..", "..", "..", "views")
  )
);

mainRouter.use(coreRouter);
mainRouter.use(sortRouter);
mainRouter.use(tasksRouter);

export default mainRouter;
