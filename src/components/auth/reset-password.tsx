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

export interface ResetPasswordFormProps {
  method?: "email" | "phone"
  onSubmitEmail?: (values: ResetPasswordEmailValues) => Promise<void>
  onSubmitPhone?: (values: ResetPasswordPhoneValues) => Promise<void>
  isLoading: boolean
  apiError: { message: string; code?: string } | null
}

export function ResetPasswordForm({
  method = "email",
  onSubmitEmail,
  onSubmitPhone,
  isLoading,
  apiError,
}: ResetPasswordFormProps) {
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

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter your new password below.</CardDescription>
      </CardHeader>
      <CardContent>
        {apiError && (
          <AlertError
            message={apiError.message}
            code={apiError.code}
            className="mb-4"
          />
        )}

        {method === "email" ? (
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(onSubmitEmail!)}
              className="space-y-4"
            >
              <FormField
                control={emailForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="New Password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={emailForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm New Password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...phoneForm}>
            <form
              onSubmit={phoneForm.handleSubmit(onSubmitPhone!)}
              className="space-y-4"
            >
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

              <FormField
                control={phoneForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        id="new-password-phone"
                        type="password"
                        placeholder=""
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={phoneForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        id="confirm-password-phone"
                        type="password"
                        placeholder=""
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}

export function ResetPasswordSuccessView({
  redirectTo,
}: {
  redirectTo: string
}) {
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
