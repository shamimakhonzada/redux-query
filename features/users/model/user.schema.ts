import { z } from "zod";

export const UserSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .regex(
      /^[a-zA-Z0-9._-]+$/,
      "Username can only contain letters, numbers, dots, underscores and hyphens",
    ),

  email: z.string().email("Invalid email address"),

  full_name: z.string().min(1, "Full name is required"),

  profile_image: z.string().url().nullable().optional(),
});



export type User = z.infer<typeof UserSchema>;
