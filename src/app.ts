import express from "express";
import { connectMongoDB } from "./databases/mongodb/mongo.config";
import { NotFoundHandler, RoutesConfig } from "./routes";

class Server {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private databases() {
    connectMongoDB();
  }

  private setupRoutes() {
    const routesConfig = new RoutesConfig();
    const notFoundHandler = new NotFoundHandler();

    this.app.use(routesConfig.router);
    this.app.use(notFoundHandler.router);
  }

  private listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public start() {
    this.middlewares();
    this.databases();
    this.setupRoutes();
    this.listen();
  }
}

export { Server };
