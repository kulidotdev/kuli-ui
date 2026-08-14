import * as React from "react"
import { type UseFormReturn } from "react-hook-form"
import { type TwoFactorValues, type TwoFactorMethod } from "@/components/auth/two-factor-types"

export interface TwoFactorContextValue {
  activeView: TwoFactorMethod
  setActiveView: (view: TwoFactorMethod) => void
  twofactorMethods: TwoFactorMethod[]
  form: UseFormReturn<TwoFactorValues>
  countdown: number
  setCountdown: (val: number | ((prev: number) => number)) => void
  onSubmit: (method: TwoFactorMethod, values: TwoFactorValues) => Promise<void>
  onResendOtp?: () => Promise<void>
  isLoading: boolean
  isResending: boolean
  apiError: { message: string; code?: string } | null
  totpLength: number
  otpLength: number
  currentLength: number
  resendCooldown: number
  trustDeviceDescription?: string
}

export const TwoFactorContext = React.createContext<TwoFactorContextValue | undefined>(undefined)

export function useTwoFactorContext() {
  const context = React.useContext(TwoFactorContext)
  if (!context) {
    throw new Error("TwoFactor components must be used within a TwoFactor provider")
  }
  return context
}
