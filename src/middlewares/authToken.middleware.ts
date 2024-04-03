import { verifyToken } from "../libs/jwt/verify.jwt";
import { Request, Response, NextFunction } from "express";

const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied. Token is missing." });
  }

  try {
    const decoded = verifyToken(token);
    req.body.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Access denied. Invalid token." });
  }
};

export { authenticateToken };