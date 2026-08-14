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

import { ForgotPasswordContext, useForgotPasswordContext, type ForgotPasswordTab, type ForgotPasswordContextValue } from "@/hooks/use-forgot-password"

// --- Provider ---
export interface ForgotPasswordProps {
  onSubmitEmail: (values: ForgotPasswordEmailValues) => Promise<void>
  onSubmitPhone?: (values: ForgotPasswordPhoneValues) => Promise<void>
  isLoading?: boolean
  apiError?: { message: string; code?: string } | null
  allowPhone?: boolean
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

ForgotPassword.Header = function ForgotPasswordHeader({ title = "Forgot Password", description }: { title?: React.ReactNode, description?: React.ReactNode }) {
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

ForgotPassword.Content = function ForgotPasswordContent({ children }: { children: React.ReactNode }) {
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

ForgotPassword.Tabs = function ForgotPasswordTabs({ children }: { children: React.ReactNode }) {
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

ForgotPassword.EmailForm = function ForgotPasswordEmailForm({ children }: { children: React.ReactNode }) {
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

ForgotPassword.PhoneForm = function ForgotPasswordPhoneForm({ children }: { children: React.ReactNode }) {
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

ForgotPassword.SubmitButton = function ForgotPasswordSubmitButton({ children }: { children?: React.ReactNode }) {
  const { isLoading, activeTab } = useForgotPasswordContext()

  const defaultText = activeTab === "email" ? "Send Reset Link" : "Send OTP"

  return (
    <Button className="w-full" type="submit" disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children || (isLoading ? "Sending..." : defaultText)}
    </Button>
  )
}

export function ForgotPasswordSuccessView({ backUrl }: { backUrl: string }) {
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
