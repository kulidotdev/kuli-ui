import { AlertCard } from "@kuli-ui/components/components/ui/alert-card"

export function AlertCardDefault() {
  return (
    <div className="flex w-full justify-center p-4">
      <AlertCard 
        title="Update Available" 
        description="A new software update is available. Please update to continue using the app."
      />
    </div>
  )
}
