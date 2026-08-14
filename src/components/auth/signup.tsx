"use client"

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { AlertError } from "@/components/ui/alert-error";
import { AlertCard } from "../ui/alert-card";
import {
  signupSchema,
  type SignupFormValues,
} from "./signup-types";

export type { SignupFormValues };
export { signupSchema };

import { SignUpContext, useSignUpContext, type SignUpContextValue } from "@/hooks/use-signup";

// --- Provider ---
export interface SignUpProps {
  onSubmit: (values: SignupFormValues) => void;
  isLoading?: boolean;
  apiError?: { message: string; code?: string } | null;
  showUsername?: boolean;
  showPhone?: boolean;
  children: React.ReactNode;
}

export function SignUp({
  onSubmit,
  isLoading = false,
  apiError = null,
  showUsername = false,
  showPhone = false,
  children,
}: SignUpProps) {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      username: "",
      phone: "",
    },
  });

  const contextValue: SignUpContextValue = {
    form,
    isLoading,
    apiError,
    showUsername,
    showPhone,
    onSubmit,
  };

  return (
    <SignUpContext.Provider value={contextValue}>
      <Card className="w-full max-w-md mx-auto">
        {children}
      </Card>
    </SignUpContext.Provider>
  );
}

// --- Compound Components ---

SignUp.Header = function SignUpHeader({ title = "Sign Up", description = "Create an account to get started" }: { title?: React.ReactNode, description?: React.ReactNode }) {
  return (
    <CardHeader className="space-y-1 text-center">
      <CardTitle className="text-2xl font-bold tracking-tight">
        {title}
      </CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
  );
}

SignUp.Content = function SignUpContent({ children }: { children: React.ReactNode }) {
  const { apiError } = useSignUpContext();
  return (
    <CardContent>
      {apiError && <AlertError message={apiError.message} code={apiError.code} className="mb-4" />}
      {children}
    </CardContent>
  );
}

SignUp.Form = function SignUpForm({ children }: { children: React.ReactNode }) {
  const { form, onSubmit } = useSignUpContext();

  const handleSubmit = (values: SignupFormValues) => onSubmit(values);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} method="post" className="space-y-4">
        {children}
      </form>
    </Form>
  );
}

SignUp.NameField = function SignUpNameField() {
  const { form, isLoading } = useSignUpContext();
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="John Doe" disabled={isLoading} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

SignUp.EmailField = function SignUpEmailField() {
  const { form, isLoading } = useSignUpContext();
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="m@example.com" type="email" disabled={isLoading} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

SignUp.UsernameField = function SignUpUsernameField() {
  const { form, isLoading, showUsername } = useSignUpContext();
  if (!showUsername) return null;
  return (
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="johndoe123" disabled={isLoading} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

SignUp.PhoneField = function SignUpPhoneField() {
  const { form, isLoading, showPhone } = useSignUpContext();
  if (!showPhone) return null;
  return (
    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Phone Number</FormLabel>
          <FormControl>
            <PhoneInput
              value={field.value}
              onChange={field.onChange}
              defaultCountry="US"
              disabled={isLoading}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

SignUp.PasswordField = function SignUpPasswordField() {
  const { form, isLoading } = useSignUpContext();
  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" disabled={isLoading} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

SignUp.SubmitButton = function SignUpSubmitButton({ children }: { children?: React.ReactNode }) {
  const { isLoading } = useSignUpContext();
  return (
    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children || (isLoading ? "Signing up..." : "Create account")}
    </Button>
  );
}

SignUp.Separator = function SignUpSeparator({ children = "Or continue with" }: { children?: React.ReactNode }) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center"><Separator /></div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-card px-2 text-muted-foreground">{children}</span>
      </div>
    </div>
  );
}

SignUp.Footer = function SignUpFooter({ signinPath, children }: { signinPath?: string, children?: React.ReactNode }) {
  if (!signinPath && !children) return null;
  return (
    <CardFooter className="flex flex-col space-y-4">
      {children}
      {signinPath && (
        <div className="text-center text-sm text-muted-foreground mt-2">
          Already have an account?{" "}
          <a href={signinPath} className="font-medium text-primary hover:underline">
            Sign in
          </a>
        </div>
      )}
    </CardFooter>
  );
}

export function SignupSuccessView({ redirectUrl }: { redirectUrl: string }) {
  return (
    <div className="w-full max-w-md mx-auto">
      <AlertCard
        variant="success"
        title="Registration Successful"
        description="Your account has been created successfully."
        footer={
          <Button asChild className="w-full">
            <a href={redirectUrl}>Continue</a>
          </Button>
        }
      />
    </div>
  );
}
