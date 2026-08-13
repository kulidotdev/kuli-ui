"use client"

import * as React from "react"
import {
  QrCode,
  Copy,
  Check,
  ShieldAlert,
  ShieldCheck,
  KeyRound,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { AlertError } from "@/components/ui/alert-error"
import QRCode from "react-qr-code"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import {
  TwoFactorContext,
  useTwoFactorRegistration,
  type TotpData,
  type TwoFactorViewState,
  type TwoFactorContextValue,
} from "@/hooks/use-two-factor-registration"

export interface TwoFactorRegistrationProps {
  /**
   * Initial 2FA status
   */
  enabled?: boolean
  /**
   * Callback to verify password and enable 2FA.
   * Should return the necessary 2FA details on success.
   */
  onEnable?: (password: string) => Promise<TotpData>
  /**
   * Callback to verify the TOTP code from the authenticator app during registration.
   */
  onVerifyOtp?: (otp: string, trustedDevice: boolean) => Promise<void>
  /**
   * Callback to verify password and disable 2FA.
   */
  onDisable?: (password: string) => Promise<void>
  /**
   * Optional custom children. If not provided, default views will be rendered.
   */
  children?: React.ReactNode
}

export function TwoFactorRegistration({
  enabled = false,
  onEnable,
  onDisable,
  onVerifyOtp,
  children,
}: TwoFactorRegistrationProps) {
  const [view, setView] = React.useState<TwoFactorViewState>(
    enabled ? "configured" : "unconfigured"
  )
  const [password, setPassword] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [totpData, setTotpData] = React.useState<TotpData | null>(null)
  const [otp, setOtp] = React.useState("")
  const [trustedDevice, setTrustedDevice] = React.useState(false)

  // Sync state if `enabled` prop changes
  React.useEffect(() => {
    setView(enabled ? "configured" : "unconfigured")
  }, [enabled])

  const contextValue: TwoFactorContextValue = {
    view,
    setView,
    password,
    setPassword,
    isSubmitting,
    setIsSubmitting,
    error,
    setError,
    totpData,
    setTotpData,
    otp,
    setOtp,
    trustedDevice,
    setTrustedDevice,
    onEnable,
    onDisable,
    onVerifyOtp,
  }

  return (
    <TwoFactorContext.Provider value={contextValue}>
      {children ? children : <TwoFactorDefaultViews />}
    </TwoFactorContext.Provider>
  )
}

// =========================================================================
// Default Views (Monolithic / Compound Implementation)
// =========================================================================

export function TwoFactorDefaultViews() {
  const { view } = useTwoFactorRegistration()

  if (view === "unconfigured") return <TwoFactorUnconfiguredView />
  if (view === "enabling_password") return <TwoFactorEnablingPasswordView />
  if (view === "show_qr") return <TwoFactorShowQrView />
  if (view === "configured") return <TwoFactorConfiguredView />
  if (view === "disabling_password") return <TwoFactorDisablingPasswordView />

  return null
}

export function TwoFactorUnconfiguredView() {
  const { setView } = useTwoFactorRegistration()
  return (
    <Empty>
      <EmptyMedia variant="icon">
        <ShieldAlert className="text-muted-foreground" />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>Two-Factor Authentication is not enabled</EmptyTitle>
        <EmptyDescription>
          Enhance your account security by enabling two-factor authentication
          (2FA). Click the button below to get started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={() => setView("enabling_password")}>Enable 2FA</Button>
      </EmptyContent>
    </Empty>
  )
}

export function TwoFactorEnablingPasswordView() {
  const {
    password,
    setPassword,
    isSubmitting,
    setIsSubmitting,
    error,
    setError,
    setView,
    setTotpData,
    onEnable,
  } = useTwoFactorRegistration()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      if (onEnable) {
        const data = await onEnable(password)
        setTotpData(data)
        setView("show_qr")
      } else {
        throw new Error("onEnable callback is required.")
      }
      setPassword("")
    } catch (err: any) {
      setError(err.message || "Failed to verify password.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Empty>
      <EmptyMedia variant="icon">
        <KeyRound className="text-muted-foreground" />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>Verify your password</EmptyTitle>
        <EmptyDescription>
          Please enter your password to continue enabling two-factor
          authentication.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="w-full">
        {error && <AlertError message={error} className="mb-4" />}
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <div className="w-full space-y-2 text-left">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="flex w-full justify-between gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setView("unconfigured")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Verifying..." : "Continue"}
            </Button>
          </div>
        </form>
      </EmptyContent>
    </Empty>
  )
}

