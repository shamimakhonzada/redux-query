import { UserSchema } from "@/features/users/model/user.schema";
import z from "zod";

export const RegistrationSchema = UserSchema.extend({
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegistrationInput = z.infer<typeof RegistrationSchema>;
