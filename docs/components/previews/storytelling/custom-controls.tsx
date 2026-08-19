"use client"

import { motion } from "motion/react"
import { ArrowLeft, ArrowRight, MousePointerClick } from "lucide-react"
import {
  Storytelling,
  StorytellingContent,
  useStorytelling,
} from "@kuli-ui/components/components/ui/storytelling"

function InlineControls() {
  const { activeStep, totalSteps, prevStep, nextStep } = useStorytelling()

  // Kalkulasi persentase progress (1 sampai totalSteps)
  const progressPercent = ((activeStep + 1) / totalSteps) * 100

  return (
    <div className="mt-8 flex w-full flex-col gap-4">
      {/* 1. Custom Progress Bar (Step-based, never empty) */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-indigo-500/10">
        <motion.div
          className="h-full bg-indigo-500"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      {/* 2. Custom Next/Prev Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevStep}
          disabled={activeStep === 0}
          className="group flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-indigo-500/10 hover:text-indigo-600 disabled:opacity-40 disabled:hover:bg-transparent dark:hover:text-indigo-400"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Previous
        </button>

        <span className="font-mono text-sm font-semibold tracking-widest text-muted-foreground">
          {activeStep + 1} / {totalSteps}
        </span>

        <button
          onClick={nextStep}
          disabled={activeStep === totalSteps - 1}
          className="group flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-indigo-500/10 hover:text-indigo-600 disabled:opacity-40 disabled:hover:bg-transparent dark:hover:text-indigo-400"
        >
          Next
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}

export function StorytellingCustomControls() {
  return (
    <div className="w-full max-w-3xl">
      <Storytelling stepCount={3}>
        <StorytellingContent
          previewClassName="rounded-xl border border-border/80 bg-card p-4 shadow-sm"
          steps={[
            {
              narrative: (
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Custom Controls</h3>
                  <p className="text-sm text-muted-foreground">
                    Look at the inline controls below! You can build your own
                    navigation controls by consuming the{" "}
                    <code>useStorytelling</code> hook.
                  </p>
                </div>
              ),
              preview: (
                <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 rounded-lg bg-indigo-500/10 text-indigo-500">
                  <MousePointerClick className="h-12 w-12" />
                  <span className="font-medium">
                    Try clicking the arrows below
                  </span>
                </div>
              ),
            },
            {
              narrative: (
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Step-Linked Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    Notice how the progress bar below is now linked to the
                    actual step number instead of scroll distance. It starts
                    filled at step 1!
                  </p>
                </div>
              ),
              preview: (
                <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-emerald-500/10 font-medium text-emerald-500">
                  Smooth Interpolation
                </div>
              ),
            },
            {
              narrative: (
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Total Freedom</h3>
                  <p className="text-sm text-muted-foreground">
                    Because the hook exposes <code>nextStep</code> and{" "}
                    <code>prevStep</code>, you aren't tied to the default
                    `StorytellingProgress` component.
                  </p>
                </div>
              ),
              preview: (
                <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-amber-500/10 font-medium text-amber-500">
                  Build Anything
                </div>
              ),
            },
          ]}
        />

        {/* Inject our custom inline controls inside the Storytelling provider */}
        <InlineControls />
      </Storytelling>
    </div>
  )
}
