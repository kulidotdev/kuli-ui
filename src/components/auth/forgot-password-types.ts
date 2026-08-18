import { z } from "zod"
import { isValidPhoneNumber } from "react-phone-number-input"

export const forgotPasswordEmailSchema = z.object({
  email: z.email("Please enter a valid email address."),
})

export const forgotPasswordPhoneSchema = z.object({
  phone: z
    .string()
    .min(5, "Please enter a valid phone number.")
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
})

export type ForgotPasswordEmailValues = z.infer<
  typeof forgotPasswordEmailSchema
>
export type ForgotPasswordPhoneValues = z.infer<
  typeof forgotPasswordPhoneSchema
>

export const resetPasswordEmailSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })

export const resetPasswordPhoneSchema = z
  .object({
    code: z.string().min(6, "OTP code must be at least 6 characters."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })

export type ResetPasswordEmailValues = z.infer<typeof resetPasswordEmailSchema>
export type ResetPasswordPhoneValues = z.infer<typeof resetPasswordPhoneSchema>
