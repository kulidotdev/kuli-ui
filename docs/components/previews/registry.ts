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

// Storytelling
import { StorytellingDefault } from "@/components/previews/storytelling/default"
import { StorytellingWithTabs } from "@/components/previews/storytelling/with-tabs"
import { StorytellingCustomStyling } from "@/components/previews/storytelling/custom-styling"
import { StorytellingCustomGrid } from "@/components/previews/storytelling/custom-grid"
import { StorytellingMixedLayout } from "@/components/previews/storytelling/mixed-layout"
import { StorytellingFastScroll } from "@/components/previews/storytelling/fast-scroll"
import { StorytellingCustomControls } from "@/components/previews/storytelling/custom-controls"

// Alert Card
import { AlertCardDefault } from "@/components/previews/alert-card/default"
import { AlertCardVariants } from "@/components/previews/alert-card/variants"

// Alert Error
import { AlertErrorDefault } from "@/components/previews/alert-error/default"
import { AlertErrorWithCode } from "@/components/previews/alert-error/with-code"

export const previewRegistry: Record<string, React.ComponentType> = {
  "alert-card/default": AlertCardDefault,
  "alert-card/variants": AlertCardVariants,
  
  "alert-error/default": AlertErrorDefault,
  "alert-error/with-code": AlertErrorWithCode,

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

  "storytelling/default": StorytellingDefault,
  "storytelling/with-tabs": StorytellingWithTabs,
  "storytelling/custom-styling": StorytellingCustomStyling,
  "storytelling/custom-grid": StorytellingCustomGrid,
  "storytelling/mixed-layout": StorytellingMixedLayout,
  "storytelling/fast-scroll": StorytellingFastScroll,
  "storytelling/custom-controls": StorytellingCustomControls,
}
