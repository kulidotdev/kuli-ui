"use client"

import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Smartphone, Mail, Key } from "lucide-react"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../ui/input-otp"
import { Checkbox } from "../ui/checkbox"
import { AlertError } from "../ui/alert-error"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"

import { type TwoFactorValues, type TwoFactorMethod } from "./two-factor-types"

import { TwoFactorContext, useTwoFactorContext, type TwoFactorContextValue } from "../../hooks/use-two-factor"

// --- Provider ---

/**
 * Props for the TwoFactor component.
 */
export interface TwoFactorProps {
  /**
   * The initial authentication method to display. Defaults to "totp".
   */
  currentView?: TwoFactorMethod
  /**
   * The allowed authentication methods. Defaults to ["totp", "otp"].
   */
  twofactorMethods?: TwoFactorMethod[]
  /**
   * Callback for when the user submits a verification code.
   */
  onSubmit?: (method: TwoFactorMethod, values: TwoFactorValues) => Promise<void>
  /**
   * Callback for when the user requests a new OTP (only used if "otp" method is enabled).
   */
  onResendOtp?: () => Promise<void>
  /**
   * Whether the component is currently in a loading state (e.g. submitting).
   */
  isLoading?: boolean
  /**
   * Whether the component is currently resending an OTP.
   */
  isResending?: boolean
  /**
   * An optional API error to display at the top of the form.
   */
  apiError?: { message: string; code?: string } | null
  /**
   * The expected length of TOTP codes. Defaults to 6.
   */
  totpLength?: number
  /**
   * The expected length of email/SMS OTP codes. Defaults to 6.
   */
  otpLength?: number
  /**
   * The cooldown time in seconds before the user can request another OTP. Defaults to 60.
   */
  resendCooldown?: number
  /**
   * If provided, displays a "Trust this device" checkbox with this description.
   */
  trustDeviceDescription?: string
  /**
   * The subcomponents to render within the two-factor card.
   */
  children: React.ReactNode
}

export function TwoFactor({
  currentView = "totp",
  twofactorMethods = ["totp", "otp"],
  onSubmit = async () => {},
  onResendOtp,
  isLoading = false,
  isResending = false,
  apiError = null,
  totpLength = 6,
  otpLength = 6,
  resendCooldown = 60,
  trustDeviceDescription,
  children,
}: TwoFactorProps) {
  const initialView = twofactorMethods.includes(currentView)
    ? currentView
    : twofactorMethods[0] || "totp"

  const [activeView, setActiveView] = React.useState<TwoFactorMethod>(initialView)
  const [countdown, setCountdown] = React.useState(0)

  React.useEffect(() => {
    const validView = twofactorMethods.includes(currentView)
      ? currentView
      : twofactorMethods[0] || "totp"
    setActiveView(validView)
  }, [currentView, twofactorMethods])

  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [countdown])

  const currentLength = activeView === "totp" ? totpLength : otpLength

  const dynamicSchema = React.useMemo(() => {
    let codeSchema = z.string()

    if (activeView === "backup_code") {
      codeSchema = codeSchema.min(1, { message: "Backup code is required" })
    } else {
      codeSchema = codeSchema.length(currentLength, {
        message: `Code must be exactly ${currentLength} digits`,
      })
    }

    return z.object({
      code: codeSchema,
      trustDevice: z.boolean().optional(),
      method: z.enum(["totp", "otp", "backup_code"]),
    })
  }, [currentLength, activeView])

  const form = useForm<TwoFactorValues>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: { code: "", trustDevice: false, method: activeView },
    mode: "onChange",
  })

  React.useEffect(() => {
    form.reset({ code: "", trustDevice: false, method: activeView })
  }, [activeView, form])

  const contextValue: TwoFactorContextValue = {
    activeView,
    setActiveView,
    twofactorMethods,
    form,
    countdown,
    setCountdown,
    onSubmit,
    onResendOtp,
    isLoading,
    isResending,
    apiError,
    totpLength,
    otpLength,
    currentLength,
    resendCooldown,
    trustDeviceDescription,
  }

  return (
    <TwoFactorContext.Provider value={contextValue}>
      <Card className="mx-auto w-full max-w-md">
        {children}
      </Card>
    </TwoFactorContext.Provider>
  )
}

// --- Compound Components ---

/**
 * Props for the TwoFactorHeader component.
 */
export interface TwoFactorHeaderProps {
  /**
   * The title of the card. Automatically changes based on active method if omitted.
   */
  title?: React.ReactNode
  /**
   * The description of the card. Automatically changes based on active method if omitted.
   */
  description?: React.ReactNode
}

TwoFactor.Header = function TwoFactorHeader({ title, description }: TwoFactorHeaderProps) {
  const { activeView, currentLength } = useTwoFactorContext()

  const defaultTitle = 
    activeView === "totp" ? "Authenticator App" :
    activeView === "otp" ? "Email Verification" :
    "Backup Code"

  const defaultDescription =
    activeView === "totp" ? `Enter the ${currentLength}-digit code from your authenticator app.` :
    activeView === "otp" ? `Enter the ${currentLength}-digit code sent to your email address.` :
    "Enter one of your emergency backup codes."

  return (
    <CardHeader>
      <CardTitle>{title || defaultTitle}</CardTitle>
      <CardDescription>{description || defaultDescription}</CardDescription>
    </CardHeader>
  )
}

/**
 * Props for the TwoFactorContent component.
 */
export interface TwoFactorContentProps {
  /**
   * Content to render inside the card body, typically the form.
   */
  children: React.ReactNode
}

