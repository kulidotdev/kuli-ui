import { z } from "zod"

export const twoFactorSchema = z.object({
  code: z.string(),
})

export type TwoFactorValues = z.infer<typeof twoFactorSchema>

export type TwoFactorMethod = "totp" | "otp"
