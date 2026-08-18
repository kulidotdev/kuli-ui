import * as React from "react"

export type TwoFactorViewState =
  | "unconfigured"
  | "enabling_password"
  | "show_qr"
  | "configured"
  | "disabling_password"

export interface TotpData {
  secret: string
  totpUri: string
  backupCodes: string[]
}

/**
 * Context value for the TwoFactorRegistration compound components.
 */
export interface TwoFactorContextValue {
  view: TwoFactorViewState
  setView: React.Dispatch<React.SetStateAction<TwoFactorViewState>>
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  isSubmitting: boolean
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>
  error: string | null
  setError: React.Dispatch<React.SetStateAction<string | null>>
  totpData: TotpData | null
  setTotpData: React.Dispatch<React.SetStateAction<TotpData | null>>
  otp: string
  setOtp: React.Dispatch<React.SetStateAction<string>>
  totpLength: number
  trustedDevice: boolean
  setTrustedDevice: React.Dispatch<React.SetStateAction<boolean>>
  onEnable?: (password: string) => Promise<TotpData>
  onDisable?: (password: string) => Promise<void>
  onVerifyOtp?: (otp: string, trustedDevice: boolean) => Promise<void>
}

export const TwoFactorContext = React.createContext<
  TwoFactorContextValue | undefined
>(undefined)

/**
 * Hook to access the two-factor registration context.
 * Must be used within a <TwoFactorRegistration> provider.
 */
export function useTwoFactorRegistration() {
  const context = React.useContext(TwoFactorContext)
  if (!context) {
    throw new Error(
      "useTwoFactorRegistration must be used within a TwoFactorRegistration provider"
    )
  }
  return context
}
