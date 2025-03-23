import express from "express";
import { chatWithGemini } from "../controllers/chatController.js";

export const chatRoutes = express.Router();

chatRoutes.post("/chat", chatWithGemini);
