import { createHTTPServer, createRouter } from "@trpc/server";
import { AnyTRPCRouter } from "@trpc/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/user";

const schemas = {
  UserProfileRequest: z.object({
    userId: z.string(),
  }),

  UserProfileResponse: z.object({
    username: z.string(),
    email: z.string().email(),
    address: z.string(),
  }),

  UserRegistrationRequest: z.object({
    fullName: z.string(),
    email: z.string().email(),
    username: z.string(),
    address: z.string(),
    dob: z.string(),
    password: z.string().min(6),
  }),

  UserRegistrationResponse: z.object({
    id: z.number(),
    fullName: z.string(),
    email: z.string().email(),
    username: z.string(),
    address: z.string(),
    dob: z.string(),
  }),

  UserLoginRequest: z.object({
    username: z.string(),
    password: z.string().min(6),
  }),

  UserLoginResponse: z.object({
    token: z.string(),
  }),
};

const appRouter = createRouter<AnyTRPCRouter>();
// Create tRPC router
appRouter
  .query("getUserProfile", {
    input: schemas.UserProfileRequest,
    resolve: async ({ input }: { input: { userId: string } }) => {
      const userId = parseInt(input.userId, 10);
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const userProfile = {
        username: user.username,
        email: user.email,
        address: user.address,
      };
      return userProfile;
    },
  })
  .mutation("registerUser", {
    input: schemas.UserRegistrationRequest,
    resolve: async ({ input }: { input: any }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      const newUser = await User.create({
        fullName: input.fullName,
        email: input.email,
        username: input.username,
        address: input.address,
        dob: input.dob,
        password: hashedPassword,
      });
      return {
        id: newUser.id,
        fullName: newUser.fullname,
        email: newUser.email,
        username: newUser.username,
        address: newUser.address,
        dob: newUser.dob,
      };
    },
  })
  .mutation("loginUser", {
    input: schemas.UserLoginRequest,
    resolve: async ({ input }: { input: any }) => {
      const { username, password } = input;
      const user = await User.findOne({ where: { username } });
      if (!user) {
        throw new Error("Invalid credentials");
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("Invalid credentials");
      }
      const token = jwt.sign(
        { userId: user.id },
        "595aaed32b1830f82bdda6f219ed86ff930d98d7133f29890e3f3ae6d959173b",
        {
          expiresIn: "1h",
        }
      );
      return { token };
    },
  });

const trpc = createHTTPServer({ router: appRouter });

export default trpc;
