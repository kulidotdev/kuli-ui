import * as React from "react";
import { Button } from "@/components/ui/button";
import { KeyRound, Mail, Hash, Loader2 } from "lucide-react";

interface PasswordlessButtonProps extends Omit<React.ComponentProps<typeof Button>, 'children'> {
  label?: string;
  isLoading?: boolean;
}

export function PasskeyButton({ label = "Continue with Passkey", isLoading, ...props }: PasswordlessButtonProps) {
  return (
    <Button variant="outline" type="button" disabled={isLoading || props.disabled} {...props}>
      {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <KeyRound className="h-4 w-4 mr-2" />}
      {label}
    </Button>
  );
}

export function MagicLinkButton({ label = "Continue with Magic Link", isLoading, ...props }: PasswordlessButtonProps) {
  return (
    <Button variant="outline" type="button" disabled={isLoading || props.disabled} {...props}>
      {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Mail className="h-4 w-4 mr-2" />}
      {label}
    </Button>
  );
}

export function EmailCodeButton({ label = "Continue with Email Code", isLoading, ...props }: PasswordlessButtonProps) {
  return (
    <Button variant="outline" type="button" disabled={isLoading || props.disabled} {...props}>
      {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Hash className="h-4 w-4 mr-2" />}
      {label}
    </Button>
  );
}

interface SocialProviderButtonProps extends Omit<React.ComponentProps<typeof Button>, 'children'> {
  icon?: React.ReactNode;
  label: string;
  isLoading?: boolean;
}

export function SocialProviderButton({ icon, label, isLoading, ...props }: SocialProviderButtonProps) {
  return (
    <Button variant="outline" type="button" disabled={isLoading || props.disabled} {...props}>
      {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : (icon && <span className="mr-2">{icon}</span>)}
      {label}
    </Button>
  );
}

