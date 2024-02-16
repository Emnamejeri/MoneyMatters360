import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: any;
}

const authMiddleware = {
  verifyToken: (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const secretKey = process.env.JWT_SECRET as Secret;
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
  },
};

export default authMiddleware;
