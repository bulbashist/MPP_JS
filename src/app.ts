import express, { Request, Response, Application } from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import { ITask, Status } from "./types.js";
import { TasksStorage } from "./store.js";

import mainRouter from "./routes/router.js";

export const storage = new TasksStorage();
const app: Application = express();

app.set("view engine", "pug");
app.use(mainRouter);

app.listen(3000);
