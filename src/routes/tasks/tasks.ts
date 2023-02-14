import { Request, Response, Router } from "express";
import { storage } from "../../app.js";
import { ITask } from "../../types.js";

const tasksRouter = Router();

tasksRouter.get("/tasks/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const task: ITask | null = storage.getTaskByID(id);

  if (task?.file) {
    res.status(200).end(task.file);
  } else {
    res.status(404).end("Not ok");
  }
});

tasksRouter.put("/tasks/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const status = Number(req.body.status);

  storage.changeTask(id, status);

  res.status(200).end("ok");
});

tasksRouter.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  storage.deleteTask(id);

  res.status(200).end("ok");
});

export default tasksRouter;
