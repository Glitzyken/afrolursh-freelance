import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";

export const signupSchema = toTypedSchema(
  z.object({
    email: z.string().email("Please enter a valid email"),
  })
);

export const loginSchema = toTypedSchema(
  z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(1, "Please enter your password"),
  })
);

export const completeSignupSchema = toTypedSchema(
  z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  })
);
