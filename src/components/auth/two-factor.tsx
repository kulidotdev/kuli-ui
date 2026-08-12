import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Smartphone, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
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

  const dynamicSchema = React.useMemo(
    () =>
      z.object({
        code: z.string().length(currentLength, {
          message: `Code must be exactly ${currentLength} digits`,
        }),
      }),
    [currentLength]
  )

  const form = useForm<TwoFactorValues>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: { code: "" },
    mode: "onChange",
  })

  // Reset form when view changes
  React.useEffect(() => {
    form.reset({ code: "" })
  }, [activeView, form])

  const handleSubmit = async (values: TwoFactorValues) => {
    await onSubmit?.(activeView, values)
  }

  const handleToggleView = () => {
    setActiveView((prev) => (prev === "totp" ? "otp" : "totp"))
  }

  const showToggleButton =
    twofactorMethods.includes("totp") && twofactorMethods.includes("otp")

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>
          {activeView === "totp" ? "Authenticator App" : "Email Verification"}
        </CardTitle>
        <CardDescription>
          {activeView === "totp"
            ? `Enter the ${currentLength}-digit code from your authenticator app.`
            : `Enter the ${currentLength}-digit code sent to your email address.`}
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
                <FormItem className="flex flex-col items-center">
                  <FormLabel className="sr-only">Authentication Code</FormLabel>
                  <FormControl>
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={
                isLoading || (form.watch("code")?.length || 0) !== currentLength
              }
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify Code
            </Button>
          </form>
        </Form>
      </CardContent>

      {(activeView === "otp" || showToggleButton) && (
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

          {showToggleButton && (
            <Button
              variant="ghost"
              className="w-full text-muted-foreground"
              type="button"
              onClick={handleToggleView}
              disabled={isLoading}
            >
              {activeView === "totp" ? (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Use Email OTP
                </>
              ) : (
                <>
                  <Smartphone className="mr-2 h-4 w-4" />
                  Use Authenticator App
                </>
              )}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
