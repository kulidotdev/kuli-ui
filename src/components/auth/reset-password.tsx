"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"
import { AlertError } from "../ui/alert-error"
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
  FormLabel,
} from "../ui/form"
import { AlertCard } from "../ui/alert-card"
import {
  resetPasswordEmailSchema,
  resetPasswordPhoneSchema,
  type ResetPasswordEmailValues,
  type ResetPasswordPhoneValues,
} from "./forgot-password-types"

import { ResetPasswordContext, useResetPasswordContext, type ResetPasswordMethod, type ResetPasswordContextValue } from "../../hooks/use-reset-password"

// --- Provider ---

/**
 * Props for the ResetPassword component.
 */
export interface ResetPasswordProps {
  /**
   * The reset method being used. "email" expects just a new password, "phone" also expects an OTP code.
   */
  method?: ResetPasswordMethod
  /**
   * Callback for when the user submits their new password via the email flow.
   */
  onSubmitEmail?: (values: ResetPasswordEmailValues) => Promise<void>
  /**
   * Callback for when the user submits their new password and OTP via the phone flow.
   */
  onSubmitPhone?: (values: ResetPasswordPhoneValues) => Promise<void>
  /**
   * Whether the component is currently in a loading state (e.g. submitting).
   */
  isLoading?: boolean
  /**
   * An optional API error to display at the top of the form.
   */
  apiError?: { message: string; code?: string } | null
  /**
   * The subcomponents to render within the reset password card.
   */
  children: React.ReactNode
}

export function ResetPassword({
  method = "email",
  onSubmitEmail,
  onSubmitPhone,
  isLoading = false,
  apiError = null,
  children,
}: ResetPasswordProps) {
  const emailForm = useForm<ResetPasswordEmailValues>({
    resolver: zodResolver(resetPasswordEmailSchema),
    defaultValues: { password: "", confirmPassword: "" },
    mode: "onChange",
  })

  const phoneForm = useForm<ResetPasswordPhoneValues>({
    resolver: zodResolver(resetPasswordPhoneSchema),
    defaultValues: { code: "", password: "", confirmPassword: "" },
    mode: "onChange",
  })

  const contextValue: ResetPasswordContextValue = {
    method,
    emailForm,
    phoneForm,
    onSubmitEmail,
    onSubmitPhone,
    isLoading,
    apiError,
  }

  return (
    <ResetPasswordContext.Provider value={contextValue}>
      <Card className="mx-auto w-full max-w-md">
        {children}
      </Card>
    </ResetPasswordContext.Provider>
  )
}

// --- Compound Components ---

/**
 * Props for the ResetPasswordHeader component.
 */
export interface ResetPasswordHeaderProps {
  /**
   * The title of the card. Defaults to "Reset Password".
   */
  title?: React.ReactNode
  /**
   * The description of the card. Defaults to "Enter your new password below."
   */
  description?: React.ReactNode
}

ResetPassword.Header = function ResetPasswordHeader({ title = "Reset Password", description = "Enter your new password below." }: ResetPasswordHeaderProps) {
  return (
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
  )
}

/**
 * Props for the ResetPasswordContent component.
 */
export interface ResetPasswordContentProps {
  /**
   * Content to render inside the card body, typically the form.
   */
  children: React.ReactNode
}

ResetPassword.Content = function ResetPasswordContent({ children }: ResetPasswordContentProps) {
  const { apiError } = useResetPasswordContext()
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
 * Props for the ResetPasswordForm component.
 */
export interface ResetPasswordFormProps {
  /**
   * Form fields for the password reset flow.
   */
  children: React.ReactNode
}

ResetPassword.Form = function ResetPasswordForm({ children }: ResetPasswordFormProps) {
  const { method, emailForm, phoneForm, onSubmitEmail, onSubmitPhone } = useResetPasswordContext()

  if (method === "email") {
    return (
      <Form {...emailForm}>
        <form onSubmit={emailForm.handleSubmit(onSubmitEmail!)} className="space-y-4">
          {children}
        </form>
      </Form>
    )
  }

  return (
    <Form {...phoneForm}>
      <form onSubmit={phoneForm.handleSubmit(onSubmitPhone!)} className="space-y-4">
        {children}
      </form>
    </Form>
  )
}

ResetPassword.OtpField = function ResetPasswordOtpField() {
  const { method, phoneForm, isLoading } = useResetPasswordContext()

  if (method !== "phone") return null

  return (
    <FormField
      control={phoneForm.control}
      name="code"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Verification Code</FormLabel>
          <FormControl>
            <InputOTP maxLength={6} disabled={isLoading} {...field}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

ResetPassword.PasswordField = function ResetPasswordPasswordField() {
  const { method, emailForm, phoneForm, isLoading } = useResetPasswordContext()
  const formControl = method === "email" ? emailForm.control : phoneForm.control

  return (
    <FormField
      // react-hook-form's FormField expects a single, strict generic type for control.
      // Since formControl is a union type (EmailControl | PhoneControl), we cast to any 
      // to bypass the TS mismatch, as the 'password' field exists in both schemas.
      control={formControl as any}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>New Password</FormLabel>
          <FormControl>
            <Input
              type="password"
              placeholder={method === "email" ? "New Password" : ""}
              disabled={isLoading}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

ResetPassword.ConfirmPasswordField = function ResetPasswordConfirmPasswordField() {
  const { method, emailForm, phoneForm, isLoading } = useResetPasswordContext()
  const formControl = method === "email" ? emailForm.control : phoneForm.control

  return (
    <FormField
      // react-hook-form's FormField expects a single, strict generic type for control.
      // Since formControl is a union type (EmailControl | PhoneControl), we cast to any 
      // to bypass the TS mismatch, as the 'confirmPassword' field exists in both schemas.
      control={formControl as any}
      name="confirmPassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Confirm New Password</FormLabel>
          <FormControl>
            <Input
              type="password"
              placeholder={method === "email" ? "Confirm New Password" : ""}
              disabled={isLoading}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

/**
 * Props for the ResetPasswordSubmitButton component.
 */
export interface ResetPasswordSubmitButtonProps {
  /**
   * Custom label for the submit button. Defaults to "Reset Password".
   */
  children?: React.ReactNode
}

ResetPassword.SubmitButton = function ResetPasswordSubmitButton({ children }: ResetPasswordSubmitButtonProps) {
  const { isLoading } = useResetPasswordContext()
  return (
    <Button className="w-full" type="submit" disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children || (isLoading ? "Resetting..." : "Reset Password")}
    </Button>
  )
}

/**
 * Props for the ResetPasswordSuccessView component.
 */
export interface ResetPasswordSuccessViewProps {
  /**
   * The URL to navigate to when the user clicks the "Continue" button.
   */
  redirectTo: string
}

export function ResetPasswordSuccessView({
  redirectTo,
}: ResetPasswordSuccessViewProps) {
  return (
    <div className="mx-auto w-full max-w-md">
      <AlertCard
        variant="success"
        title="Password Reset Successful"
        description="Your password has been successfully reset. You can now use your new password to sign in."
        footer={
          <Button asChild className="w-full">
            <a href={redirectTo}>Continue</a>
          </Button>
        }
      />
    </div>
  )
}
