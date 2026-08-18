"use client"

import { useState } from "react"
import { TwoFactor } from "@kuli-ui/components/components/auth/two-factor"
import type {
  TwoFactorMethod,
  TwoFactorValues,
} from "@kuli-ui/components/components/auth/two-factor-types"

export function TwoFactorMultiMethod() {
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [apiError, setApiError] = useState<{ message: string } | null>(null)

  const handleSubmit = async (
    _method: TwoFactorMethod,
    _values: TwoFactorValues
  ) => {
    setIsLoading(true)
    setApiError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch {
      setApiError({ message: "Invalid code." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsResending(false)
  }

  return (
    <TwoFactor
      onSubmit={handleSubmit}
      onResendOtp={handleResend}
      isLoading={isLoading}
      isResending={isResending}
      apiError={apiError}
      twofactorMethods={["totp", "otp", "backup_code"]}
      currentView="totp"
      resendCooldown={60}
      trustDeviceDescription="Skip 2FA on this device for 30 days"
    >
      <TwoFactor.Header />
      <TwoFactor.Content>
        <TwoFactor.Form>
          <TwoFactor.CodeInput />
          <TwoFactor.TrustDevice />
          <TwoFactor.SubmitButton />
        </TwoFactor.Form>
      </TwoFactor.Content>
      <TwoFactor.Footer />
    </TwoFactor>
  )
}
