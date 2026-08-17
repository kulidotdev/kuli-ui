
import { AlertCircle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "./alert"

/**
 * Props for the AlertError component.
 */
export interface AlertErrorProps {
  /**
   * The error message to display.
   */
  message: string
  /**
   * Optional error code to display as the title.
   */
  code?: string
  /**
   * Optional CSS class name for styling the alert container.
   */
  className?: string
}

/**
 * AlertError displays a destructive alert with an error message and an optional error code.
 * Useful for displaying form submission errors or system alerts.
 */
export function AlertError({ message, code, className }: AlertErrorProps) {
  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      {code && <AlertTitle>{code}</AlertTitle>}
      <AlertDescription className="break-words">{message}</AlertDescription>
    </Alert>
  )
}
