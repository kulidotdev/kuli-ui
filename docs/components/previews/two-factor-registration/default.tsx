'use client';

import { useState } from 'react';
import { TwoFactorRegistration } from '@kuli-ui/components/components/auth/two-factor-registration';

export function TwoFactorRegistrationDefault() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const handleEnable = async (password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      totpUri: 'otpauth://totp/Acme:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Acme',
      secret: 'JBSWY3DPEHPK3PXP',
      backupCodes: ['12345-67890', '09876-54321', '11111-22222', '33333-44444'],
    };
  };

  const handleVerifyOtp = async (otp: string, trustedDevice: boolean) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIs2FAEnabled(true);
  };

  const handleDisable = async (password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIs2FAEnabled(false);
  };

  return (
    <TwoFactorRegistration
      enabled={is2FAEnabled}
      onEnable={handleEnable}
      onVerifyOtp={handleVerifyOtp}
      onDisable={handleDisable}
    />
  );
}
