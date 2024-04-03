import { ProductModel } from "./product.model";
import { Request, Response } from "express";

class ProductController {
  async getAll(req: Request, res: Response) {
    try {
      const products = await ProductModel.find();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
}

export { ProductController };