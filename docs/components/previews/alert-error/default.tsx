import { AlertError } from "@kuli-ui/components/components/ui/alert-error"

export function AlertErrorDefault() {
  return (
    <div className="flex w-full justify-center p-4">
      <div className="w-full max-w-md">
        <AlertError message="Invalid email or password. Please try again." />
      </div>
    </div>
  )
}
