import { Request, Response } from "express";
import { UserService } from "./auth.services";
import jwt from "jsonwebtoken";

class UserController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Delegate login logic to the service layer
      const user = await UserService.login({ email, password });

      // Generate token
      const token = jwt.sign({ userEmail: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' }); 

      // Return the user
      return res.status(200).json({user, token});
    } catch (error) {
      return res.status(400).json({ error: error }); // Return only the error message
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { username, email, password, role } = req.body;

      // Delegate register logic to the service layer
      const user = await UserService.register({ username, email, password, role });

      // Generate token
      const token = jwt.sign({ userEmail: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' }); // Adjust expiry time as needed

      // Return the user
      return res.status(201).json({user, token});
    } catch (error) {
      return res.status(400).json({ error: error }); // Return only the error message
    }
  }
}

const userController = new UserController();

export { userController };
