import { Request, Response } from "express";
import User from "../models/user.model";
import { Server } from "socket.io";
  
export const createUser =
  (io: Server) => async (req: Request, res: Response) => {
    try {
      const newUser = await User.create(req.body);
      io.emit("userAdded", newUser);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
