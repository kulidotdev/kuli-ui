"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { SignInContext, useSignInContext, type SignInContextValue } from "@/hooks/use-signin"

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
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { AlertError } from "@/components/ui/alert-error"
import { PhoneInput } from "@/components/ui/phone-input"
import { AlertCard } from "../ui/alert-card"
import {
  MagicLinkButton,
  PasskeyButton,
  SocialProviderButton,
} from "./passwordless-buttons"

import {
  signinEmailSchema,
  signinUsernameSchema,
  signinPhoneSchema,
  SIGNIN_METHOD_LABELS,
  type SigninFormValues,
  type SigninMethod,
  type BaseFormValues,
} from "./signin-types"

export type { SigninFormValues, SigninMethod }
export { SIGNIN_METHOD_LABELS }
export { signinEmailSchema as signinSchema }

const schemaFor = {
  email: signinEmailSchema,
  username: signinUsernameSchema,
  phone: signinPhoneSchema,
} as const

// --- Provider ---
export interface SignInProps {
  onSubmit: (values: SigninFormValues) => void
  isLoading?: boolean
  apiError?: { message: string; code?: string } | null
  methods?: SigninMethod[]
  children: React.ReactNode
}

export function SignIn({
  onSubmit,
  isLoading = false,
  apiError = null,
  methods = ["email", "username", "phone"],
  children,
}: SignInProps) {
  const [method, setMethod] = React.useState<SigninMethod>(
    methods[0] ?? "email"
  )

  const form = useForm<BaseFormValues>({
    resolver: (values, context, options) =>
      zodResolver(schemaFor[method])(values, context, options),
    mode: "onTouched",
    defaultValues: {
      method,
      identifier: "",
      password: "",
      remember: false,
    },
  })

  const handleMethodChange = React.useCallback(
    (next: SigninMethod) => {
      setMethod(next)
      form.reset({
        method: next,
        identifier: "",
        password: "",
        remember: false,
      })
    },
    [form]
  )

  React.useEffect(() => {
    if (methods.length > 0 && !methods.includes(method)) {
      handleMethodChange(methods[0] as SigninMethod)
    }
  }, [methods, method, handleMethodChange])

  const contextValue: SignInContextValue = {
    form,
    method,
    setMethod: handleMethodChange,
    methods,
    isLoading,
    apiError,
    onSubmit,
  }

  return (
    <SignInContext.Provider value={contextValue}>
      <Card className="mx-auto w-full max-w-md">{children}</Card>
    </SignInContext.Provider>
  )
}

// --- Compound Components ---

SignIn.Header = function SignInHeader({
  title = "Sign In",
  description = "Select your preferred authentication method",
}: {
  title?: React.ReactNode
  description?: React.ReactNode
}) {
  return (
    <CardHeader className="space-y-1 text-center">
      <CardTitle className="text-2xl font-bold tracking-tight">
        {title}
      </CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
  )
}

