import bodyParser from "body-parser";
import { json, Request, Response, Router, urlencoded } from "express";
import { storage } from "../../../app.js";
import { ITask } from "../../../types.js";

const apiRouter = Router();

apiRouter.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

apiRouter.get("/api/tasks", (req: Request, res: Response) => {
  res.end(JSON.stringify(storage.getTasks()));
});

apiRouter.post("/api/tasks", (req: Request, res: Response) => {
  const data = JSON.parse(req.body.task);
  const task = storage.addTask(data);
  res.status(200).end(JSON.stringify(task));
});

apiRouter.put("/api/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const status = req.body.status;

  const task = storage.changeTask(Number(id), Number(status));
  if (task) {
    res.status(200).end(JSON.stringify(task));
  } else {
    res.status(404).end("Not Found");
  }
});

apiRouter.delete("/api/tasks/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  storage.deleteTask(id);

  res.status(200).end(JSON.stringify(id));
});

export default apiRouter;
