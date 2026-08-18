import * as React from "react"
import { SignInEmailOnly } from "@/components/previews/signin/email-only"
import { SignInMultiMethod } from "@/components/previews/signin/multi-method"
import { SignInWithSocial } from "@/components/previews/signin/with-social"
import { SignInWithPasswordless } from "@/components/previews/signin/with-passwordless"
import { SignInLoading } from "@/components/previews/signin/loading"
import { SignInWithError } from "@/components/previews/signin/with-error"

// Forgot Password
import { ForgotPasswordEmailOnly } from "@/components/previews/forgot-password/email-only"
import { ForgotPasswordWithPhone } from "@/components/previews/forgot-password/with-phone"

// Passkey Manager
import { PasskeyManagerDefault } from "@/components/previews/passkey-manager/default"
import { PasskeyManagerBasic } from "@/components/previews/passkey-manager/basic"

// Reset Password
import { ResetPasswordEmail } from "@/components/previews/reset-password/email"
import { ResetPasswordPhone } from "@/components/previews/reset-password/phone"

// Sign Up
import { SignUpBasic } from "@/components/previews/signup/basic"
import { SignUpWithUsernamePhone } from "@/components/previews/signup/with-username-phone"

// Two Factor Registration
import { TwoFactorRegistrationDefault } from "@/components/previews/two-factor-registration/default"

// Two Factor
import { TwoFactorTotp } from "@/components/previews/two-factor/totp"
import { TwoFactorMultiMethod } from "@/components/previews/two-factor/multi-method"

export const previewRegistry: Record<string, React.ComponentType> = {
  "signin/email-only": SignInEmailOnly,
  "signin/multi-method": SignInMultiMethod,
  "signin/with-social": SignInWithSocial,
  "signin/with-passwordless": SignInWithPasswordless,
  "signin/loading": SignInLoading,
  "signin/with-error": SignInWithError,

  "forgot-password/email-only": ForgotPasswordEmailOnly,
  "forgot-password/with-phone": ForgotPasswordWithPhone,

  "passkey-manager/default": PasskeyManagerDefault,
  "passkey-manager/basic": PasskeyManagerBasic,

  "reset-password/email": ResetPasswordEmail,
  "reset-password/phone": ResetPasswordPhone,

  "signup/basic": SignUpBasic,
  "signup/with-username-phone": SignUpWithUsernamePhone,

  "two-factor-registration/default": TwoFactorRegistrationDefault,

  "two-factor/totp": TwoFactorTotp,
  "two-factor/multi-method": TwoFactorMultiMethod,
}
