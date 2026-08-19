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
  Terminal,
  Workflow,
  Boxes,
  FileCode2,
  CheckCircle2,
} from "lucide-react"
import { SiNextdotjs, SiSupabase } from "@icons-pack/react-simple-icons"
import { CopyButton } from "./copy-button"

import { AnimatedGradientText } from "@kuli-ui/components/components/ui/animated-gradient-text"
import { Highlighter } from "@kuli-ui/components/components/ui/highlighter"
import { previewRegistry as registry } from "@/components/previews/registry"
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock"

const installCmd = `pnpm dlx shadcn@latest add @kuli-ui/auth-signin`

// ---------------------------------------------------------------------------
// Step 1: Compound Component Architecture
// ---------------------------------------------------------------------------

function Step1Narrative() {
  return (
    <div className="flex flex-col gap-2">
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
        <Layers className="h-3.5 w-3.5" />
        <AnimatedGradientText colorFrom="#3b82f6" colorTo="#60a5fa">
          Compositional Freedom
        </AnimatedGradientText>
      </div>

      <h3 className="text-fd-foreground text-2xl font-bold tracking-tight sm:text-3xl">
        <Highlighter action="underline" color="#3b82f6" padding={2}>
          Compound Component Architecture
        </Highlighter>
      </h3>

      <p className="text-fd-muted-foreground text-sm leading-relaxed">
        Deconstruct, reorder, or swap sub-components with zero friction. Each
        piece subscribes to shared component flow state via internal React
        context with no prop-drilling.
      </p>

      <div className="space-y-2 pt-1 font-mono text-xs">
        <div className="text-fd-foreground flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          <span>
            &lt;SignIn.Header&gt;, &lt;SignIn.Form&gt;, &lt;SignIn.Social&gt;
          </span>
        </div>
        <div className="text-fd-foreground flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          <span>Sub-components communicate automatically</span>
        </div>
        <div className="text-fd-foreground flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          <span>Swap, omit, or wrap elements anywhere in JSX</span>
        </div>
      </div>
    </div>
  )
}

