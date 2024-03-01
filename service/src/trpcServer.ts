import { initTRPC } from "@trpc/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/user";

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

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

// Define tRPC procedures
const appRouter = router({
  userList: publicProcedure.query(async () => {
    const users = await User.findAll();
    return users;
  }),

  userById: publicProcedure.input(z.string()).query(async ({ input }) => {
    const user = await User.findByPk(input);
    return user;
  }),

  userCreate: publicProcedure
    .input(schemas.UserRegistrationRequest)
    .mutation(async ({ input }) => {
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
    }),

  loginUser: publicProcedure
    .input(schemas.UserLoginRequest)
    .mutation(async ({ input }) => {
      const { username, password } = input;
      const user = await User.findOne({ where: { username } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error(
          "Invalid credentials Please Enter the correct password again"
        );
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || "",
        { expiresIn: "1h" }
      );

      return { token };
    }),
});

export type AppRouter = typeof appRouter;
export const httpLinkConfig = {
  url: "http://localhost:5432/moneymatters",
};
