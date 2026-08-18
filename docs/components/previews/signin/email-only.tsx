"use client"

import { SignIn } from "@kuli-ui/components/components/auth/signin"

export function SignInEmailOnly() {
  return (
    <SignIn onSubmit={() => {}} methods={["email"]}>
      <SignIn.Header />
      <SignIn.Content>
        <SignIn.Form>
          <SignIn.IdentifierField />
          <SignIn.PasswordField forgotPasswordPath="#" />
          <SignIn.RememberMe />
          <SignIn.SubmitButton />
        </SignIn.Form>
      </SignIn.Content>
      <SignIn.Footer signupPath="#" />
    </SignIn>
  )
}
