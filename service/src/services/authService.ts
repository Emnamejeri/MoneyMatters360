import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

const authService = {
  login: async (username: string, password: string) => {
    try {
      const user = await User.findOne({ where: { username } });

      if (!user) {
        return { success: false, message: "Invalid credentials" };
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return { success: false, message: "Invalid credentials" };
      }

      const token = jwt.sign(
        { userId: user.id },
        "595aaed32b1830f82bdda6f219ed86ff930d98d7133f29890e3f3ae6d959173b",
        {
          expiresIn: "1h",
        }
      );

      return { success: true, token };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, message: "Internal server error" };
    }
  },

  register: async (userData: any) => {
    try {
      const { fullName, email, username, address, dob, password } = userData;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user in database
      const newUser = await User.create({
        fullName,
        email,
        username,
        address,
        dob,
        password: hashedPassword,
      });

      return { success: true, user: newUser };
    } catch (error) {
      console.error("Registration failed:", error);
      return { success: false, message: "Internal server error" };
    }
  },
};

export default authService;
