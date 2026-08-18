import { HomeLayout } from "fumadocs-ui/layouts/home"
import { baseOptions, homeNavLinks } from "@/lib/layout.shared"

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <HomeLayout {...baseOptions()} links={homeNavLinks}>
      {children}
    </HomeLayout>
  )
}
