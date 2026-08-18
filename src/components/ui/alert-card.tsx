import * as React from "react"
import { ShieldAlert, Info, AlertTriangle, CheckCircle } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./card"

/**
 * Represents the available visual variants for the alert card.
 * Controls the color scheme, gradient, and default icon.
 */
export type AlertVariant = "info" | "error" | "warning" | "success"

/**
 * Props for the AlertCard component.
 */
export interface AlertCardProps {
  /**
   * The visual variant of the alert.
   * @default "info"
   */
  variant?: AlertVariant
  /**
   * The main title text of the alert.
   */
  title: string
  /**
   * The detailed description or message of the alert.
   */
  description: React.ReactNode
  /**
   * Optional custom icon to replace the default variant icon.
   */
  icon?: React.ReactNode
  /**
   * Optional footer content, typically used for action buttons.
   */
  footer?: React.ReactNode
}

const variantStyles: Record<
  AlertVariant,
  {
    border: string
    gradientBg: string
    gradientTop: string
    iconBg: string
    iconRing: string
    iconColor: string
    DefaultIcon: React.ElementType
  }
> = {
  info: {
    border: "border-blue-500/20",
    gradientBg: "from-blue-50/50 dark:from-blue-950/20",
    gradientTop: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconRing: "ring-blue-50 dark:ring-blue-950/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    DefaultIcon: Info,
  },
  error: {
    border: "border-red-500/20",
    gradientBg: "from-red-50/50 dark:from-red-950/20",
    gradientTop: "from-red-500 to-orange-500",
    iconBg: "bg-red-100 dark:bg-red-900/30",
    iconRing: "ring-red-50 dark:ring-red-950/50",
    iconColor: "text-red-600 dark:text-red-400",
    DefaultIcon: ShieldAlert,
  },
  warning: {
    border: "border-yellow-500/20",
    gradientBg: "from-yellow-50/50 dark:from-yellow-950/20",
    gradientTop: "from-yellow-500 to-orange-500",
    iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
    iconRing: "ring-yellow-50 dark:ring-yellow-950/50",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    DefaultIcon: AlertTriangle,
  },
  success: {
    border: "border-green-500/20",
    gradientBg: "from-green-50/50 dark:from-green-950/20",
    gradientTop: "from-green-500 to-emerald-500",
    iconBg: "bg-green-100 dark:bg-green-900/30",
    iconRing: "ring-green-50 dark:ring-green-950/50",
    iconColor: "text-green-600 dark:text-green-400",
    DefaultIcon: CheckCircle,
  },
}

/**
 * AlertCard displays a prominent message card with an icon, title, description, and optional footer actions.
 * It's suitable for important notifications, error messages, or success states.
 */
export function AlertCard({
  variant = "info",
  title,
  description,
  icon,
  footer,
}: AlertCardProps) {
  const styles = variantStyles[variant]
  const IconComponent = styles.DefaultIcon

  return (
    <div className="mx-auto w-full max-w-md">
      <Card
        className={`w-full shadow-lg ${styles.border} bg-gradient-to-b ${styles.gradientBg} relative overflow-hidden to-white dark:to-background`}
      >
        <div
          className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${styles.gradientTop}`}
        />
        <CardHeader className="space-y-3 pt-8 pb-8 text-center">
          <div
            className={`mx-auto h-12 w-12 ${styles.iconBg} mb-2 flex items-center justify-center rounded-full shadow-sm ring-4 ${styles.iconRing}`}
          >
            {icon ? (
              icon
            ) : (
              <IconComponent className={`h-6 w-6 ${styles.iconColor}`} />
            )}
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            {title}
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>
        {footer && (
          <CardFooter className="flex flex-col space-y-4 pb-8">
            {footer}
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
