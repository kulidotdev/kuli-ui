import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  headerSlot?: React.ReactNode
  contentSlot?: React.ReactNode
  footerSlot?: React.ReactNode
}

export function AppSidebar({
  headerSlot,
  contentSlot,
  footerSlot,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{headerSlot}</SidebarHeader>
      <SidebarContent>{contentSlot}</SidebarContent>
      <SidebarFooter>{footerSlot}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
