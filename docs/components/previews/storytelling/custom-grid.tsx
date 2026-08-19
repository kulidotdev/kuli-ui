"use client"

import * as React from "react"
import {
  Storytelling,
  StorytellingGrid,
  StorytellingNarrative,
  StorytellingPreview,
  useStorytelling,
} from "@kuli-ui/components/components/ui/storytelling"
import { cn } from "@/lib/utils"

function ReverseGridLayout() {
  const { activeStep } = useStorytelling()

  return (
    <StorytellingGrid className="gap-10 sm:gap-16 items-start lg:grid-cols-12">
      {/* 
        PREVIEW CARD IS ON THE LEFT (col-start-1 col-span-7)
        NARRATIVE IS ON THE RIGHT (col-start-8 col-span-5) 
      */}
      <div className="order-2 lg:order-1 lg:col-span-7 lg:col-start-1">
        <StorytellingPreview className="rounded-2xl border border-border/80 bg-card p-4 shadow-sm w-full">
          <div className="flex aspect-square sm:aspect-[4/3] w-full items-center justify-center rounded-lg bg-muted/30">
            <span className="text-4xl">
              {activeStep === 0 ? "🚀" : activeStep === 1 ? "🎨" : "⚡"}
            </span>
          </div>
        </StorytellingPreview>
      </div>

      <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8">
        <div className="sticky top-24 lg:top-32">
          <StorytellingNarrative>
            {activeStep === 0 && (
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">Flipped Layout</h3>
                <p className="text-muted-foreground">
                  By using the granular compound components instead of <code>&lt;StorytellingContent /&gt;</code>, you have 100% control over the grid structure.
                </p>
              </div>
            )}
            {activeStep === 1 && (
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">Total Freedom</h3>
                <p className="text-muted-foreground">
                  Here, the preview card has been placed on the left, and the sticky narrative has been placed on the right.
                </p>
              </div>
            )}
            {activeStep === 2 && (
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">Responsive Orders</h3>
                <p className="text-muted-foreground">
                  Using Tailwind's <code>order</code> utilities, we ensure that on mobile, the text still appears above the card, but on desktop, they swap places!
                </p>
              </div>
            )}
          </StorytellingNarrative>
        </div>
      </div>
    </StorytellingGrid>
  )
}

export function StorytellingCustomGrid() {
  return (
    <div className="w-full max-w-4xl">
      <Storytelling stepCount={3}>
        <ReverseGridLayout />
      </Storytelling>
    </div>
  )
}
