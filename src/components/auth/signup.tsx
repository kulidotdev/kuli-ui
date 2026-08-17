"use client"

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PhoneInput } from "../ui/phone-input";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "../ui/form";
import { AlertError } from "../ui/alert-error";
import { AlertCard } from "../ui/alert-card";
import {
  signupSchema,
  type SignupFormValues,
} from "./signup-types";

export type { SignupFormValues };
export { signupSchema };

import { SignUpContext, useSignUpContext, type SignUpContextValue } from "../../hooks/use-signup";

// --- Provider ---

/**
 * Props for the SignUp component.
 */
export interface SignUpProps {
  /**
   * Callback for when the user successfully submits the registration form.
   */
  onSubmit: (values: SignupFormValues) => void;
  /**
   * Whether the component is currently in a loading state (e.g. submitting).
   */
  isLoading?: boolean;
  /**
   * An optional API error to display at the top of the form.
   */
  apiError?: { message: string; code?: string } | null;
  /**
   * Whether to display the username field.
   */
  showUsername?: boolean;
  /**
   * Whether to display the phone number field.
   */
  showPhone?: boolean;
  /**
   * The subcomponents to render within the sign up card.
   */
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

/**
 * Props for the SignUpHeader component.
 */
export interface SignUpHeaderProps {
  /**
   * The title of the card. Defaults to "Sign Up".
   */
  title?: React.ReactNode
  /**
   * The description of the card. Defaults to "Create an account to get started".
   */
  description?: React.ReactNode
}

SignUp.Header = function SignUpHeader({ title = "Sign Up", description = "Create an account to get started" }: SignUpHeaderProps) {
  return (
    <CardHeader className="space-y-1 text-center">
      <CardTitle className="text-2xl font-bold tracking-tight">
        {title}
      </CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
  );
}

/**
 * Props for the SignUpContent component.
 */
export interface SignUpContentProps {
  /**
   * Content to render inside the card body, typically the sign up form.
   */
  children: React.ReactNode
}

SignUp.Content = function SignUpContent({ children }: SignUpContentProps) {
  const { apiError } = useSignUpContext();
  return (
    <CardContent>
      {apiError && <AlertError message={apiError.message} code={apiError.code} className="mb-4" />}
      {children}
    </CardContent>
  );
}

/**
 * Props for the SignUpForm component.
 */
export interface SignUpFormProps {
  /**
   * Form fields for the sign up flow.
   */
  children: React.ReactNode
}

SignUp.Form = function SignUpForm({ children }: SignUpFormProps) {
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

/**
 * Props for the SignUpSubmitButton component.
 */
export interface SignUpSubmitButtonProps {
  /**
   * Custom label for the submit button. Defaults to "Create account".
   */
  children?: React.ReactNode
}

SignUp.SubmitButton = function SignUpSubmitButton({ children }: SignUpSubmitButtonProps) {
  const { isLoading } = useSignUpContext();
  return (
    <Button type="submit" className="w-full" disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children || (isLoading ? "Signing up..." : "Create account")}
    </Button>
  );
}

/**
 * Props for the SignUpSeparator component.
 */
export interface SignUpSeparatorProps {
  /**
   * Custom text for the separator. Defaults to "Or continue with".
   */
  children?: React.ReactNode
}

SignUp.Separator = function SignUpSeparator({ children = "Or continue with" }: SignUpSeparatorProps) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center"><Separator /></div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-card px-2 text-muted-foreground">{children}</span>
      </div>
    </div>
  );
}

/**
 * Props for the SignUpFooter component.
 */
export interface SignUpFooterProps {
  /**
   * An optional path to redirect to for sign in.
   * If provided, an "Already have an account? Sign in" link is displayed.
   */
  signinPath?: string
  /**
   * Custom content to display in the footer.
   */
  children?: React.ReactNode
}

SignUp.Footer = function SignUpFooter({ signinPath, children }: SignUpFooterProps) {
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

/**
 * Props for the SignupSuccessView component.
 */
export interface SignupSuccessViewProps {
  /**
   * The URL to navigate to when the user clicks the "Continue" button.
   */
  redirectUrl: string
}

export function SignupSuccessView({ redirectUrl }: SignupSuccessViewProps) {
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
