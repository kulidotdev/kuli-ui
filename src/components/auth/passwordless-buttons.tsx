import * as React from "react"
import { Button } from "../ui/button"
import { KeyRound, Mail, Hash, Loader2 } from "lucide-react"

/**
 * Props for passwordless authentication buttons.
 */
export interface PasswordlessButtonProps {
  /**
   * The text label displayed on the button.
   */
  label?: string
  /**
   * Whether the button is in a loading state.
   */
  isLoading?: boolean
}

export function PasskeyButton({
  label = "Continue with Passkey",
  isLoading,
  ...props
}: PasswordlessButtonProps &
  Omit<React.ComponentProps<typeof Button>, "children">) {
  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <KeyRound className="h-4 w-4" />
      )}
      {label}
    </Button>
  )
}

export function MagicLinkButton({
  label = "Continue with Magic Link",
  isLoading,
  ...props
}: PasswordlessButtonProps &
  Omit<React.ComponentProps<typeof Button>, "children">) {
  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Mail className="h-4 w-4" />
      )}
      {label}
    </Button>
  )
}

export function EmailCodeButton({
  label = "Continue with Email Code",
  isLoading,
  ...props
}: PasswordlessButtonProps &
  Omit<React.ComponentProps<typeof Button>, "children">) {
  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Hash className="h-4 w-4" />
      )}
      {label}
    </Button>
  )
}

/**
 * Props for social provider authentication buttons.
 */
export interface SocialProviderButtonProps {
  /**
   * The icon component to display next to the label.
   */
  icon?: React.ReactNode
  /**
   * The text label displayed on the button.
   */
  label: string
  /**
   * Whether the button is in a loading state.
   */
  isLoading?: boolean
}

export function SocialProviderButton({
  icon,
  label,
  isLoading,
  ...props
}: SocialProviderButtonProps &
  Omit<React.ComponentProps<typeof Button>, "children">) {
  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        icon && <span>{icon}</span>
      )}
      {label}
    </Button>
  )
}
