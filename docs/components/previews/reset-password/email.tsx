"use client"

import { useState } from "react"
import {
  ResetPassword,
  ResetPasswordSuccessView,
} from "@kuli-ui/components/components/auth/reset-password"
import type { ResetPasswordEmailValues } from "@kuli-ui/components/components/auth/forgot-password-types"

export function ResetPasswordEmail() {
  const [isLoading, setIsLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [apiError, setApiError] = useState<{ message: string } | null>(null)

  const handleSubmit = async (_values: ResetPasswordEmailValues) => {
    setIsLoading(true)
    setApiError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setDone(true)
    } catch {
      setApiError({ message: "Reset failed." })
    } finally {
      setIsLoading(false)
    }
  }

  if (done) return <ResetPasswordSuccessView redirectTo="#" />

  return (
    <ResetPassword
      method="email"
      onSubmitEmail={handleSubmit}
      isLoading={isLoading}
      apiError={apiError}
    >
      <ResetPassword.Header />
      <ResetPassword.Content>
        <ResetPassword.Form>
          <ResetPassword.PasswordField />
          <ResetPassword.ConfirmPasswordField />
          <ResetPassword.SubmitButton />
        </ResetPassword.Form>
      </ResetPassword.Content>
    </ResetPassword>
  )
}
