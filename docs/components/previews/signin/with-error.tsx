"use client"

import { useState } from "react"
import { SignIn } from "@kuli-ui/components/components/auth/signin"

export function SignInWithError() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setIsLoading(false)
  }

  return (
    <SignIn
      onSubmit={handleSubmit}
      isLoading={isLoading}
      apiError={{ message: "Invalid email or password. Please try again." }}
      methods={["email"]}
    >
      <SignIn.Header />
      <SignIn.Content>
        <SignIn.Form>
          <SignIn.IdentifierField />
          <SignIn.PasswordField forgotPasswordPath="#" />
          <SignIn.SubmitButton />
        </SignIn.Form>
      </SignIn.Content>
    </SignIn>
  )
}
