"use client"

import * as React from "react"
import {
  Storytelling,
  StorytellingContent,
  StorytellingProgress,
} from "@kuli-ui/components/components/ui/storytelling"
import {
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Terminal,
} from "lucide-react"

function Step1Narrative() {
  return (
    <div className="space-y-3">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
        <Layers className="h-3.5 w-3.5" />
        <span>Step 01 / Architecture</span>
      </div>
      <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
        Compound Architecture
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Deconstruct, reorder, or swap subcomponents with zero friction. Internal
        React context handles state coordination with zero prop-drilling.
      </p>
      <div className="space-y-1.5 pt-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-2 font-medium text-foreground">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          <span>Automatic context synchronization</span>
        </div>
        <div className="flex items-center gap-2 font-medium text-foreground">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          <span>Flexible JSX slot composition</span>
        </div>
      </div>
    </div>
  )
}

function Step1Preview() {
  return (
    <div className="w-full space-y-3 p-2">
      <div className="flex items-center justify-between border-b border-border/70 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            component.tsx
          </span>
        </div>
        <span className="rounded-md border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-500">
          Compound Slot
        </span>
      </div>
      <div className="rounded-xl border border-border/60 bg-muted/30 p-3 font-mono text-xs text-muted-foreground">
        <p className="text-blue-500 dark:text-blue-400">
          &lt;Storytelling stepCount={3}&gt;
        </p>
        <p className="pl-4 text-foreground">
          &lt;StorytellingContent steps=&#123;steps&#125; /&gt;
        </p>
        <p className="pl-4 text-muted-foreground">
          &lt;StorytellingProgress /&gt;
        </p>
        <p className="text-blue-500 dark:text-blue-400">
          &lt;/Storytelling&gt;
        </p>
      </div>
    </div>
  )
}

function Step2Narrative() {
  return (
    <div className="space-y-3">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
        <Sparkles className="h-3.5 w-3.5" />
        <span>Step 02 / Motion</span>
      </div>
      <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
        Scroll-Driven Parallax
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Hardware-accelerated Framer Motion transitions synchronize seamlessly
        with the user&apos;s viewport scroll on desktop while stacking naturally
        on mobile.
      </p>
      <div className="space-y-1.5 pt-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-2 font-medium text-foreground">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          <span>Sticky viewport runway calculation</span>
        </div>
        <div className="flex items-center gap-2 font-medium text-foreground">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          <span>Mobile-responsive vertical stack fallback</span>
        </div>
      </div>
    </div>
  )
}

function Step2Preview() {
  return (
    <div className="w-full space-y-3 p-2">
      <div className="flex items-center justify-between border-b border-border/70 pb-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 animate-pulse rounded-full bg-amber-500" />
          <span className="text-xs font-bold text-foreground">
            Motion Engine
          </span>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">
          useScroll()
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-border/60 bg-muted/30 p-3">
          <span className="text-[10px] text-muted-foreground uppercase">
            Desktop
          </span>
          <p className="mt-1 text-xs font-semibold text-foreground">
            Sticky Parallax
          </p>
        </div>
        <div className="rounded-xl border border-border/60 bg-muted/30 p-3">
          <span className="text-[10px] text-muted-foreground uppercase">
            Mobile
          </span>
          <p className="mt-1 text-xs font-semibold text-foreground">
            Linear Flow
          </p>
        </div>
      </div>
    </div>
  )
}

function Step3Narrative() {
  return (
    <div className="space-y-3">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
        <ShieldCheck className="h-3.5 w-3.5" />
        <span>Step 03 / Delivery</span>
      </div>
      <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
        Zero Vendor Lock-in
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Installed directly into your repository via shadcn CLI. You own 100% of
        the code, types, and styling.
      </p>
      <div className="space-y-1.5 pt-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-2 font-medium text-foreground">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          <span>Pure TypeScript + Tailwind CSS</span>
        </div>
        <div className="flex items-center gap-2 font-medium text-foreground">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          <span>Fully customizable markup &amp; styles</span>
        </div>
      </div>
    </div>
  )
}

function Step3Preview() {
  return (
    <div className="w-full space-y-3 p-2">
      <div className="flex items-center justify-between border-b border-border/70 pb-2">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-emerald-500" />
          <span className="text-xs font-bold text-foreground">
            Installation
          </span>
        </div>
        <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
          CLI Ready
        </span>
      </div>
      <div className="rounded-xl border border-border/60 bg-muted/40 p-2.5 font-mono text-xs text-foreground">
        pnpm dlx shadcn@latest add REGISTRY_URL/storytelling
      </div>
    </div>
  )
}

export function StorytellingDefault() {
  return (
    <div className="w-full max-w-3xl">
      <Storytelling stepCount={3} scrollPerStep={1.1}>
        <StorytellingContent
          steps={[
            {
              narrative: <Step1Narrative />,
              preview: <Step1Preview />,
            },
            {
              narrative: <Step2Narrative />,
              preview: <Step2Preview />,
            },
            {
              narrative: <Step3Narrative />,
              preview: <Step3Preview />,
            },
          ]}
        />
        <StorytellingProgress label="Scroll to navigate" />
      </Storytelling>
    </div>
  )
}
