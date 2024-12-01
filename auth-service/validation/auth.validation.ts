
import { z } from "zod";

export const RegisterSchema = z.object({
    email: z.string().email("Invalid email address"),
    username: z.string().min(4, "Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const DeleteAccountSchema = z.object({
    id: z.string().uuid("Invalid user ID"),
});
export const VerifyEmailSchema = z.object({
    email: z.string().email("Invaild email address."),
    code: z.string().min(6, "Otp must be 6 digits long").max(6)
})
export const idSchema = z.string()
export const forgetPasswordSchema = z.object({ email: z.string().email() })

export const resetPasswordSchema = z.object({
    password: z.string().min(8, "Password Must be 8 characters long").max(16, "Password Should not exceed 16 characters."),
    confirmPassword: z.string().min(8, "Password Must be 8 characters long").max(16, "Password Should not exceed 16 characters."),
})
