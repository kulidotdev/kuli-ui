import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared"
import Image from "next/image"
import { appName, gitConfig } from "./shared"

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2 font-bold tracking-tight">
          <Image
            src="/logo_32x32.png"
            alt="kuli/ui logo"
            width={24}
            height={24}
            className="rounded-sm"
          />
          {appName}
        </span>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  }
}

export const homeNavLinks: LinkItemType[] = [
  {
    text: "Home",
    url: "/",
    active: "url",
  },
  {
    text: "Docs",
    url: "/docs",
    active: "url",
  },
  {
    text: "Components",
    url: "/docs/components/auth/auth-signin",
    active: "nested-url",
  },
]
