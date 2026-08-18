"use client"

import { useState } from "react"
import { TwoFactor } from "@kuli-ui/components/components/auth/two-factor"
import type {
  TwoFactorMethod,
  TwoFactorValues,
} from "@kuli-ui/components/components/auth/two-factor-types"

export function TwoFactorTotp() {
  const [isLoading, setIsLoading] = useState(false)
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

  return (
    <TwoFactor
      onSubmit={handleSubmit}
      isLoading={isLoading}
      apiError={apiError}
      twofactorMethods={["totp"]}
    >
      <TwoFactor.Header />
      <TwoFactor.Content>
        <TwoFactor.Form>
          <TwoFactor.CodeInput />
          <TwoFactor.TrustDevice />
          <TwoFactor.SubmitButton />
        </TwoFactor.Form>
      </TwoFactor.Content>
    </TwoFactor>
  )
}
