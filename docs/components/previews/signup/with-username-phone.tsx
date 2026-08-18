"use client"

import { useState } from "react"
import {
  SignUp,
  SignupSuccessView,
} from "@kuli-ui/components/components/auth/signup"
import type { SignupFormValues } from "@kuli-ui/components/components/auth/signup-types"

export function SignUpWithUsernamePhone() {
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<{ message: string } | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (_values: SignupFormValues) => {
    setIsLoading(true)
    setApiError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess(true)
    } catch {
      setApiError({ message: "Registration failed." })
    } finally {
      setIsLoading(false)
    }
  }

  if (success) return <SignupSuccessView redirectUrl="#" />

  return (
    <SignUp
      onSubmit={handleSubmit}
      isLoading={isLoading}
      apiError={apiError}
      showUsername
      showPhone
    >
      <SignUp.Header
        title="Create an account"
        description="Fill in the details below to get started"
      />
      <SignUp.Content>
        <SignUp.Form>
          <SignUp.NameField />
          <SignUp.EmailField />
          <SignUp.UsernameField />
          <SignUp.PhoneField />
          <SignUp.PasswordField />
          <SignUp.SubmitButton />
        </SignUp.Form>
      </SignUp.Content>
      <SignUp.Footer signinPath="#" />
    </SignUp>
  )
}