TwoFactor.Content = function TwoFactorContent({ children }: TwoFactorContentProps) {
  const { apiError } = useTwoFactorContext()
  return (
    <CardContent>
      {apiError && (
        <AlertError
          message={apiError.message}
          code={apiError.code}
          className="mb-4"
        />
      )}
      {children}
    </CardContent>
  )
}

/**
 * Props for the TwoFactorForm component.
 */
export interface TwoFactorFormProps {
  /**
   * Form fields for the two-factor flow.
   */
  children: React.ReactNode
}

TwoFactor.Form = function TwoFactorForm({ children }: TwoFactorFormProps) {
  const { form, onSubmit, activeView } = useTwoFactorContext()

  const handleSubmit = async (values: TwoFactorValues) => {
    await onSubmit(activeView, values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {children}
      </form>
    </Form>
  )
}

TwoFactor.CodeInput = function TwoFactorCodeInput() {
  const { form, activeView, currentLength, isLoading } = useTwoFactorContext()

  return (
    <FormField
      control={form.control}
      name="code"
      render={({ field }) => (
        <FormItem className="flex flex-col items-start">
          <FormLabel className="sr-only">Authentication Code</FormLabel>
          <FormControl>
            {activeView === "backup_code" ? (
              <Input
                disabled={isLoading}
                placeholder="e.g. 1a2b3c4d5e"
                autoComplete="off"
                {...field}
              />
            ) : (
              <InputOTP
                maxLength={currentLength}
                disabled={isLoading}
                {...field}
              >
                <InputOTPGroup>
                  {Array.from({ length: currentLength }).map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

TwoFactor.TrustDevice = function TwoFactorTrustDevice() {
  const { form, trustDeviceDescription, isLoading } = useTwoFactorContext()

  if (!trustDeviceDescription) return null

  return (
    <FormField
      control={form.control}
      name="trustDevice"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-y-0 space-x-3">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isLoading}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Trust this device</FormLabel>
            <p className="text-[0.8rem] text-muted-foreground">
              {trustDeviceDescription}
            </p>
          </div>
        </FormItem>
      )}
    />
  )
}

/**
 * Props for the TwoFactorSubmitButton component.
 */
export interface TwoFactorSubmitButtonProps {
  /**
   * Custom label for the submit button. Defaults to "Verify Code".
   */
  children?: React.ReactNode
}

TwoFactor.SubmitButton = function TwoFactorSubmitButton({ children }: TwoFactorSubmitButtonProps) {
  const { form, isLoading, activeView, currentLength } = useTwoFactorContext()
  const codeValue = form.watch("code") || ""

  const isDisabled = isLoading || (
    activeView === "backup_code" ? codeValue.length === 0 : codeValue.length !== currentLength
  )

  return (
    <Button type="submit" className="w-full" disabled={isDisabled}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children || "Verify Code"}
    </Button>
  )
}

/**
 * Props for the TwoFactorFooter component.
 */
export interface TwoFactorFooterProps {
  /**
   * Custom content to display in the footer. The resend button and alternative methods are rendered automatically below this if applicable.
   */
  children?: React.ReactNode
}

TwoFactor.Footer = function TwoFactorFooter({ children }: TwoFactorFooterProps) {
  const { activeView, twofactorMethods } = useTwoFactorContext()
  const alternativeMethods = twofactorMethods.filter((m) => m !== activeView)

  if (activeView !== "otp" && alternativeMethods.length === 0 && !children) {
    return null
  }

  return (
    <CardFooter className="flex flex-col gap-3">
      {children}
      <TwoFactor.ResendOtp />
      <TwoFactor.AlternativeMethods />
    </CardFooter>
  )
}

TwoFactor.ResendOtp = function TwoFactorResendOtp() {
  const { activeView, countdown, setCountdown, isLoading, isResending, resendCooldown, onResendOtp } = useTwoFactorContext()

  if (activeView !== "otp") return null

  const handleResend = async () => {
    try {
      await onResendOtp?.()
      setCountdown(resendCooldown)
    } catch (error) {
      console.error("Failed to resend OTP", error)
    }
  }

  return (
    <div className="mt-2 text-center text-sm text-muted-foreground">
      Didn't receive the code?{" "}
      {countdown > 0 ? (
        <span className="font-medium text-primary">
          Try again in {countdown}s
        </span>
      ) : (
        <button
          type="button"
          className="font-medium text-primary hover:underline disabled:opacity-50"
          disabled={isLoading || isResending}
          onClick={handleResend}
        >
          {isResending ? "Resending..." : "Resend"}
        </button>
      )}
    </div>
  )
}

TwoFactor.AlternativeMethods = function TwoFactorAlternativeMethods() {
  const { activeView, twofactorMethods, setActiveView, isLoading } = useTwoFactorContext()
  const alternativeMethods = twofactorMethods.filter((m) => m !== activeView)

  if (alternativeMethods.length === 0) return null

  return (
    <>
      {alternativeMethods.map((method) => (
        <Button
          key={method}
          variant="ghost"
          className="w-full text-muted-foreground"
          type="button"
          onClick={() => setActiveView(method)}
          disabled={isLoading}
        >
          {method === "totp" && (
            <>
              <Smartphone className="mr-2 h-4 w-4" />
              Use Authenticator App
            </>
          )}
          {method === "otp" && (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Use Email OTP
            </>
          )}
          {method === "backup_code" && (
            <>
              <Key className="mr-2 h-4 w-4" />
              Use Backup Code
            </>
          )}
        </Button>
      ))}
    </>
  )
}
