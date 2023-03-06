import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { key } from "../auth/auth.js";

const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.accessToken;

  if (!token) {
    res.status(401).end(null);
    return;
  }

  try {
    const payload = jwt.verify(token, key);
    req.body.jwtPayload = payload;
  } catch (err) {
    res.statusMessage = "Token expired/invalid";
    res.status(498).end(null);
    return;
  }

  next();
};

export { isAuthenticated };
