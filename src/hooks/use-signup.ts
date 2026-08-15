import * as React from "react"
import { type UseFormReturn } from "react-hook-form"
import { type SignupFormValues } from "../components/auth/signup-types"

export interface SignUpContextValue {
  form: UseFormReturn<SignupFormValues>
  isLoading: boolean
  apiError: { message: string; code?: string } | null
  showUsername: boolean
  showPhone: boolean
  onSubmit: (values: SignupFormValues) => void
}

export const SignUpContext = React.createContext<SignUpContextValue | undefined>(
  undefined
)

export function useSignUpContext() {
  const context = React.useContext(SignUpContext)
  if (!context) {
    throw new Error("SignUp components must be used within a SignUp provider")
  }
  return context
}
