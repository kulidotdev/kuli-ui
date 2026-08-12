import { useState } from "react"
import { motion } from "motion/react"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { OrganizationSwitcher } from "@/components/dashboard/organization-switcher"
import { NavUser } from "@/components/dashboard/nav-user"
import { NavHeader } from "@/components/dashboard/nav-header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
} from "lucide-react"

const mockData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  organizations: [
    {
      name: "Acme Inc",
      logo: <GalleryVerticalEndIcon />,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: <AudioLinesIcon />,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: <TerminalIcon />,
      plan: "Free",
    },
  ],
}

export function DashboardShowcase() {
  const [showHeader, setShowHeader] = useState(true)
  const [showFooter, setShowFooter] = useState(true)

  return (
    <section id="dashboard-showcase" className="relative z-10 py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-3xl font-extrabold tracking-tight text-transparent drop-shadow-[0_0_10px_rgba(var(--primary),0.5)] sm:text-4xl">
            Dashboard Component
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-light text-muted-foreground">
            A flexible sidebar layout. Toggle header and footer slots.
          </p>
        </motion.div>

        <div className="relative flex flex-col items-start gap-12 lg:flex-row">
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/3"
          >
            <Card className="relative overflow-hidden rounded-2xl border-primary/20 bg-background/40 p-6 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-xl">
              <h3 className="mb-4 text-lg font-semibold">Sidebar Options</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-header"
                    checked={showHeader}
                    onCheckedChange={(c) => setShowHeader(!!c)}
                  />
                  <Label htmlFor="show-header">
                    Show Header Slot (Org Switcher)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-footer"
                    checked={showFooter}
                    onCheckedChange={(c) => setShowFooter(!!c)}
                  />
                  <Label htmlFor="show-footer">
                    Show Footer Slot (Nav User)
                  </Label>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Display */}
          <div className="relative flex w-full items-center justify-center lg:w-2/3">
            <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-primary/10 blur-[80px]"></div>

            {/* Browser Window Wrapper */}
            <div className="relative z-10 flex h-[700px] w-full flex-col overflow-hidden rounded-xl border bg-background text-foreground shadow-2xl">
              {/* Browser Header */}
              <div className="flex h-10 w-full items-center gap-2 border-b bg-muted/30 px-4">
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-red-500/90" />
                  <div className="size-3 rounded-full bg-yellow-500/90" />
                  <div className="size-3 rounded-full bg-green-500/90" />
                </div>
                <div className="mx-auto flex h-6 w-full max-w-sm items-center justify-center rounded-md bg-background/50 px-3 text-xs text-muted-foreground shadow-sm">
                  acme.inc/dashboard
                </div>
              </div>

              {/* Showcase Content */}
              <div
                className="relative flex-1 overflow-hidden"
                style={{ transform: "translateZ(0)" }} // Creates a containing block for `fixed` elements below the header
              >
                <SidebarProvider className="h-full !min-h-full w-full">
                  <AppSidebar
                    className="!h-full"
                    headerSlot={
                      showHeader ? (
                        <OrganizationSwitcher
                          organizations={mockData.organizations}
                        />
                      ) : null
                    }
                    footerSlot={
                      showFooter ? <NavUser user={mockData.user} /> : null
                    }
                  />
                  <SidebarInset className="flex-1 overflow-y-auto">
                    <NavHeader
                      breadcrumbs={[
                        { title: "Building Your Application", url: "#" },
                        { title: "Data Fetching" },
                      ]}
                    />
                    <div className="mt-4 flex flex-1 flex-col gap-4 p-4 pt-0">
                      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="aspect-video rounded-xl bg-muted/50" />
                        <div className="aspect-video rounded-xl bg-muted/50" />
                        <div className="aspect-video rounded-xl bg-muted/50" />
                      </div>
                      <div className="min-h-[800px] flex-1 rounded-xl bg-muted/50" />
                    </div>
                  </SidebarInset>
                </SidebarProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