function Step1Preview({ codeSnippet }: { codeSnippet: string }) {
  return (
    <div className="w-full space-y-2.5">
      {/* Code Editor Header */}
      <div className="border-fd-border/70 flex items-center justify-between border-b pb-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-fd-muted-foreground ml-2 font-mono text-xs">
            signin/with-social.tsx
          </span>
        </div>
      </div>

      {/* Dynamically Rendered Syntax-Highlighted Code Block */}
      <div className="max-h-[300px] overflow-y-auto rounded-xl">
        <DynamicCodeBlock lang="tsx" code={codeSnippet} />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Step 2: Live Pre-Designed Component Flows
// ---------------------------------------------------------------------------

interface Step2Props {
  previewState: "default" | "error" | "loading"
  setPreviewState?: (state: "default" | "error" | "loading") => void
}

function Step2Narrative({ previewState, setPreviewState }: Step2Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
        <Sparkles className="h-3.5 w-3.5" />
        <AnimatedGradientText colorFrom="#f59e0b" colorTo="#fbbf24">
          Pre-Engineered Lifecycle
        </AnimatedGradientText>
      </div>

      <h3 className="text-fd-foreground text-2xl font-bold tracking-tight sm:text-3xl">
        <Highlighter action="underline" color="#f59e0b" padding={2}>
          Pre-Designed Component
        </Highlighter>
      </h3>

      <p className="text-fd-muted-foreground text-sm leading-relaxed">
        Not just static input primitives. Form validation schemas with Zod,
        interactive loading spinners, and error alerts are already designed and
        wired up.
      </p>

      {/* Interactive State Toggle Buttons */}
      <div className="pt-2">
        <p className="text-fd-muted-foreground mb-1.5 text-xs font-semibold tracking-wider uppercase">
          Test Live Flow States:
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setPreviewState?.("default")}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
              previewState === "default"
                ? "bg-fd-primary text-fd-primary-foreground font-semibold shadow-xs"
                : "border-fd-border bg-fd-muted/50 text-fd-muted-foreground hover:text-fd-foreground border"
            }`}
          >
            Default (Social)
          </button>
          <button
            type="button"
            onClick={() => setPreviewState?.("loading")}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
              previewState === "loading"
                ? "bg-fd-primary text-fd-primary-foreground font-semibold shadow-xs"
                : "border-fd-border bg-fd-muted/50 text-fd-muted-foreground hover:text-fd-foreground border"
            }`}
          >
            Loading State
          </button>
          <button
            type="button"
            onClick={() => setPreviewState?.("error")}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
              previewState === "error"
                ? "bg-fd-primary text-fd-primary-foreground font-semibold shadow-xs"
                : "border-fd-border bg-fd-muted/50 text-fd-muted-foreground hover:text-fd-foreground border"
            }`}
          >
            With Error
          </button>
        </div>
      </div>
    </div>
  )
}

function Step2Preview({
  previewState,
}: {
  previewState: "default" | "error" | "loading"
}) {
  const SignInWithSocial = registry["signin/with-social"]
  const SignInLoading = registry["signin/loading"]
  const SignInWithError = registry["signin/with-error"]

  return (
    <div className="w-full space-y-2.5">
      <div className="border-fd-border/70 flex items-center justify-between border-b pb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-fd-card-foreground text-xs font-bold">
            Preview
          </span>
        </div>
        <span className="text-fd-muted-foreground font-mono text-[11px]">
          {previewState === "default" && "<SignInWithSocial />"}
          {previewState === "loading" && "<SignInLoading />"}
          {previewState === "error" && "<SignInWithError />"}
        </span>
      </div>

      {/* Render Registry Component Previews */}
      <div className="flex items-center justify-center py-1">
        <div className="w-full max-w-sm">
          {previewState === "default" && SignInWithSocial && (
            <SignInWithSocial />
          )}
          {previewState === "loading" && SignInLoading && <SignInLoading />}
          {previewState === "error" && SignInWithError && <SignInWithError />}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Step 3: Zero Vendor Lock-in
// ---------------------------------------------------------------------------

function Step3Narrative() {
  return (
    <div className="flex flex-col gap-2">
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
        <ShieldCheck className="h-3.5 w-3.5" />
        <AnimatedGradientText colorFrom="#10b981" colorTo="#34d399">
          Full Ownership
        </AnimatedGradientText>
      </div>

      <h3 className="text-fd-foreground text-2xl font-bold tracking-tight sm:text-3xl">
        <Highlighter action="underline" color="#10b981" padding={2}>
          Zero Vendor Lock-in
        </Highlighter>
      </h3>

      <p className="text-fd-muted-foreground text-sm leading-relaxed">
        Installed directly into your repository via the shadcn CLI. You own{" "}
        <span className="relative z-10 font-semibold text-white">
          100% of the source code
        </span>
        . Decoupled headless hooks let you plug in any auth provider without
        changing UI templates.
      </p>

      <div className="space-y-1.5 pt-1 text-xs">
        <div className="text-fd-foreground flex items-center gap-2 font-medium">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          <span>No proprietary cloud subscription required</span>
        </div>
        <div className="text-fd-foreground flex items-center gap-2 font-medium">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          <span>Supabase, Auth.js, Better Auth, or custom REST APIs</span>
        </div>
        <div className="text-fd-foreground flex items-center gap-2 font-medium">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
          <span>Pure TypeScript + Tailwind CSS + Radix UI</span>
        </div>
      </div>
    </div>
  )
}

function Step3Preview() {
  return (
    <div className="w-full space-y-3">
      {/* Top Header */}
      <div className="border-fd-border/70 flex items-center justify-between border-b pb-2.5">
        <div className="flex items-center gap-2">
          <Terminal className="text-fd-primary h-4 w-4" />
          <span className="text-fd-card-foreground text-xs font-bold">
            Architecture &amp; Code Ownership
          </span>
        </div>
        <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
          100% Owned
        </span>
      </div>

      {/* CLI Command Box */}
      <div className="border-fd-border/70 bg-fd-muted/60 rounded-xl border p-2.5">
        <span className="text-fd-muted-foreground text-[10px] font-semibold uppercase">
          Install directly into your codebase
        </span>
        <div className="bg-fd-background/80 text-fd-foreground mt-1 flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 font-mono text-xs">
          <span className="min-w-0 flex-1 [scrollbar-width:none] overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden">
            {installCmd}
          </span>
          <CopyButton text={installCmd} variant="icon" />
        </div>
      </div>

      {/* File Structure & Hooks Breakdown */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <div className="border-fd-border/60 bg-fd-muted/30 rounded-xl border p-2.5">
          <div className="text-fd-foreground flex items-center gap-2 text-xs font-semibold">
            <FileCode2 className="h-4 w-4 text-blue-500" />
            <span>UI Components</span>
          </div>
          <p className="text-fd-muted-foreground mt-1 font-mono text-[11px]">
            components/auth/signin.tsx
          </p>
          <p className="text-fd-muted-foreground mt-1 text-[11px]">
            Standard React &amp; Tailwind. Fully editable inside your repo.
          </p>
        </div>

        <div className="border-fd-border/60 bg-fd-muted/30 rounded-xl border p-2.5">
          <div className="text-fd-foreground flex items-center gap-2 text-xs font-semibold">
            <Workflow className="h-4 w-4 text-emerald-500" />
            <span>Headless Hooks</span>
          </div>
          <p className="text-fd-muted-foreground mt-1 font-mono text-[11px]">
            hooks/use-signin.ts
          </p>
          <p className="text-fd-muted-foreground mt-1 text-[11px]">
            Decoupled logic. Plug in Supabase, Auth.js, or your custom REST API.
          </p>
        </div>
      </div>

      {/* Backend Compatibility List */}
      <div className="flex flex-wrap items-center gap-2 pt-0.5">
        <span className="text-fd-muted-foreground mr-1 text-[11px] font-medium">
          Compatible with:
        </span>
        <div className="border-fd-border bg-fd-muted/50 flex items-center gap-1.5 rounded-lg border px-2 py-0.5 text-xs">
          <SiSupabase className="h-3.5 w-3.5 text-emerald-500" />
          <span>Supabase</span>
        </div>
        <div className="border-fd-border bg-fd-muted/50 flex items-center gap-1.5 rounded-lg border px-2 py-0.5 text-xs">
          <SiNextdotjs className="h-3.5 w-3.5" />
          <span>Auth.js</span>
        </div>
        <div className="border-fd-border bg-fd-muted/50 flex items-center gap-1.5 rounded-lg border px-2 py-0.5 text-xs">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
          <span>Better Auth</span>
        </div>
        <div className="border-fd-border bg-fd-muted/50 flex items-center gap-1.5 rounded-lg border px-2 py-0.5 text-xs">
          <Boxes className="h-3.5 w-3.5 text-purple-500" />
          <span>Custom API</span>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Storytelling Content using StorytellingContent
// ---------------------------------------------------------------------------

export function WhySectionClient({ codeSnippet }: { codeSnippet: string }) {
  const [previewState, setPreviewState] = React.useState<
    "default" | "error" | "loading"
  >("default")

  return (
    <Storytelling stepCount={3} scrollPerStep={1.4}>
      {/* Background Mesh Grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-grid-pattern absolute inset-0 opacity-35" />
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-blue-500/10 via-cyan-400/5 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="border-fd-primary/20 bg-fd-primary/10 text-fd-primary inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-semibold">
            <Boxes className="h-3 w-3" />
            <AnimatedGradientText>Benefits</AnimatedGradientText>
          </div>
          <h2 className="text-fd-foreground mt-1.5 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-3xl">
            Why <span className="text-fd-primary">kuli/ui</span>?
          </h2>
          <p className="text-fd-muted-foreground mt-1 max-w-xl text-xs sm:text-sm">
            Engineered for production readiness, full code ownership, and zero
            vendor lock-in.
          </p>
        </div>

        {/* Unified Auto-Responsive Storytelling Content */}
        <StorytellingContent
          steps={[
            {
              narrative: <Step1Narrative />,
              preview: <Step1Preview codeSnippet={codeSnippet} />,
            },
            {
              narrative: (
                <Step2Narrative
                  previewState={previewState}
                  setPreviewState={setPreviewState}
                />
              ),
              preview: <Step2Preview previewState={previewState} />,
            },
            {
              narrative: <Step3Narrative />,
              preview: <Step3Preview />,
            },
          ]}
        />

        {/* Bottom Progress */}
        <StorytellingProgress />
      </div>
    </Storytelling>
  )
}
