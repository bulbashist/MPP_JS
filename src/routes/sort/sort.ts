import { Request, Response, Router } from "express";
import { storage } from "../../app.js";

const sortRouter = Router();

sortRouter.post("/sort", (req: Request, res: Response) => {
  const { category, variant } = req.body;

  storage.sortTasks(Number(category), Number(variant));

  res.redirect("http://localhost:3000");
});

export default sortRouter;
