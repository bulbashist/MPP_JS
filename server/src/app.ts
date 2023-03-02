import express, { Application } from "express";
import { TasksStorage } from "./store.js";

import mainRouter from "./routes/router.js";

export const storage = new TasksStorage();
const app: Application = express();

app.use(mainRouter);

app.listen(1337);
