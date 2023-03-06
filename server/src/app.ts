import express, { Application, Request, Response, NextFunction } from "express";
import { TasksStorage } from "./store.js";
import cors from "cors";

import mainRouter from "./routes/router.js";
import { UserStorage } from "./storages/userStorage.js";

export const storage = new TasksStorage();
export const userStorage = new UserStorage();

const app: Application = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(mainRouter);

app.listen(1337);
