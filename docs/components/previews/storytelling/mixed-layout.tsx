"use client"

import {
  Storytelling,
  StorytellingContent,
} from "@kuli-ui/components/components/ui/storytelling"

export function StorytellingMixedLayout() {
  return (
    <div className="w-full max-w-3xl">
      <Storytelling stepCount={4} scrollPerStep={1.2}>
        <StorytellingContent
          previewClassName="rounded-xl border border-border/70 bg-card p-4 shadow-sm"
          steps={[
            {
              // Step 1: Narrative (Left) x Preview (Right)
              layout: "narrative-first",
              narrative: (
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">1. Narrative First</h3>
                  <p className="text-sm text-muted-foreground">
                    This is the standard layout. The narrative is on the left
                    (or top on mobile), and the preview is on the right (or
                    bottom).
                  </p>
                </div>
              ),
              preview: (
                <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-blue-500/10 font-medium text-blue-500">
                  Preview 1 (Right)
                </div>
              ),
            },
            {
              // Step 2: Preview (Left) x Narrative (Right)
              layout: "preview-first",
              narrative: (
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">2. Preview First</h3>
                  <p className="text-sm text-muted-foreground">
                    For this step, we passed{" "}
                    <code>layout: "preview-first"</code>. The layout instantly
                    swaps, placing the preview on the left and the narrative on
                    the right!
                  </p>
                </div>
              ),
              preview: (
                <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-emerald-500/10 font-medium text-emerald-500">
                  Preview 2 (Left)
                </div>
              ),
            },
            {
              // Step 3: Preview (Left) x Narrative (Right)
              layout: "preview-first",
              narrative: (
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">3. Stay Reversed</h3>
                  <p className="text-sm text-muted-foreground">
                    We kept <code>layout: "preview-first"</code>, so the layout
                    remains flipped for this step as well.
                  </p>
                </div>
              ),
              preview: (
                <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-amber-500/10 font-medium text-amber-500">
                  Preview 3 (Left)
                </div>
              ),
            },
            {
              // Step 4: Narrative (Left) x Preview (Right)
              layout: "narrative-first",
              narrative: (
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">4. Back to Normal</h3>
                  <p className="text-sm text-muted-foreground">
                    And we return to the standard layout. The component
                    automatically animates the positional swap.
                  </p>
                </div>
              ),
              preview: (
                <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-fuchsia-500/10 font-medium text-fuchsia-500">
                  Preview 4 (Right)
                </div>
              ),
            },
          ]}
        />
      </Storytelling>
    </div>
  )
}
