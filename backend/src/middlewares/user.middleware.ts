import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

export const isUserExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let user: any = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).json({ message: "User already present" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
