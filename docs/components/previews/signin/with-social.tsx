"use client"

import { SignIn } from "@kuli-ui/components/components/auth/signin"
import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons"

export function SignInWithSocial() {
  return (
    <SignIn onSubmit={() => {}} methods={["email"]}>
      <SignIn.Header />
      <SignIn.Content>
        <SignIn.Form>
          <SignIn.IdentifierField />
          <SignIn.PasswordField forgotPasswordPath="#" />
          <SignIn.SubmitButton />
        </SignIn.Form>
        <SignIn.Social
          providers={[
            {
              id: "google",
              label: "Google",
              icon: <SiGoogle />,
              onClick: () => {},
            },
            {
              id: "github",
              label: "GitHub",
              icon: <SiGithub />,
              onClick: () => {},
            },
          ]}
        />
      </SignIn.Content>
      <SignIn.Footer signupPath="#" />
    </SignIn>
  )
}
