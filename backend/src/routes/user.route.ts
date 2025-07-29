import { Router } from "express";
import { createUser, getUsers } from "../controllers/user.controller";
import { Server } from "socket.io";
import { userSchema } from "../validations/user.validation";
import { validate } from "../middlewares/validate";
import { isUserExist } from "../middlewares/user.middleware";

const router = Router();

export default (io: Server) => {
  router.post("/", validate(userSchema), isUserExist, createUser(io));
  router.get("/", getUsers);
  return router;
};
