'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { gitConfig } from '@/lib/shared';
import { CopyButton } from './copy-button';

const quickCmd = 'pnpm dlx shadcn@latest add https://kuli-ui.dev/r/auth-signin.json';

export function CtaSection() {
  return (
    <section className="relative w-full border-t border-fd-border/70 py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-fd-border/80 bg-gradient-to-b from-fd-card to-fd-muted/30 p-8 sm:p-14 text-center shadow-2xl backdrop-blur-xl">
          {/* Ambient Glow Orbs */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-cyan-500/20 blur-3xl" />

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-fd-primary/20 bg-fd-primary/10 px-3.5 py-1 text-xs font-semibold text-fd-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Start Building Today</span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-fd-foreground sm:text-4xl">
            Elevate your product with pre-designed UI flows
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base text-fd-muted-foreground">
            Save weeks of engineering time designing complex form states, multi-step validations,
            and error recovery. Copy-paste what you need into your project and own your code.
          </p>


          {/* CLI box */}
          <div className="mt-8 mx-auto flex max-w-lg items-center justify-between rounded-xl border border-fd-border bg-fd-background/90 p-3 shadow-inner">
            <div className="flex items-center gap-2 overflow-x-auto font-mono text-xs text-fd-foreground">
              <Terminal className="h-3.5 w-3.5 shrink-0 text-fd-primary" />
              <span className="truncate">{quickCmd}</span>
            </div>
            <div className="ml-2 shrink-0">
              <CopyButton text={quickCmd} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-xl bg-fd-primary px-6 py-3 text-sm font-semibold text-fd-primary-foreground shadow-md transition-all hover:opacity-95 hover:shadow-lg hover:shadow-fd-primary/20 active:scale-[0.98]"
            >
              <span>Read the Documentation</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href={`https://github.com/${gitConfig.user}/${gitConfig.repo}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-fd-border/80 bg-fd-card/80 px-6 py-3 text-sm font-semibold text-fd-foreground backdrop-blur-md transition-all hover:border-fd-primary/40 hover:bg-fd-muted active:scale-[0.98]"
            >
              <SiGithub className="h-4 w-4" />
              <span>Star on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