export function TwoFactorShowQrView() {
  const {
    totpData,
    setView,
    otp,
    setOtp,
    isSubmitting,
    setIsSubmitting,
    error,
    setError,
    trustedDevice,
    setTrustedDevice,
    onVerifyOtp,
  } = useTwoFactorRegistration()

  const [isCopied, setIsCopied] = React.useState(false)
  const [isBackupOpen, setIsBackupOpen] = React.useState(false)

  const copyBackupCodes = () => {
    if (totpData?.backupCodes) {
      navigator.clipboard.writeText(totpData.backupCodes.join("\n"))
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      if (onVerifyOtp) {
        await onVerifyOtp(otp, trustedDevice)
      }
      setView("configured")
      setOtp("")
    } catch (err: any) {
      setError(err.message || "Invalid or expired code.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>Scan QR Code</EmptyTitle>
        <EmptyDescription>
          Scan this QR code with your authenticator app (like Google
          Authenticator or Authy).
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="w-full">
        <div className="mx-auto mb-4 flex h-48 w-48 items-center justify-center rounded-xl border-2 border-dashed bg-white p-4">
          {totpData?.totpUri ? (
            <QRCode
              value={totpData.totpUri}
              size={160}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            />
          ) : (
            <QrCode className="h-16 w-16 text-muted-foreground opacity-50" />
          )}
        </div>

        <div className="mb-2 w-full rounded-md bg-muted p-2 text-center font-mono text-sm break-all">
          {totpData?.secret}
        </div>

        <Collapsible
          open={isBackupOpen}
          onOpenChange={setIsBackupOpen}
          className="w-full rounded-md border bg-card p-2 text-left"
        >
          <div className="flex items-center justify-between">
            <h4 className="ml-2 text-sm font-semibold">Backup Codes</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="mr-2">
                {isBackupOpen ? "Hide" : "Show"}
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Save these backup codes in a safe place. They can be used to
              access your account if you lose your authenticator device.
            </p>
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              {totpData?.backupCodes.map((code, index) => (
                <div key={index} className="rounded bg-muted p-2 text-center">
                  {code}
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={copyBackupCodes}
            >
              {isCopied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Backup Codes
                </>
              )}
            </Button>
          </CollapsibleContent>
        </Collapsible>
        <form
          onSubmit={handleSubmit}
          className="mt-2 flex w-full flex-col gap-4"
        >
          <div className="flex w-full flex-col space-y-2">
            <div className="space-y-1">
              <Label htmlFor="otp">Authentication Code</Label>
              <p className="text-start text-xs text-muted-foreground">
                Enter the 6-digit code from your authenticator app.
              </p>
            </div>
            <InputOTP
              id="otp"
              maxLength={6}
              value={otp}
              onChange={setOtp}
              disabled={isSubmitting}
            >
              <InputOTPGroup>
                {Array.from({ length: 6 }).map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="trustedDevice"
              checked={trustedDevice}
              onCheckedChange={(c) => setTrustedDevice(!!c)}
              disabled={isSubmitting}
            />
            <Label
              htmlFor="trustedDevice"
              className="font-normal text-muted-foreground"
            >
              Trust this device for 30 days
            </Label>
          </div>
          {error && <AlertError message={error} />}

          <Button
            type="submit"
            className="mt-2 w-full"
            disabled={isSubmitting || otp.length !== 6}
          >
            {isSubmitting ? "Verifying..." : "Verify and Enable"}
          </Button>
        </form>
      </EmptyContent>
    </Empty>
  )
}

export function TwoFactorConfiguredView() {
  const { setView } = useTwoFactorRegistration()
  return (
    <Empty>
      <EmptyMedia variant="icon">
        <ShieldCheck className="text-green-500" />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>Two-Factor Authentication is enabled</EmptyTitle>
        <EmptyDescription>
          Your account is secured with two-factor authentication. You will be
          prompted for a code when signing in.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          variant="destructive"
          onClick={() => setView("disabling_password")}
        >
          Disable 2FA
        </Button>
      </EmptyContent>
    </Empty>
  )
}

export function TwoFactorDisablingPasswordView() {
  const {
    password,
    setPassword,
    isSubmitting,
    setIsSubmitting,
    error,
    setError,
    setView,
    onDisable,
  } = useTwoFactorRegistration()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      if (onDisable) {
        await onDisable(password)
        setView("unconfigured")
      } else {
        throw new Error("onDisable callback is required.")
      }
      setPassword("")
    } catch (err: any) {
      setError(err.message || "Failed to verify password.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Empty>
      <EmptyMedia variant="icon">
        <KeyRound className="text-muted-foreground" />
      </EmptyMedia>
      <EmptyHeader>
        <EmptyTitle>Verify your password</EmptyTitle>
        <EmptyDescription>
          Please enter your password to disable two-factor authentication.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="w-full">
        {error && <AlertError message={error} className="mb-4" />}
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <div className="w-full space-y-2 text-left">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="flex w-full justify-between gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setView("configured")}
            >
              Cancel
            </Button>
            <Button type="submit" variant="destructive" disabled={isSubmitting}>
              {isSubmitting ? "Verifying..." : "Disable"}
            </Button>
          </div>
        </form>
      </EmptyContent>
    </Empty>
  )
}
