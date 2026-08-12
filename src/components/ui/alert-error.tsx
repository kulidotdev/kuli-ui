
import { AlertCircle } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "./alert"

export interface AlertErrorProps {
  message: string
  code?: string
  className?: string
}

export function AlertError({ message, code, className }: AlertErrorProps) {
  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      {code && <AlertTitle>{code}</AlertTitle>}
      <AlertDescription className="break-words">{message}</AlertDescription>
    </Alert>
  )
}
