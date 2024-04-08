import { Request, Response } from "express";
import { getConnectionSQL } from "../../databases/sql/getConnection";

class ProductController {
  private async handleBadRequest(res: Response, message: string): Promise<void> {
    res.status(400).json({ error: message });
  }

  private async handleNotFound(res: Response, message: string): Promise<void> {
    res.status(404).json({ error: message });
  }

  public async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const pool = await getConnectionSQL();
      const result = await pool.request().query("SELECT * FROM products");
      res.status(200).json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async getProductById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
      await this.handleBadRequest(res, "Invalid ID provided");
      return;
    }

    try {
      const pool = await getConnectionSQL();
      const result = await pool
        .request()
        .input("id", id)
        .query("SELECT * FROM products WHERE id = @id");

      if (result.recordset.length > 0) {
        res.status(200).json(result.recordset);
      } else {
        await this.handleNotFound(res, "Product not found");
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async createProduct(req: Request, res: Response): Promise<void> {
    const { name, description, price, quantity } = req.body;
    if (!name || !description || !price || !quantity) {
      await this.handleBadRequest(res, "Missing required fields");
      return;
    }

    try {
      const pool = await getConnectionSQL();
      const result = await pool
        .request()
        .input("name", name)
        .input("description", description)
        .input("price", price)
        .input("quantity", quantity)
        .query(
          "INSERT INTO products (name, description, price, quantity) VALUES (@name, @description, @price, @quantity)"
        );

      res.status(201).json({ message: `Product added with ID: ${result.rowsAffected[0]}` });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async updateProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;
    if (!id || isNaN(parseInt(id)) || !name || !description || !price || !quantity) {
      await this.handleBadRequest(res, "Invalid ID or missing required fields");
      return;
    }

    try {
      const pool = await getConnectionSQL();
      const result = await pool
        .request()
        .input("name", name)
        .input("description", description)
        .input("price", price)
        .input("quantity", quantity)
        .input("id", id)
        .query(
          "UPDATE products SET name = @name, description = @description, price = @price, quantity = @quantity WHERE id = @id"
        );

      if (result.rowsAffected[0] > 0) {
        res.status(200).json({ message: `Product modified with ID: ${id}` });
      } else {
        await this.handleNotFound(res, "Product not found");
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async deleteProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
      await this.handleBadRequest(res, "Invalid ID provided");
      return;
    }

    try {
      const pool = await getConnectionSQL();
      const result = await pool
        .request()
        .input("id", id)
        .query("DELETE FROM products WHERE id = @id");

      if (result.rowsAffected[0] > 0) {
        res.status(200).json({ message: `Product deleted with ID: ${id}` });
      } else {
        await this.handleNotFound(res, "Product not found");
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

const productController = new ProductController();

export { productController };
