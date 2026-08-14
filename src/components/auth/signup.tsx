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

export interface SignupFormProps {
  onSubmit?: (values: SignupFormValues) => void;
  isLoading?: boolean;
  apiError?: { message: string; code?: string } | null;
  showUsername?: boolean;
  showPhone?: boolean;
  firstSlot?: React.ReactNode;
  secondSlot?: React.ReactNode;
}

export function SignupForm({
  onSubmit,
  isLoading,
  apiError,
  showUsername,
  showPhone,
  firstSlot,
  secondSlot,
}: SignupFormProps) {
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

  const handleSubmit = (values: SignupFormValues) => onSubmit?.(values);

  return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Sign Up
          </CardTitle>
          <CardDescription>
            Create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          {apiError && <AlertError message={apiError.message} code={apiError.code} className="mb-4" />}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} method="post" className="space-y-4">
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

              {showUsername && (
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
              )}

              {showPhone && (
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
              )}

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

              {firstSlot && <div className="w-full">{firstSlot}</div>}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Signing up..." : "Create account"}
              </Button>
            </form>
          </Form>

          {secondSlot && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><Separator /></div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <div className="w-full space-y-2">{secondSlot}</div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground mt-2">
            Already have an account?{" "}
            <a href="/sign-in" className="font-medium text-primary hover:underline">
              Sign in
            </a>
          </div>
        </CardFooter>
      </Card>
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
