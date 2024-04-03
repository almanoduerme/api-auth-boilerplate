import { Server } from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;

const server = new Server(PORT);

server.start();