import { z } from "zod"

export const twoFactorSchema = z.object({
  code: z.string(),
  trustDevice: z.boolean().optional(),
  method: z.enum(["totp", "otp", "backup_code"]),
})

export type TwoFactorValues = z.infer<typeof twoFactorSchema>

export type TwoFactorMethod = "totp" | "otp" | "backup_code"
