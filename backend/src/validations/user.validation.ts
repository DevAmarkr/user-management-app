import z from "zod";

export const userSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.email("Invalid Email"),
  role: z.enum(["admin", "user"], {
    error: "Role must be admin, user",
  }),
});
