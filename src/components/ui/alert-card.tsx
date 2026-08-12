import * as React from "react";
import { ShieldAlert, Info, AlertTriangle, CheckCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "./card";

export type AlertVariant = "info" | "error" | "warning" | "success";

export interface AlertCardProps {
  variant?: AlertVariant;
  title: string;
  description: React.ReactNode;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
}

const variantStyles: Record<AlertVariant, {
  border: string;
  gradientBg: string;
  gradientTop: string;
  iconBg: string;
  iconRing: string;
  iconColor: string;
  DefaultIcon: React.ElementType;
}> = {
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
};

export function AlertCard({ variant = "info", title, description, icon, footer }: AlertCardProps) {
  const styles = variantStyles[variant];
  const IconComponent = styles.DefaultIcon;

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className={`w-full shadow-lg ${styles.border} bg-gradient-to-b ${styles.gradientBg} to-white dark:to-background overflow-hidden relative`}>
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${styles.gradientTop}`} />
        <CardHeader className="space-y-3 text-center pb-8 pt-8">
          <div className={`mx-auto w-12 h-12 ${styles.iconBg} rounded-full flex items-center justify-center mb-2 shadow-sm ring-4 ${styles.iconRing}`}>
            {icon ? icon : <IconComponent className={`w-6 h-6 ${styles.iconColor}`} />}
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
  );
}
