import express, { Application } from "express";
import { connectMongoDB } from "./databases/mongodb/mongo.config";
import { NotFoundHandler, RoutesConfig } from "./routes";
import { Request, Response, NextFunction } from "express";

class Server {
  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeDatabases(): void {
    connectMongoDB();
  }

  private initializeRoutes(): void {
    const routesConfig = new RoutesConfig();
    const notFoundHandler = new NotFoundHandler();

    this.app.use(routesConfig.router);
    this.app.use(notFoundHandler.router);
  }

  private initializeErrorHandling(): void {
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).send("Something broke!");
      }
    );
  }

  private startListening(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public start(): void {
    this.initializeMiddlewares();
    this.initializeDatabases();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.startListening();
  }
}

export { Server };
