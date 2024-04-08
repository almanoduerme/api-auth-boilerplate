import { Router } from "express";
import { productController } from "./product.controller";
import { authenticateToken } from "../../middlewares/authToken.middleware";

const productRouter = Router();

productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.getProductById);
productRouter.post("/", authenticateToken, productController.createProduct);
productRouter.put("/:id", authenticateToken, productController.updateProduct);
productRouter.delete("/:id", authenticateToken, productController.deleteProduct);

export { productRouter };
