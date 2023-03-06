import bodyParser from "body-parser";
import {
  json,
  NextFunction,
  Request,
  Response,
  Router,
  urlencoded,
} from "express";
import { storage } from "../../../app.js";
import { isAuthenticated } from "../../middleware/token.js";

const apiRouter = Router();

apiRouter.use(isAuthenticated);

apiRouter.get("/api/tasks", (req: Request, res: Response) => {
  res.status(200).end(JSON.stringify(storage.getTasks()));
});

apiRouter.post("/api/tasks", (req: Request, res: Response) => {
  const data = JSON.parse(req.body.task);
  const task = storage.addTask(data);
  res.status(201).end(JSON.stringify(task));
});

apiRouter.put("/api/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const status = req.body.status;

  const task = storage.changeTask(Number(id), Number(status));
  if (task) {
    res.status(200).end(JSON.stringify(task));
  } else {
    res.status(404).end();
  }
});

apiRouter.delete("/api/tasks/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = storage.deleteTask(id);

  if (result) {
    res.status(200).end(JSON.stringify(id));
  } else {
    res.status(404).end();
  }
});

export default apiRouter;
