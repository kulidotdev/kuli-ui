"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import { ArrowRight, BookOpen, Heart } from "lucide-react"
import { AnimatedGradientText } from "@kuli-ui/components/components/ui/animated-gradient-text"
import { MorphingText } from "@kuli-ui/components/components/ui/morphing-text"
import { Highlighter } from "@kuli-ui/components/components/ui/highlighter"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden pt-16 pb-20 md:pt-20 md:pb-28 lg:h-screen">
      {/* Background Glows & Mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-grid-pattern absolute inset-0 opacity-60 dark:opacity-40" />
        <div className="absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-500/15 via-cyan-400/10 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          {/* Release Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="border-fd-border/70 bg-fd-muted/60 text-fd-muted-foreground hover:border-fd-primary/40 hover:bg-fd-muted mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium shadow-xs backdrop-blur-md transition-all"
          >
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" />
            <AnimatedGradientText className="font-semibold">
              kuli/ui
            </AnimatedGradientText>
            {/* <span>·</span>
            <span className="flex items-center gap-1 text-fd-primary">
              <Sparkles className="h-3 w-3" /> Reusable UI Components with Pre-designed Flows
            </span> */}
          </motion.div>

          {/* Main Logo & Headline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative mb-2">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-blue-600/30 to-cyan-500/30 blur-lg" />
              <Image
                src="/logo_192x192.png"
                alt="kuli/ui"
                width={76}
                height={76}
                className="border-fd-border/80 relative rounded-2xl border shadow-md transition-transform hover:scale-105"
                priority
              />
            </div>

            <div className="text-fd-foreground flex max-w-4xl flex-col items-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span>Reusable components with</span>
              <MorphingText
                texts={[
                  "Pre-designed UI",
                  "Form Schema",
                  "Loading States",
                  "Error States",
                ]}
                className="mt-2 h-16 text-4xl text-blue-600 filter-[url(#threshold)_blur(1px)] sm:text-5xl md:h-20 md:text-6xl lg:h-24 dark:text-blue-400"
              />
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="text-fd-muted-foreground mt-6 max-w-2xl text-base sm:text-lg"
          >
            kuli/ui is a collection of{" "}
            <Highlighter
              action="underline"
              color="#3b82f6"
              padding={4}
              isView={true}
            >
              <span className="relative z-10 font-semibold dark:text-white">
                production-ready UI components
              </span>
            </Highlighter>{" "}
            where the complete flow is already engineered for you — validation
            schemas, error handling, and loading states all included. Copy-paste
            into your codebase and wire up your backend.
          </motion.p>

          {/* CTA Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              href="/docs/components/auth-signin"
              className="group bg-fd-primary text-fd-primary-foreground hover:shadow-fd-primary/20 relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold shadow-md transition-all hover:opacity-95 hover:shadow-lg active:scale-[0.98]"
            >
              <span>Explore Components</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/docs"
              className="border-fd-border/80 bg-fd-card/80 text-fd-foreground hover:border-fd-primary/40 hover:bg-fd-muted inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold backdrop-blur-md transition-all active:scale-[0.98]"
            >
              <BookOpen className="text-fd-muted-foreground h-4 w-4" />
              <span>Documentation</span>
            </Link>
          </motion.div>

          {/* Tech Stack Highlights */}
          <div className="text-fd-muted-foreground mt-16 flex flex-wrap items-center justify-center gap-4 text-xs font-medium sm:gap-6">
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
            <span className="bg-fd-border hidden h-1 w-1 rounded-full sm:inline-block" />
            <span>React 19</span>
            <span className="bg-fd-border h-1 w-1 rounded-full" />
            <span>Radix UI</span>
            <span className="bg-fd-border h-1 w-1 rounded-full" />
            <span>Tailwind CSS v4</span>
            <span className="bg-fd-border h-1 w-1 rounded-full" />
            <span>Zod Schemas</span>
          </div>
        </div>
      </div>
    </section>
  )
}
