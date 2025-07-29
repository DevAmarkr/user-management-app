import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

import connectDB from "./config/db";
import userRoutes from "./routes/user.route";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());


app.use("/api/users", userRoutes(io));
app.use(errorHandler);
io.on("connection", (socket) => {
  console.log("Socket connected");
  socket.on("disconnect", () => console.log("Socket disconnected"));
});
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