SignIn.Content = function SignInContent({
  children,
}: {
  children: React.ReactNode
}) {
  const { apiError } = useSignInContext()
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

SignIn.MethodSwitch = function SignInMethodSwitch() {
  const { method, setMethod, methods, isLoading } = useSignInContext()

  if (methods.length <= 1) return null

  return (
    <Select
      value={method}
      onValueChange={(v) => setMethod(v as SigninMethod)}
      disabled={isLoading}
    >
      <SelectTrigger className="h-auto w-auto border-0 bg-transparent py-0 text-muted-foreground shadow-none hover:text-foreground focus:ring-0">
        Switch?
      </SelectTrigger>
      <SelectContent align="end" position="popper">
        {methods.map((m) => (
          <SelectItem key={m} value={m}>
            {SIGNIN_METHOD_LABELS[m]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

SignIn.Form = function SignInForm({ children }: { children: React.ReactNode }) {
  const { form, onSubmit, methods } = useSignInContext()

  if (methods.length === 0) return null

  const handleSubmit = (values: BaseFormValues) =>
    onSubmit(values as SigninFormValues)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        method="post"
        className="space-y-4"
      >
        {children}
      </form>
    </Form>
  )
}

SignIn.IdentifierField = function SignInIdentifierField() {
  const { form, method, isLoading } = useSignInContext()

  return (
    <>
      {/* Hidden discriminant field keeps the schema in sync */}
      <input type="hidden" {...form.register("method")} value={method} />

      <FormField
        control={form.control}
        name="identifier"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>
                {method === "email" && "Email"}
                {method === "username" && "Username"}
                {method === "phone" && "Phone Number"}
              </FormLabel>
              <SignIn.MethodSwitch />
            </div>
            <FormControl>
              {method === "email" ? (
                <Input
                  type="email"
                  placeholder="m@example.com"
                  disabled={isLoading}
                  {...field}
                />
              ) : method === "username" ? (
                <Input
                  type="text"
                  placeholder="johndoe"
                  autoComplete="username"
                  disabled={isLoading}
                  {...field}
                />
              ) : method === "phone" ? (
                <PhoneInput
                  value={field.value}
                  onChange={field.onChange}
                  defaultCountry="US"
                  disabled={isLoading}
                />
              ) : null}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

SignIn.PasswordField = function SignInPasswordField({
  forgotPasswordPath,
}: {
  forgotPasswordPath?: string
}) {
  const { form, isLoading } = useSignInContext()
  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel>Password</FormLabel>
            {forgotPasswordPath && (
              <a
                href={forgotPasswordPath}
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </a>
            )}
          </div>
          <FormControl>
            <Input type="password" disabled={isLoading} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

SignIn.RememberMe = function SignInRememberMe() {
  const { form, isLoading } = useSignInContext()
  return (
    <FormField
      control={form.control}
      name="remember"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isLoading}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="font-normal text-muted-foreground">
              Remember me
            </FormLabel>
          </div>
        </FormItem>
      )}
    />
  )
}

SignIn.SubmitButton = function SignInSubmitButton({
  children,
}: {
  children?: React.ReactNode
}) {
  const { isLoading } = useSignInContext()
  return (
    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children || (isLoading ? "Signing in..." : "Sign In")}
    </Button>
  )
}

SignIn.Separator = function SignInSeparator({
  children = "Or continue with",
}: {
  children?: React.ReactNode
}) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <Separator />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-card px-2 text-muted-foreground">{children}</span>
      </div>
    </div>
  )
}

SignIn.Footer = function SignInFooter({
  signupPath,
  children,
}: {
  signupPath?: string
  children?: React.ReactNode
}) {
  if (!signupPath && !children) return null
  return (
    <CardFooter className="flex flex-col">
      {children}
      {signupPath && (
        <div className="mt-2 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a
            href={signupPath}
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </a>
        </div>
      )}
    </CardFooter>
  )
}

SignIn.MagicLinkButton = function SignInMagicLinkButton(
  props: React.ComponentProps<typeof MagicLinkButton>
) {
  const { method, isLoading } = useSignInContext()
  return (
    <MagicLinkButton
      {...props}
      isLoading={props.isLoading ?? isLoading}
      disabled={method !== "email" || props.disabled}
    />
  )
}

SignIn.PasskeyButton = function SignInPasskeyButton(
  props: React.ComponentProps<typeof PasskeyButton>
) {
  const { isLoading } = useSignInContext()
  return <PasskeyButton {...props} isLoading={props.isLoading ?? isLoading} />
}

SignIn.SocialProviderButton = function SignInSocialProviderButton(
  props: React.ComponentProps<typeof SocialProviderButton>
) {
  const { isLoading } = useSignInContext()
  return (
    <SocialProviderButton {...props} isLoading={props.isLoading ?? isLoading} />
  )
}

export interface SignInPasswordlessProps {
  magicLink?: boolean
  passkey?: boolean
  showSeparator?: boolean
  separatorText?: React.ReactNode
}

SignIn.Passwordless = function SignInPasswordless({
  magicLink = true,
  passkey = true,
  showSeparator = true,
  separatorText = "Or continue with",
}: SignInPasswordlessProps) {
  if (!magicLink && !passkey) return null
  return (
    <>
      {showSeparator && <SignIn.Separator>{separatorText}</SignIn.Separator>}
      <div className="mb-4 flex flex-col gap-2">
        {magicLink && <SignIn.MagicLinkButton />}
        {passkey && <SignIn.PasskeyButton />}
      </div>
    </>
  )
}

export interface SocialProviderConfig {
  id: string
  label: string
  icon?: React.ReactNode
  onClick?: (id: string) => void
}

export interface SignInSocialProps {
  providers: SocialProviderConfig[]
  showSeparator?: boolean
  separatorText?: React.ReactNode
}

SignIn.Social = function SignInSocial({
  providers,
  showSeparator = true,
  separatorText = "Or continue with",
}: SignInSocialProps) {
  if (!providers || providers.length === 0) return null
  return (
    <>
      {showSeparator && <SignIn.Separator>{separatorText}</SignIn.Separator>}
      <div className="mb-4 grid grid-cols-2 gap-2">
        {providers.map((provider) => (
          <SignIn.SocialProviderButton
            key={provider.id}
            icon={provider.icon}
            label={provider.label}
            onClick={() => provider.onClick?.(provider.id)}
          />
        ))}
      </div>
    </>
  )
}

export function SigninDisabledView() {
  return (
    <div className="w-full">
      <AlertCard
        variant="warning"
        title="Sign In Disabled"
        description="No authentication methods are currently available. Please contact your system administrator to enable access."
        footer={
          <Button asChild className="w-full">
            <a href="/">Back Home</a>
          </Button>
        }
      />
    </div>
  )
}
