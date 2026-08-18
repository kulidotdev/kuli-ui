"use client"

import { useState } from "react"
import {
  ForgotPassword,
  ForgotPasswordSuccessView,
} from "@kuli-ui/components/components/auth/forgot-password"
import type { ForgotPasswordEmailValues } from "@kuli-ui/components/components/auth/forgot-password-types"

export function ForgotPasswordEmailOnly() {
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [apiError, setApiError] = useState<{ message: string } | null>(null)

  const handleEmail = async (_values: ForgotPasswordEmailValues) => {
    setIsLoading(true)
    setApiError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSent(true)
    } catch {
      setApiError({ message: "Failed to send." })
    } finally {
      setIsLoading(false)
    }
  }

  if (sent) return <ForgotPasswordSuccessView backUrl="#" />

  return (
    <ForgotPassword
      onSubmitEmail={handleEmail}
      isLoading={isLoading}
      apiError={apiError}
    >
      <ForgotPassword.Header />
      <ForgotPassword.Content>
        <ForgotPassword.Tabs>
          <ForgotPassword.EmailForm>
            <ForgotPassword.EmailField />
            <ForgotPassword.SubmitButton />
          </ForgotPassword.EmailForm>
        </ForgotPassword.Tabs>
      </ForgotPassword.Content>
    </ForgotPassword>
  )
}
