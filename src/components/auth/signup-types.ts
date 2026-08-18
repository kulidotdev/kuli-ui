import { z } from "zod"
import { isValidPhoneNumber } from "react-phone-number-input"

export const signupSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  username: z.string().optional(),
  phone: z
    .string()
    .refine((val) => !val || isValidPhoneNumber(val), {
      message: "Invalid phone number",
    })
    .optional(),
})

export type SignupFormValues = z.infer<typeof signupSchema>
