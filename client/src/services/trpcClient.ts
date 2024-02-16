import { createTRPCClient } from "@trpc/client";
import { z } from "zod";

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

// Create tRPC client
export const trpcClient = createTRPCClient({
  client: {
    http: "http://localhost:5378/api",
    queries: {
      getUserProfile: {
        input: schemas.UserProfileRequest,
        output: schemas.UserProfileResponse,
      },
    },
    mutations: {
      registerUser: {
        input: schemas.UserRegistrationRequest,
        output: schemas.UserRegistrationResponse,
      },
      loginUser: {
        input: schemas.UserLoginRequest,
        output: schemas.UserLoginResponse,
      },
    },
  },
});

export default trpcClient;
