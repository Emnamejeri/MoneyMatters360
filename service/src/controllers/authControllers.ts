import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

const authController = {
  login: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ where: { username } });

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id },
        "595aaed32b1830f82bdda6f219ed86ff930d98d7133f29890e3f3ae6d959173b",
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({ token });
    } catch (error) {
      console.error("Login failed:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  register: async (req: Request, res: Response) => {
    try {
      const { fullName, email, username, address, dob, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        fullName,
        email,
        username,
        address,
        dob,
        password: hashedPassword,
      });

      return res.status(201).json(newUser);
    } catch (error) {
      console.error("Registration failed:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default authController;
