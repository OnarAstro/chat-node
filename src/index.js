import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.io.js";

dotenv.config();

const PORT = process.env.PORT;
// const __dirname = path.resolve();

const PROT_FRONTEND = process.env.PROT_FRONTEND;

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(cors(
  {
    origin: [PROT_FRONTEND],
    credentials: true,
  }
));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
