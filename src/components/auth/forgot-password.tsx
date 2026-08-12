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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
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

export interface ForgotPasswordFormProps {
  onSubmitEmail: (values: ForgotPasswordEmailValues) => Promise<void>
  onSubmitPhone?: (values: ForgotPasswordPhoneValues) => Promise<void>
  isLoading: boolean
  apiError: { message: string; code?: string } | null
  allowPhone?: boolean
  firstSlot?: React.ReactNode
}

export function ForgotPasswordForm({
  onSubmitEmail,
  onSubmitPhone,
  isLoading,
  apiError,
  allowPhone = false,
  firstSlot,
}: ForgotPasswordFormProps) {
  const [activeTab, setActiveTab] = React.useState<"email" | "phone">("email")

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

  const handleEmailSubmit = (values: ForgotPasswordEmailValues) => {
    onSubmitEmail(values)
  }

  const handlePhoneSubmit = (values: ForgotPasswordPhoneValues) => {
    if (onSubmitPhone) {
      onSubmitPhone(values)
    }
  }

  const renderEmailForm = () => (
    <Form {...emailForm}>
      <form
        onSubmit={emailForm.handleSubmit(handleEmailSubmit)}
        className="space-y-4"
      >
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
        {firstSlot}
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </Form>
  )

  const renderPhoneForm = () => (
    <Form {...phoneForm}>
      <form
        onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)}
        className="space-y-4"
      >
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
        {firstSlot}
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Sending..." : "Send OTP"}
        </Button>
      </form>
    </Form>
  )

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>
          {allowPhone
            ? activeTab === "email"
              ? "Enter your email to receive a password reset link."
              : "Enter your phone number to receive an OTP."
            : "Enter your email to receive a password reset link."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {apiError && (
          <AlertError message={apiError.message} code={apiError.code} />
        )}

        {allowPhone ? (
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as "email" | "phone")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="phone">Phone</TabsTrigger>
            </TabsList>
            <TabsContent value="email">{renderEmailForm()}</TabsContent>
            <TabsContent value="phone">{renderPhoneForm()}</TabsContent>
          </Tabs>
        ) : (
          renderEmailForm()
        )}
      </CardContent>
    </Card>
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
