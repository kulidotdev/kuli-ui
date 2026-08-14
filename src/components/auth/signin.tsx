"use client"

import * as React from "react"
import { z } from "zod"
import { useForm, type Control } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"

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
  signinEmailSchema,
  signinUsernameSchema,
  signinPhoneSchema,
  SIGNIN_METHOD_LABELS,
  type SigninFormValues,
  type SigninMethod,
} from "./signin-types"

// Re-export for consumers
export type { SigninFormValues, SigninMethod }
export { SIGNIN_METHOD_LABELS }
export { signinEmailSchema as signinSchema }

// Base shape used internally for useForm — avoids discriminated-union
// assignability issues with react-hook-form's Control generic.
const baseSchema = z.object({
  method: z.enum(["email", "username", "phone"]),
  identifier: z.string().min(1),
  password: z.string().min(1),
  remember: z.boolean().default(false).optional(),
})
type BaseFormValues = z.infer<typeof baseSchema>

const schemaFor = {
  email: signinEmailSchema,
  username: signinUsernameSchema,
  phone: signinPhoneSchema,
} as const

// ─── Shared field props ───────────────────────────────────────────────────────

interface IdentifierFieldProps {
  // ponytail: using `any` here is intentional — these components are always
  // rendered inside a SigninForm that owns the correctly-typed Control.
  // Narrowing to a specific form shape here would just create extra ceremony.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>
  disabled?: boolean
  labelSuffix?: React.ReactNode
}

// ─── Email ────────────────────────────────────────────────────────────────────

function EmailInputField({
  control,
  disabled,
  labelSuffix,
}: IdentifierFieldProps) {
  return (
    <FormField
      control={control}
      name="identifier"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel>Email</FormLabel>
            {labelSuffix}
          </div>
          <FormControl>
            <Input
              type="email"
              placeholder="m@example.com"
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

// ─── Username ─────────────────────────────────────────────────────────────────

function UsernameInputField({
  control,
  disabled,
  labelSuffix,
}: IdentifierFieldProps) {
  return (
    <FormField
      control={control}
      name="identifier"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel>Username</FormLabel>
            {labelSuffix}
          </div>
          <FormControl>
            <Input
              type="text"
              placeholder="johndoe"
              autoComplete="username"
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

// ─── Phone ────────────────────────────────────────────────────────────────────

function PhoneInputField({
  control,
  disabled,
  labelSuffix,
}: IdentifierFieldProps) {
  return (
    <FormField
      control={control}
      name="identifier"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel>Phone Number</FormLabel>
            {labelSuffix}
          </div>
          <FormControl>
            <PhoneInput
              value={field.value}
              onChange={field.onChange}
              defaultCountry="US"
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export interface SigninFormProps {
  onSubmit?: (values: SigninFormValues) => void
  isLoading?: boolean
  apiError?: { message: string; code?: string } | null
  /** Methods shown in the switcher. Defaults to all three. */
  methods?: SigninMethod[]
  firstSlot?: React.ReactNode | ((method: SigninMethod) => React.ReactNode)
  secondSlot?: React.ReactNode | ((method: SigninMethod) => React.ReactNode)
  thirdSlot?: React.ReactNode | ((method: SigninMethod) => React.ReactNode)
  forgotPasswordPath?: string
  signupPath?: string
  footer?: boolean
}

export function SigninForm({
  onSubmit,
  isLoading,
  apiError,
  methods = ["email", "username", "phone"],
  firstSlot,
  secondSlot,
  thirdSlot,
  forgotPasswordPath,
  signupPath,
  footer = true,
}: SigninFormProps) {
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

  // When the user switches method, reset the form with the new discriminant.
  const handleMethodChange = React.useCallback((next: SigninMethod) => {
    setMethod(next)
    form.reset({ method: next, identifier: "", password: "", remember: false })
  }, [form])

  React.useEffect(() => {
    if (methods.length > 0 && !methods.includes(method)) {
      handleMethodChange(methods[0] as SigninMethod)
    }
  }, [methods, method, handleMethodChange])

  // Cast is safe: the resolver above ensures values conform to the method's schema.
  const handleSubmit = (values: BaseFormValues) =>
    onSubmit?.(values as SigninFormValues)

  // Radix Select — trigger shows "Switch?", placeholder shows active method label.
  const methodSelect =
    methods.length > 1 ? (
      <Select
        value={method}
        onValueChange={(v) => handleMethodChange(v as SigninMethod)}
        disabled={isLoading}
      >
        <SelectTrigger>Switch?</SelectTrigger>
        <SelectContent align="end" position="popper">
          {methods.map((m) => (
            <SelectItem key={m} value={m}>
              {SIGNIN_METHOD_LABELS[m]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ) : null

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Sign In
        </CardTitle>
        <CardDescription>
          Select your preferred authentication method
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

        {methods.length > 0 && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              method="post"
              className="space-y-4"
            >
              {/* Hidden discriminant field keeps the schema in sync */}
              <input
                type="hidden"
                {...form.register("method")}
                value={method}
              />

              {/* Identifier field — swaps based on selected method */}
              {method === "email" && (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <EmailInputField
                  control={form.control as any}
                  disabled={isLoading}
                  labelSuffix={methodSelect}
                />
              )}
              {method === "username" && (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <UsernameInputField
                  control={form.control as any}
                  disabled={isLoading}
                  labelSuffix={methodSelect}
                />
              )}
              {method === "phone" && (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <PhoneInputField
                  control={form.control as any}
                  disabled={isLoading}
                  labelSuffix={methodSelect}
                />
              )}

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

              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Remember me</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              {firstSlot && <div className="w-full">{typeof firstSlot === "function" ? firstSlot(method) : firstSlot}</div>}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
        )}

        {secondSlot && (
          <>
            {methods.length > 0 && (
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
            )}
            <div className="w-full space-y-2">{typeof secondSlot === "function" ? secondSlot(method) : secondSlot}</div>
          </>
        )}

        {thirdSlot && (
          <>
            {(methods.length > 0 || secondSlot) && (
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>
            )}
            <div className="w-full">{typeof thirdSlot === "function" ? thirdSlot(method) : thirdSlot}</div>
          </>
        )}
      </CardContent>
      {footer && (
        <CardFooter className="flex flex-col">
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
      )}
    </Card>
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
