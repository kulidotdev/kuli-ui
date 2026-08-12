import * as React from "react";
import { Button } from "@/components/ui/button";
import { KeyRound, Mail, Hash } from "lucide-react";

interface PasswordlessButtonProps extends Omit<React.ComponentProps<typeof Button>, 'children'> {
  label?: string;
}

export function PasskeyButton({ label = "Continue with Passkey", ...props }: PasswordlessButtonProps) {
  return (
    <Button variant="outline" type="button" {...props}>
      <KeyRound className="h-4 w-4 mr-2" />
      {label}
    </Button>
  );
}

export function MagicLinkButton({ label = "Continue with Magic Link", ...props }: PasswordlessButtonProps) {
  return (
    <Button variant="outline" type="button" {...props}>
      <Mail className="h-4 w-4 mr-2" />
      {label}
    </Button>
  );
}

export function EmailCodeButton({ label = "Continue with Email Code", ...props }: PasswordlessButtonProps) {
  return (
    <Button variant="outline" type="button" {...props}>
      <Hash className="h-4 w-4 mr-2" />
      {label}
    </Button>
  );
}

interface SocialProviderButtonProps extends Omit<React.ComponentProps<typeof Button>, 'children'> {
  icon?: React.ReactNode;
  label: string;
}

export function SocialProviderButton({ icon, label, ...props }: SocialProviderButtonProps) {
  return (
    <Button variant="outline" type="button" {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </Button>
  );
}

