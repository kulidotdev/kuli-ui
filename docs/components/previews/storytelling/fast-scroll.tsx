"use client"

import * as React from "react"
import {
  Storytelling,
  StorytellingContent,
  StorytellingProgress,
} from "@kuli-ui/components/components/ui/storytelling"
import { FastForward, Gauge } from "lucide-react"

export function StorytellingFastScroll() {
  return (
    <div className="w-full max-w-3xl">
      {/* Set scrollPerStep to 1.0 (100vh) instead of the default 1.3 */}
      <Storytelling stepCount={2} scrollPerStep={1.0}>
        <StorytellingContent
          previewClassName="rounded-2xl border border-border/80 bg-card p-4 shadow-sm"
          steps={[
            {
              narrative: (
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-2.5 py-0.5 text-xs font-semibold text-orange-600 dark:text-orange-400">
                    <FastForward className="h-3.5 w-3.5" />
                    <span>Fast Paced</span>
                  </div>
                  <h3 className="text-2xl font-bold">100vh Scroll Runway</h3>
                  <p className="text-muted-foreground">
                    By setting <code>scrollPerStep=&#123;1.0&#125;</code>, the sticky container allocates exactly one viewport height of scrolling per step.
                  </p>
                </div>
              ),
              preview: (
                <div className="flex aspect-square sm:aspect-[4/3] w-full flex-col items-center justify-center gap-4 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400">
                  <Gauge className="h-12 w-12" />
                  <span className="font-bold text-lg">Speed: High</span>
                </div>
              ),
            },
            {
              narrative: (
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">Snappy Transitions</h3>
                  <p className="text-muted-foreground">
                    This creates a much faster, punchier scrolling experience compared to the default relaxed pace. Perfect for short content.
                  </p>
                </div>
              ),
              preview: (
                <div className="flex aspect-square sm:aspect-[4/3] w-full flex-col items-center justify-center gap-4 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <FastForward className="h-12 w-12" />
                  <span className="font-bold text-lg">You arrived quickly!</span>
                </div>
              ),
            },
          ]}
        />
        <StorytellingProgress />
      </Storytelling>
    </div>
  )
}
