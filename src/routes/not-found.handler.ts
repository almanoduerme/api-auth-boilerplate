import { Router, Request, Response } from "express";

class NotFoundHandler {
  private _router: Router;

  constructor() {
    this._router = Router();
    this.handleNotFound();
  }

  private handleNotFound() {
    this._router.get("*", (req: Request, res: Response) => {
      res.status(404).json({ message: "Not Found" });
    });
  }

  get router(): Router {
    return this._router;
  }
}

export { NotFoundHandler };