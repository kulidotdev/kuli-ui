import * as React from "react"
import { type UseFormReturn } from "react-hook-form"
import {
  type BaseFormValues,
  type SigninMethod,
  type SigninFormValues,
} from "../components/auth/signin-types"

/**
 * Context value for the SignIn compound components.
 */
export interface SignInContextValue {
  method: SigninMethod
  setMethod: (method: SigninMethod) => void
  methods: SigninMethod[]
  form: UseFormReturn<BaseFormValues>
  onSubmit: (values: SigninFormValues) => void
  isLoading: boolean
  apiError: { message: string; code?: string } | null
}

export const SignInContext = React.createContext<
  SignInContextValue | undefined
>(undefined)

/**
 * Hook to access the sign-in context.
 * Must be used within a <SignIn> provider.
 */
export function useSignInContext() {
  const context = React.useContext(SignInContext)
  if (!context) {
    throw new Error("SignIn components must be used within a SignIn provider")
  }
  return context
}
