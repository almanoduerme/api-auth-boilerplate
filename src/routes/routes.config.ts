import { Router } from "express";
import { productRouter } from "../modules/products/product.router";
import { userRouter } from "../modules/auth/auth.route";

class RoutesConfig {
  public router: Router;

  constructor() {
    this.router = Router();
    this.configureRoutes();
  }

  private configureRoutes() {
    this.router.use("/products", productRouter);
    this.router.use("/users", userRouter);
  }
}

export { RoutesConfig };
