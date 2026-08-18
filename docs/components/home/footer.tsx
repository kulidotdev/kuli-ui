"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUp, ExternalLink, Heart, Sparkles } from "lucide-react"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { appName, gitConfig } from "@/lib/shared"

const docLinks = [
  { label: "Introduction", href: "/docs" },
  { label: "Installation", href: "/docs/getting-started/installation" },
  { label: "Usage Guide", href: "/docs/getting-started/usage" },
  { label: "LLM Context (llms.txt)", href: "/llms.txt" },
  { label: "Full LLM Context", href: "/llms-full.txt" },
]

const componentLinks = [
  { label: "Sign In", href: "/docs/components/auth-signin", badge: "Popular" },
  { label: "Sign Up", href: "/docs/components/auth-signup" },
  { label: "Forgot Password", href: "/docs/components/auth-forgot-password" },
  { label: "Reset Password", href: "/docs/components/auth-reset-password" },
  {
    label: "Two-Factor Authentication",
    href: "/docs/components/auth-two-factor",
  },
  {
    label: "2FA Registration",
    href: "/docs/components/auth-two-factor-registration",
  },
  {
    label: "Passkey Manager",
    href: "/docs/components/auth-passkey-manager",
    badge: "New",
  },
]

const communityLinks = [
  {
    label: "GitHub",
    href: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    external: true,
  },
  {
    label: "Issues & Bug Reports",
    href: `https://github.com/${gitConfig.user}/${gitConfig.repo}/issues`,
    external: true,
  },
  {
    label: "Discussions",
    href: `https://github.com/${gitConfig.user}/${gitConfig.repo}/discussions`,
    external: true,
  },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="border-fd-border/80 bg-fd-card/30 relative w-full border-t backdrop-blur-sm">
      {/* Subtle Ambient Background Gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/5 via-cyan-400/5 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand Column (takes 2 cols on lg) */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/logo_32x32.png"
                alt="kuli/ui logo"
                width={28}
                height={28}
                className="rounded-md shadow-xs"
              />
              <span className="text-fd-foreground text-lg font-bold tracking-tight">
                {appName}
              </span>
            </Link>

            <p className="text-fd-muted-foreground max-w-sm text-sm leading-relaxed">
              Production-ready UI components where the complete user flows,
              validation schemas, and state handling are pre-engineered. Built
              for modern React, Next.js, and shadcn/ui.
            </p>

            {/* Quick Badges / Actions */}
            <div className="mt-2 flex flex-wrap items-center gap-2.5">
              <a
                href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
                target="_blank"
                rel="noreferrer"
                className="border-fd-border/80 bg-fd-background/80 text-fd-foreground hover:border-fd-primary/40 hover:bg-fd-muted inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
                aria-label="Star kuli-ui on GitHub"
              >
                <SiGithub className="h-3.5 w-3.5" />
                <span>Star on GitHub</span>
              </a>

              <span className="border-fd-border/70 bg-fd-muted/50 text-fd-muted-foreground inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium">
                <Sparkles className="text-fd-primary h-3 w-3" />
                <span>MIT License</span>
              </span>
            </div>
          </div>

          {/* Documentation Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-fd-foreground text-xs font-semibold tracking-wider uppercase">
              Documentation
            </h3>
            <ul className="flex flex-col gap-2.5">
              {docLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-fd-muted-foreground hover:text-fd-foreground inline-flex items-center gap-1 text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Component Flows */}
          <div className="flex flex-col gap-3">
            <h3 className="text-fd-foreground text-xs font-semibold tracking-wider uppercase">
              Components
            </h3>
            <ul className="flex flex-col gap-2.5">
              {componentLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-fd-muted-foreground hover:text-fd-foreground group inline-flex items-center gap-1.5 text-sm transition-colors"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="border-fd-primary/20 bg-fd-primary/10 text-fd-primary py-0.2 rounded-md border px-1.5 text-[10px] leading-normal font-medium">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community & Ecosystem */}
          <div className="flex flex-col gap-3">
            <h3 className="text-fd-foreground text-xs font-semibold tracking-wider uppercase">
              Community
            </h3>
            <ul className="flex flex-col gap-2.5">
              {communityLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-fd-muted-foreground hover:text-fd-foreground group inline-flex items-center gap-1.5 text-sm transition-colors"
                  >
                    <span>{item.label}</span>
                    <ExternalLink className="text-fd-muted-foreground/60 group-hover:text-fd-foreground h-3 w-3 transition-colors" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="border-fd-border/70 text-fd-muted-foreground mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-xs sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-center sm:justify-start">
            <span>
              © {new Date().getFullYear()} {appName}.
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-1">
              Crafted with{" "}
              <Heart className="h-3 w-3 fill-rose-500 text-rose-500" /> by{" "}
              <a
                href="https://kuli.dev"
                target="_blank"
                rel="noreferrer"
                className="text-fd-foreground hover:text-fd-primary font-medium underline underline-offset-4 transition-colors"
              >
                kuli.dev
              </a>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-fd-muted-foreground/70 hidden text-xs sm:inline">
              React 19 · Tailwind CSS v4 · Fumadocs
            </span>
            <button
              onClick={scrollToTop}
              className="border-fd-border/80 bg-fd-background/80 text-fd-muted-foreground hover:border-fd-primary/40 hover:text-fd-foreground hover:bg-fd-muted inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all"
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
