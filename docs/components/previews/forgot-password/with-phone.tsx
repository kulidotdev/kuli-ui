'use client';

import { useState } from 'react';
import {
  ForgotPassword,
  ForgotPasswordSuccessView,
} from '@kuli-ui/components/components/auth/forgot-password';
import type {
  ForgotPasswordEmailValues,
  ForgotPasswordPhoneValues,
} from '@kuli-ui/components/components/auth/forgot-password-types';

export function ForgotPasswordWithPhone() {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [apiError, setApiError] = useState<{ message: string } | null>(null);

  const handleEmail = async (values: ForgotPasswordEmailValues) => {
    setIsLoading(true);
    setApiError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSent(true);
    } catch (err) {
      setApiError({ message: 'Failed to send reset link.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhone = async (values: ForgotPasswordPhoneValues) => {
    setIsLoading(true);
    setApiError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSent(true);
    } catch (err) {
      setApiError({ message: 'Failed to send OTP.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (sent) return <ForgotPasswordSuccessView backUrl="#" />;

  return (
    <ForgotPassword
      onSubmitEmail={handleEmail}
      onSubmitPhone={handlePhone}
      isLoading={isLoading}
      apiError={apiError}
      allowPhone
    >
      <ForgotPassword.Header />
      <ForgotPassword.Content>
        <ForgotPassword.Tabs>
          <ForgotPassword.EmailForm>
            <ForgotPassword.EmailField />
            <ForgotPassword.SubmitButton />
          </ForgotPassword.EmailForm>
          <ForgotPassword.PhoneForm>
            <ForgotPassword.PhoneField />
            <ForgotPassword.SubmitButton />
          </ForgotPassword.PhoneForm>
        </ForgotPassword.Tabs>
      </ForgotPassword.Content>
    </ForgotPassword>
  );
}
