"use client"

import * as React from "react"
import {
  Storytelling,
  StorytellingHeader,
  StorytellingTabs,
  StorytellingGrid,
  StorytellingNarrative,
  StorytellingPreview,
  StorytellingProgress,
  useStorytelling,
} from "@kuli-ui/components/components/ui/storytelling"
import { Code2, Palette, Rocket, Check, Sparkles } from "lucide-react"

const tabItems = [
  { label: "1. Tokens", shortLabel: "1", icon: Palette },
  { label: "2. Logic", shortLabel: "2", icon: Code2 },
  { label: "3. Launch", shortLabel: "3", icon: Rocket },
]

function NarrativeContent() {
  const { activeStep } = useStorytelling()

  if (activeStep === 0) {
    return (
      <div className="space-y-3">
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Color &amp; Typography
        </span>
        <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
          Unified Design Tokens
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Define semantic colors and typography scales once. Your entire component tree
          responds dynamically to theme shifts and dark mode.
        </p>
      </div>
    )
  }

  if (activeStep === 1) {
    return (
      <div className="space-y-3">
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Headless Hooks
        </span>
        <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
          Decoupled State Logic
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Separate UI rendering from state machines. Easily swap backend providers or
          custom authentication adapters without rewriting views.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
        <Sparkles className="h-3.5 w-3.5" />
        Zero Configuration
      </span>
      <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
        Ready for Production
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Accessible, responsive, and rigorously tested components ready to drop into any
        Next.js, Vite, or Remix application.
      </p>
    </div>
  )
}

function PreviewContent() {
  const { activeStep } = useStorytelling()

  if (activeStep === 0) {
    return (
      <div className="space-y-3 p-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Token Palette</span>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-500">
            Active
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div className="h-10 rounded-lg bg-blue-500" />
          <div className="h-10 rounded-lg bg-emerald-500" />
          <div className="h-10 rounded-lg bg-amber-500" />
          <div className="h-10 rounded-lg bg-purple-500" />
        </div>
      </div>
    )
  }

  if (activeStep === 1) {
    return (
      <div className="space-y-2 p-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Hook State</span>
          <span className="font-mono text-[10px] text-muted-foreground">useStorytelling()</span>
        </div>
        <div className="rounded-lg border border-border/70 bg-muted/40 p-2.5 font-mono text-xs text-muted-foreground">
          <p className="text-foreground">const &#123; activeStep, scrollToStep &#125; = useStorytelling()</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2 p-2 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
        <Check className="h-5 w-5" />
      </div>
      <p className="text-xs font-semibold text-foreground">Production Verified</p>
      <p className="text-[11px] text-muted-foreground">Zero bundle bloat, copy-paste ready</p>
    </div>
  )
}

export function StorytellingWithTabs() {
  return (
    <div className="w-full max-w-3xl">
      <Storytelling stepCount={3} scrollPerStep={1.1}>
        <StorytellingHeader>
          <div>
            <h4 className="text-base font-bold text-foreground">Feature Walkthrough</h4>
            <p className="text-xs text-muted-foreground">Interactive tab &amp; scroll navigation</p>
          </div>
          <StorytellingTabs items={tabItems} />
        </StorytellingHeader>

        <StorytellingGrid>
          <StorytellingNarrative>
            <NarrativeContent />
          </StorytellingNarrative>

          <StorytellingPreview>
            <PreviewContent />
          </StorytellingPreview>
        </StorytellingGrid>

        <StorytellingProgress label="Scroll or click tabs" />
      </Storytelling>
    </div>
  )
}
