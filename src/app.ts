import express, { Request, Response, Application } from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import { ITask, Status } from "./types.js";
import { TasksStorage } from "./store.js";
import path from "path";
import { fileURLToPath } from "url";

const storage = new TasksStorage();
const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  express.static(path.join(fileURLToPath(import.meta.url), "..", "..", "views"))
);
app.set("view engine", "pug");

app.get("/", function (req: Request, res: Response) {
  res.render("to-do", {
    tasks: storage.getTasks(),
  });
});

app.post("/", (req: Request, res: Response) => {
  const data: Uint8Array = new Uint8Array(
    (req.files?.file as UploadedFile)?.data
  );

  const date = req.body.date ? new Date(req.body.date) : null;

  storage.addTask({
    description: req.body.description,
    status: Status.Queued,
    date: date,
    file: data,
  });

  res.redirect("http://localhost:3000");
});

app.post("/sort", (req: Request, res: Response) => {
  const { category, variant }: { category: number; variant: number } = req.body;

  storage.sortTasks(Number(category), Number(variant));
  res.redirect("http://localhost:3000");
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task: ITask | null = storage.getTaskByID(id);

  if (task && task?.file?.length != 0) {
    res.status(200).end(task.file);
  } else {
    res.status(404).end("Not ok");
  }
});

app.put("/tasks/:id", (req: Request, res) => {
  const id = Number(req.params.id);
  const status = Number(req.body.status);
  storage.changeTask(id, status);
  res.status(200).end("ok");
});

app.delete("/tasks/:id", (req, res: Response) => {
  const id = Number(req.params.id);
  storage.deleteTask(id);
  res.status(200).end("ok");
});

app.listen(3000);
