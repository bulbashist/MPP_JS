import { Request, Response, Router } from "express";
import { UploadedFile } from "express-fileupload";
import { storage } from "../../app.js";
import { Status } from "../../types.js";

const coreRouter = Router();

coreRouter.get("", (req: Request, res: Response) => {
  res.render("to-do", {
    tasks: storage.getTasks(),
  });
});

coreRouter.post("/", (req: Request, res: Response) => {
  const date = req.body.date ? new Date(req.body.date) : null;
  const file = req.files
    ? new Uint8Array((req.files.file as UploadedFile).data)
    : null;

  console.log(file);
  storage.addTask({
    description: req.body.description,
    status: Status.Queued,
    date,
    file,
  });

  res.redirect("http://localhost:3000");
});

export default coreRouter;
