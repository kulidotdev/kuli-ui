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
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { Input } from "../ui/input"
import { PhoneInput } from "../ui/phone-input"
import { AlertError } from "../ui/alert-error"
import { Form, FormField, FormItem, FormMessage, FormControl } from "../ui/form"
import { AlertCard } from "../ui/alert-card"
import {
  forgotPasswordEmailSchema,
  forgotPasswordPhoneSchema,
  type ForgotPasswordEmailValues,
  type ForgotPasswordPhoneValues,
} from "./forgot-password-types"

import { ForgotPasswordContext, useForgotPasswordContext, type ForgotPasswordTab, type ForgotPasswordContextValue } from "../../hooks/use-forgot-password"

// --- Provider ---

/**
 * Props for the ForgotPassword component.
 */
export interface ForgotPasswordProps {
  /**
   * Callback for when the user submits their email address.
   */
  onSubmitEmail: (values: ForgotPasswordEmailValues) => Promise<void>
  /**
   * Callback for when the user submits their phone number (if allowPhone is true).
   */
  onSubmitPhone?: (values: ForgotPasswordPhoneValues) => Promise<void>
  /**
   * Whether the component is currently in a loading state (e.g. submitting).
   * Disables all inputs and buttons.
   */
  isLoading?: boolean
  /**
   * An optional API error to display at the top of the form.
   */
  apiError?: { message: string; code?: string } | null
  /**
   * If true, enables the phone number OTP flow and displays tabs to switch methods.
   */
  allowPhone?: boolean
  /**
   * The subcomponents to render within the forgot password card.
   */
  children: React.ReactNode
}

export function ForgotPassword({
  onSubmitEmail,
  onSubmitPhone,
  isLoading = false,
  apiError = null,
  allowPhone = false,
  children,
}: ForgotPasswordProps) {
  const [activeTab, setActiveTab] = React.useState<ForgotPasswordTab>("email")

  const emailForm = useForm<ForgotPasswordEmailValues>({
    resolver: zodResolver(forgotPasswordEmailSchema),
    defaultValues: { email: "" },
    mode: "onChange",
  })

  const phoneForm = useForm<ForgotPasswordPhoneValues>({
    resolver: zodResolver(forgotPasswordPhoneSchema),
    defaultValues: { phone: "" },
    mode: "onChange",
  })

  const contextValue: ForgotPasswordContextValue = {
    activeTab,
    setActiveTab,
    emailForm,
    phoneForm,
    onSubmitEmail,
    onSubmitPhone,
    isLoading,
    apiError,
    allowPhone,
  }

  return (
    <ForgotPasswordContext.Provider value={contextValue}>
      <Card className="mx-auto w-full max-w-md">
        {children}
      </Card>
    </ForgotPasswordContext.Provider>
  )
}

// --- Compound Components ---

/**
 * Props for the ForgotPasswordHeader component.
 */
export interface ForgotPasswordHeaderProps {
  /**
   * The title of the card. Defaults to "Forgot Password".
   */
  title?: React.ReactNode
  /**
   * The description of the card. Automatically changes based on active tab and allowPhone if omitted.
   */
  description?: React.ReactNode
}

ForgotPassword.Header = function ForgotPasswordHeader({ title = "Forgot Password", description }: ForgotPasswordHeaderProps) {
  const { allowPhone, activeTab } = useForgotPasswordContext()

  const defaultDescription = allowPhone
    ? activeTab === "email"
      ? "Enter your email to receive a password reset link."
      : "Enter your phone number to receive an OTP."
    : "Enter your email to receive a password reset link."

  return (
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description || defaultDescription}</CardDescription>
    </CardHeader>
  )
}

/**
 * Props for the ForgotPasswordContent component.
 */
export interface ForgotPasswordContentProps {
  /**
   * Content to render inside the card body, typically the forms.
   */
  children: React.ReactNode
}

ForgotPassword.Content = function ForgotPasswordContent({ children }: ForgotPasswordContentProps) {
  const { apiError } = useForgotPasswordContext()
  return (
    <CardContent className="space-y-4">
      {apiError && (
        <AlertError message={apiError.message} code={apiError.code} />
      )}
      {children}
    </CardContent>
  )
}

