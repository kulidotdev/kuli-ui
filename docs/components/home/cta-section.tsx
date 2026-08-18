"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Terminal } from "lucide-react"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { gitConfig, registryUrl } from "@/lib/shared"
import { CopyButton } from "./copy-button"
import { AnimatedGradientText } from "@kuli-ui/components/components/ui/animated-gradient-text"

const quickCmd = `pnpm dlx shadcn@latest add ${registryUrl}/auth-signin`

export function CtaSection() {
  return (
    <section className="border-fd-border/70 relative min-h-[820px] w-full border-t py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="border-fd-border/80 from-fd-card to-fd-muted/30 relative overflow-hidden rounded-3xl border bg-gradient-to-b p-8 text-center shadow-2xl backdrop-blur-xl sm:p-14">
          {/* Ambient Glow Orbs */}
          <div className="pointer-events-none absolute -top-20 -left-20 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-cyan-500/20 blur-3xl" />

          {/* Badge */}
          <div className="border-fd-primary/20 bg-fd-primary/10 text-fd-primary inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <AnimatedGradientText>Start Building Today</AnimatedGradientText>
          </div>

          <h2 className="text-fd-foreground mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Elevate your product with pre-designed UI flows
          </h2>

          <p className="text-fd-muted-foreground mx-auto mt-4 max-w-xl text-base">
            Save weeks of engineering time designing complex form states,
            multi-step validations, and error recovery. Copy-paste what you need
            into your project and own your code.
          </p>

          {/* CLI box */}
          <div className="border-fd-border bg-fd-background/90 mx-auto mt-8 flex max-w-lg items-center justify-between rounded-xl border p-3 shadow-inner">
            <div className="text-fd-foreground flex min-w-0 flex-1 items-center gap-2 font-mono text-xs">
              <Terminal className="text-fd-primary h-3.5 w-3.5 shrink-0" />
              <span className="[scrollbar-width:none] overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden">
                {quickCmd}
              </span>
            </div>
            <div className="ml-2 shrink-0">
              <CopyButton text={quickCmd} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs"
              className="bg-fd-primary text-fd-primary-foreground hover:shadow-fd-primary/20 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-md transition-all hover:opacity-95 hover:shadow-lg active:scale-[0.98]"
            >
              <span>Read the Documentation</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
              target="_blank"
              rel="noreferrer"
              className="border-fd-border/80 bg-fd-card/80 text-fd-foreground hover:border-fd-primary/40 hover:bg-fd-muted inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold backdrop-blur-md transition-all active:scale-[0.98]"
            >
              <SiGithub className="h-4 w-4" />
              <span>Star on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
