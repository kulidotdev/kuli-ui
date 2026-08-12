import * as React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"

interface NavHeaderProps {
  breadcrumbs?: {
    title: string
    url?: string
  }[]
}

export function NavHeader({ breadcrumbs = [] }: NavHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-7"
        />
        {breadcrumbs.length > 0 && (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((breadcrumb, index) => (
                <React.Fragment key={breadcrumb.title}>
                  <BreadcrumbItem className={index < breadcrumbs.length - 1 ? "hidden md:block" : ""}>
                    {breadcrumb.url ? (
                      <BreadcrumbLink href={breadcrumb.url}>
                        {breadcrumb.title}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  
                  {index === breadcrumbs.length - 2 && (
                    <React.Fragment>
                      <BreadcrumbItem className="md:hidden">
                        <BreadcrumbEllipsis className="h-4 w-4" />
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="md:hidden" />
                    </React.Fragment>
                  )}

                  {index < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>
    </header>
  )
}
