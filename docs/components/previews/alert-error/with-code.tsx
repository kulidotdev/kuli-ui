import { AlertError } from "@kuli-ui/components/components/ui/alert-error"

export function AlertErrorWithCode() {
  return (
    <div className="flex w-full justify-center p-4">
      <div className="w-full max-w-md">
        <AlertError code="ERR_INVALID_AUTH" message="Invalid credentials provided. The access token might be expired." />
      </div>
    </div>
  )
}
