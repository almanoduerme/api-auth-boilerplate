import { Router } from "express";

const productRouter = Router();

productRouter.get("/", (req, res) => {
  res.send("GET /products");
});

export { productRouter };