/**
 * Props for the ForgotPasswordTabs component.
 */
export interface ForgotPasswordTabsProps {
  /**
   * The forms to render within the tabs.
   * If allowPhone is false, renders children directly without tabs.
   */
  children: React.ReactNode
}

ForgotPassword.Tabs = function ForgotPasswordTabs({ children }: ForgotPasswordTabsProps) {
  const { allowPhone, activeTab, setActiveTab } = useForgotPasswordContext()

  if (!allowPhone) {
    return <>{children}</>
  }

  return (
    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ForgotPasswordTab)}>
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="email">Email</TabsTrigger>
        <TabsTrigger value="phone">Phone</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  )
}

/**
 * Props for the ForgotPasswordEmailForm component.
 */
export interface ForgotPasswordEmailFormProps {
  /**
   * Form fields for the email reset flow.
   */
  children: React.ReactNode
}

ForgotPassword.EmailForm = function ForgotPasswordEmailForm({ children }: ForgotPasswordEmailFormProps) {
  const { emailForm, onSubmitEmail, activeTab, allowPhone } = useForgotPasswordContext()

  if (allowPhone && activeTab !== "email") return null

  return (
    <Form {...emailForm}>
      <form onSubmit={emailForm.handleSubmit(onSubmitEmail)} className="space-y-4">
        {children}
      </form>
    </Form>
  )
}

/**
 * Props for the ForgotPasswordPhoneForm component.
 */
export interface ForgotPasswordPhoneFormProps {
  /**
   * Form fields for the phone OTP flow.
   */
  children: React.ReactNode
}

ForgotPassword.PhoneForm = function ForgotPasswordPhoneForm({ children }: ForgotPasswordPhoneFormProps) {
  const { phoneForm, onSubmitPhone, activeTab, allowPhone } = useForgotPasswordContext()

  if (!allowPhone || activeTab !== "phone") return null

  const handlePhoneSubmit = (values: ForgotPasswordPhoneValues) => {
    if (onSubmitPhone) {
      onSubmitPhone(values)
    }
  }

  return (
    <Form {...phoneForm}>
      <form onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)} className="space-y-4">
        {children}
      </form>
    </Form>
  )
}

ForgotPassword.EmailField = function ForgotPasswordEmailField() {
  const { emailForm, isLoading } = useForgotPasswordContext()
  return (
    <FormField
      control={emailForm.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              id="forgot-email"
              type="email"
              placeholder="name@example.com"
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

ForgotPassword.PhoneField = function ForgotPasswordPhoneField() {
  const { phoneForm, isLoading } = useForgotPasswordContext()
  return (
    <FormField
      control={phoneForm.control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <PhoneInput
              id="forgot-phone"
              disabled={isLoading}
              value={field.value}
              onChange={field.onChange}
              defaultCountry="US"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

/**
 * Props for the ForgotPasswordSubmitButton component.
 */
export interface ForgotPasswordSubmitButtonProps {
  /**
   * Custom label for the submit button. 
   * Defaults to "Send Reset Link" (email) or "Send OTP" (phone).
   */
  children?: React.ReactNode
}

ForgotPassword.SubmitButton = function ForgotPasswordSubmitButton({ children }: ForgotPasswordSubmitButtonProps) {
  const { isLoading, activeTab } = useForgotPasswordContext()

  const defaultText = activeTab === "email" ? "Send Reset Link" : "Send OTP"

  return (
    <Button className="w-full" type="submit" disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children || (isLoading ? "Sending..." : defaultText)}
    </Button>
  )
}

/**
 * Props for the ForgotPasswordSuccessView component.
 */
export interface ForgotPasswordSuccessViewProps {
  /**
   * The URL to navigate to when the user clicks the "Go Back" button.
   */
  backUrl: string
}

export function ForgotPasswordSuccessView({ backUrl }: ForgotPasswordSuccessViewProps) {
  return (
    <div className="mx-auto w-full max-w-md">
      <AlertCard
        variant="success"
        title="Reset Link Sent"
        description="A password reset link has been sent to your email. Please check your inbox."
        footer={
          <Button asChild className="w-full">
            <a href={backUrl}>Go Back</a>
          </Button>
        }
      />
    </div>
  )
}
