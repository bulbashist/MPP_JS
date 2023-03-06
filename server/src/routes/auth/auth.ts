import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { userStorage } from "../../app.js";

export const key = "1-1-1-1";
const authRouter = Router();

authRouter.post("/auth", (req: Request, res: Response) => {
  const { login, password } = req.body;

  const user = userStorage.getUser(login);
  if (!user) {
    res.status(404).end();
    return;
  } else {
    if (user.password !== password) {
      res.statusMessage = "Relaxio";
      res.status(420).end();
      return;
    }
  }
  const token = jwt.sign(
    {
      login: login,
    },
    key,
    {
      expiresIn: 600,
    }
  );

  res.cookie("accessToken", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  });
  res.status(200).end("OK");
});

export default authRouter;
