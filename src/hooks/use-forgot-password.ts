import * as React from "react"
import { type UseFormReturn } from "react-hook-form"
import { type ForgotPasswordEmailValues, type ForgotPasswordPhoneValues } from "../components/auth/forgot-password-types"

export type ForgotPasswordTab = "email" | "phone"

/**
 * Context value for the ForgotPassword compound components.
 */
export interface ForgotPasswordContextValue {
  activeTab: ForgotPasswordTab
  setActiveTab: (tab: ForgotPasswordTab) => void
  emailForm: UseFormReturn<ForgotPasswordEmailValues>
  phoneForm: UseFormReturn<ForgotPasswordPhoneValues>
  onSubmitEmail: (values: ForgotPasswordEmailValues) => Promise<void>
  onSubmitPhone?: (values: ForgotPasswordPhoneValues) => Promise<void>
  isLoading: boolean
  apiError: { message: string; code?: string } | null
  allowPhone: boolean
}

export const ForgotPasswordContext = React.createContext<ForgotPasswordContextValue | undefined>(undefined)

/**
 * Hook to access the forgot-password context.
 * Must be used within a <ForgotPassword> provider.
 */
export function useForgotPasswordContext() {
  const context = React.useContext(ForgotPasswordContext)
  if (!context) {
    throw new Error("ForgotPassword components must be used within a ForgotPassword provider")
  }
  return context
}
