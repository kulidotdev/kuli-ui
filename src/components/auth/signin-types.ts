import { z } from "zod"
import { isValidPhoneNumber } from "react-phone-number-input"

export const signinBaseSchema = z.object({
  method: z.enum(["email", "username", "phone"]),
  identifier: z.string().min(1),
  password: z.string().min(1),
  remember: z.boolean().default(false).optional(),
})

export type BaseFormValues = z.infer<typeof signinBaseSchema>

// Discriminated union — each method produces a distinct shape so the
// consumer can narrow on `values.method` without casting.

export const signinEmailSchema = z.object({
  method: z.literal("email"),
  identifier: z
    .string()
    .email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
  remember: z.boolean().default(false).optional(),
})

export const signinUsernameSchema = z.object({
  method: z.literal("username"),
  identifier: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(1, { message: "Password is required." }),
  remember: z.boolean().default(false).optional(),
})

export const signinPhoneSchema = z.object({
  method: z.literal("phone"),
  // E.164 format, e.g. "+12133734253"
  identifier: z
    .string()
    .min(1, { message: "Phone number is required." })
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  password: z.string().min(1, { message: "Password is required." }),
  remember: z.boolean().default(false).optional(),
})

export type SigninEmailValues = z.infer<typeof signinEmailSchema>
export type SigninUsernameValues = z.infer<typeof signinUsernameSchema>
export type SigninPhoneValues = z.infer<typeof signinPhoneSchema>

export type SigninFormValues =
  SigninEmailValues | SigninUsernameValues | SigninPhoneValues

export type SigninMethod = SigninFormValues["method"]

export const SIGNIN_METHOD_LABELS: Record<SigninMethod, string> = {
  email: "Email",
  username: "Username",
  phone: "Phone Number",
}
