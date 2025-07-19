import { z } from "zod";

const login = z
  .object({
    email: z.string().email("Invalid email address").optional(),
    phone_number: z.string().optional(),
    password: z.string({ message: "Password is required" }),
  })
  .refine((data) => data.email || data.phone_number, {
    message: "Either email or phone number is required",
    path: ["email"],
  });

const register = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone_number: z.string({ message: "Phone number is required" }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

export const authValidation = { login, register };
