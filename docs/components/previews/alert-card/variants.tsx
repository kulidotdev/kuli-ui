import { AlertCard } from "@kuli-ui/components/components/ui/alert-card"

export function AlertCardVariants() {
  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <AlertCard 
        variant="info"
        title="Information" 
        description="This is an informational alert card to notify you about something."
      />
      <AlertCard 
        variant="success"
        title="Success" 
        description="Your operation was completed successfully without errors."
      />
      <AlertCard 
        variant="warning"
        title="Warning" 
        description="Please be careful, this action might have consequences."
      />
      <AlertCard 
        variant="error"
        title="Error" 
        description="An unexpected error occurred while processing your request."
      />
    </div>
  )
}
