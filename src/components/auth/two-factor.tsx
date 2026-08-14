"use client"

import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Smartphone, Mail, Key } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertError } from "@/components/ui/alert-error"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { type TwoFactorValues, type TwoFactorMethod } from "./two-factor-types"

export interface TwoFactorFormProps {
  /**
   * The default active view (method).
   * @default "totp"
   */
  currentView?: TwoFactorMethod
  /**
   * Available methods to display. If a method is not in this list,
   * its view cannot be displayed.
   * @default ["totp", "otp"]
   */
  twofactorMethods?: TwoFactorMethod[]
  /**
   * Submit handler for the 2FA code.
   */
  onSubmit?: (method: TwoFactorMethod, values: TwoFactorValues) => Promise<void>
  /**
   * Handler for resending the OTP code (only applicable when view is 'otp').
   */
  onResendOtp?: () => Promise<void>
  /**
   * Loading state for the main action.
   */
  isLoading?: boolean
  /**
   * Loading state for the resend action.
   */
  isResending?: boolean
  /**
   * Any API error to display.
   */
  apiError?: { message: string; code?: string } | null
  /**
   * The length of the TOTP code (Authenticator App). (default: 6)
   */
  totpLength?: number
  /**
   * The length of the OTP code (Email). (default: 6)
   */
  otpLength?: number
  /**
   * Cooldown in seconds before the user can resend the OTP.
   * @default 60
   */
  resendCooldown?: number
  /**
   * Description for the "Trust this device" checkbox.
   * If provided, the checkbox will be shown.
   */
  trustDeviceDescription?: string
}

export function TwoFactorForm({
  currentView = "totp",
  twofactorMethods = ["totp", "otp"],
  onSubmit,
  onResendOtp,
  isLoading = false,
  isResending = false,
  apiError,
  totpLength = 6,
  otpLength = 6,
  resendCooldown = 60,
  trustDeviceDescription,
}: TwoFactorFormProps) {
  // Ensure the current view is supported by twofactorMethods.
  // If not, default to the first available method.
  const initialView = twofactorMethods.includes(currentView)
    ? currentView
    : twofactorMethods[0] || "totp"

  const [activeView, setActiveView] =
    React.useState<TwoFactorMethod>(initialView)
  const [countdown, setCountdown] = React.useState(0)

  // Sync active view when props change
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

  const handleResend = async () => {
    try {
      await onResendOtp?.()
      setCountdown(resendCooldown)
    } catch (error) {
      // If resending fails, do not start the countdown
      console.error("Failed to resend OTP", error)
    }
  }

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

  // Reset form when view changes
  React.useEffect(() => {
    form.reset({ code: "", trustDevice: false, method: activeView })
  }, [activeView, form])

  const handleSubmit = async (values: TwoFactorValues) => {
    await onSubmit?.(activeView, values)
  }

  const alternativeMethods = twofactorMethods.filter((m) => m !== activeView)

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>
          {activeView === "totp" && "Authenticator App"}
          {activeView === "otp" && "Email Verification"}
          {activeView === "backup_code" && "Backup Code"}
        </CardTitle>
        <CardDescription>
          {activeView === "totp" &&
            `Enter the ${currentLength}-digit code from your authenticator app.`}
          {activeView === "otp" &&
            `Enter the ${currentLength}-digit code sent to your email address.`}
          {activeView === "backup_code" &&
            "Enter one of your emergency backup codes."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {apiError && (
          <AlertError
            message={apiError.message}
            code={apiError.code}
            className="mb-4"
          />
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
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

            {trustDeviceDescription && (
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
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={
                isLoading ||
                (activeView === "backup_code"
                  ? (form.watch("code")?.length || 0) === 0
                  : (form.watch("code")?.length || 0) !== currentLength)
              }
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify Code
            </Button>
          </form>
        </Form>
      </CardContent>

      {(activeView === "otp" || alternativeMethods.length > 0) && (
        <CardFooter className="flex flex-col gap-3">
          {activeView === "otp" && (
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
          )}

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
        </CardFooter>
      )}
    </Card>
  )
}
