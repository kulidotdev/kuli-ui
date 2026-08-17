import * as React from "react"
import { type UseFormReturn } from "react-hook-form"
import { type ResetPasswordEmailValues, type ResetPasswordPhoneValues } from "../components/auth/forgot-password-types"

export type ResetPasswordMethod = "email" | "phone"

/**
 * Context value for the ResetPassword compound components.
 */
export interface ResetPasswordContextValue {
  method: ResetPasswordMethod
  emailForm: UseFormReturn<ResetPasswordEmailValues>
  phoneForm: UseFormReturn<ResetPasswordPhoneValues>
  onSubmitEmail?: (values: ResetPasswordEmailValues) => Promise<void>
  onSubmitPhone?: (values: ResetPasswordPhoneValues) => Promise<void>
  isLoading: boolean
  apiError: { message: string; code?: string } | null
}

export const ResetPasswordContext = React.createContext<ResetPasswordContextValue | undefined>(undefined)

/**
 * Hook to access the reset-password context.
 * Must be used within a <ResetPassword> provider.
 */
export function useResetPasswordContext() {
  const context = React.useContext(ResetPasswordContext)
  if (!context) {
    throw new Error("ResetPassword components must be used within a ResetPassword provider")
  }
  return context
}
