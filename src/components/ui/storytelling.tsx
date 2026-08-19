"use client"

import * as React from "react"
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react"
import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Context & Types
// ---------------------------------------------------------------------------

export interface StorytellingContextValue {
  activeStep: number
  totalSteps: number
  setStep: (index: number) => void
  scrollToStep: (index: number) => void
  nextStep: () => void
  prevStep: () => void
  containerRef: React.RefObject<HTMLDivElement | null>
  scrollYProgress: MotionValue<number>
}

const StorytellingContext =
  React.createContext<StorytellingContextValue | null>(null)

/**
 * Hook to access the storytelling context.
 * Must be used within a <Storytelling> provider.
 */
export function useStorytelling() {
  const context = React.useContext(StorytellingContext)
  if (!context) {
    throw new Error(
      "useStorytelling must be used within a <Storytelling /> provider."
    )
  }
  return context
}

// ---------------------------------------------------------------------------
// 1. Storytelling (Root Container)
// ---------------------------------------------------------------------------

/**
 * Props for the root Storytelling component.
 */
export interface StorytellingProps {
  /**
   * Total number of steps in the storytelling sequence.
   * @default 3
   */
  stepCount?: number
  /**
   * The initial step index to start at.
   * @default 0
   */
  initialStep?: number
  /**
   * Callback fired when the active step changes.
   */
  onStepChange?: (step: number) => void
  /**
   * Class name applied to the sticky container.
   */
  stickyTopClassName?: string
  /**
   * Multiplier for scroll distance per step (in viewport units, e.g. 1.0, 1.3, 1.5).
   * Higher values increase the scroll runway per step, preventing fast scrolling from skipping steps.
   * Default is 1.3 (130vh per step).
   */
  scrollPerStep?: number
}

/**
 * Root component that provides storytelling context and handles scroll-based navigation.
 */
export function Storytelling({
  stepCount = 3,
  initialStep = 0,
  onStepChange,
  stickyTopClassName = "lg:top-14 sm:lg:top-16",
  scrollPerStep = 1.3,
  className,
  style,
  children,
  ...props
}: StorytellingProps & React.HTMLAttributes<HTMLDivElement>) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = React.useState<number>(initialStep)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const updateStep = React.useCallback(
    (nextStep: number) => {
      setActiveStep((prev) => {
        if (prev !== nextStep) {
          onStepChange?.(nextStep)
          return nextStep
        }
        return prev
      })
    },
    [onStepChange]
  )

  // Framer motion scroll event listener (active on desktop viewports)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return
    const stepRatio = 1 / stepCount
    const computedStep = Math.min(
      stepCount - 1,
      Math.max(0, Math.floor(latest / stepRatio))
    )
    updateStep(computedStep)
  })

  // Direct window scroll listener fallback for desktop
  React.useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined" && window.innerWidth < 1024) return
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const totalScrollable =
        containerRef.current.offsetHeight - window.innerHeight
      if (totalScrollable <= 0) return

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable))
      const stepRatio = 1 / stepCount
      const computedStep = Math.min(
        stepCount - 1,
        Math.max(0, Math.floor(progress / stepRatio))
      )
      updateStep(computedStep)
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: true,
    })
    window.addEventListener("resize", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true })
      window.removeEventListener("resize", handleScroll)
    }
  }, [stepCount, updateStep])

  const scrollToStep = React.useCallback(
    (stepIndex: number) => {
      updateStep(stepIndex)
      if (!containerRef.current) return
      if (typeof window !== "undefined" && window.innerWidth >= 1024) {
        const containerTop =
          containerRef.current.getBoundingClientRect().top + window.scrollY
        const containerHeight = containerRef.current.offsetHeight
        const scrollableDistance = containerHeight - window.innerHeight
        const targetScroll =
          containerTop +
          (scrollableDistance / Math.max(1, stepCount - 1)) * stepIndex
        window.scrollTo({ top: targetScroll, behavior: "smooth" })
      }
    },
    [stepCount, updateStep]
  )

  const nextStep = React.useCallback(() => {
    scrollToStep(Math.min(stepCount - 1, activeStep + 1))
  }, [activeStep, scrollToStep, stepCount])

  const prevStep = React.useCallback(() => {
    scrollToStep(Math.max(0, activeStep - 1))
  }, [activeStep, scrollToStep])

  const contextValue = React.useMemo(
    () => ({
      activeStep,
      totalSteps: stepCount,
      setStep: updateStep,
      scrollToStep,
      nextStep,
      prevStep,
      containerRef,
      scrollYProgress,
    }),
    [
      activeStep,
      stepCount,
      updateStep,
      scrollToStep,
      nextStep,
      prevStep,
      scrollYProgress,
    ]
  )

  const totalHeightVh = `${Math.max(2, stepCount) * Math.max(1, scrollPerStep) * 100}vh`

  return (
    <StorytellingContext.Provider value={contextValue}>
      <section
        ref={containerRef}
        style={{
          ...style,
          ["--storytelling-height" as string]: totalHeightVh,
        }}
        className={cn(
          "relative w-full max-w-full overflow-x-clip",
          "h-auto lg:h-[var(--storytelling-height)]",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "relative w-full max-w-full py-6 sm:py-8 lg:py-2",
            "lg:sticky lg:flex lg:h-[calc(100vh-3.5rem)] lg:flex-col lg:justify-center lg:overflow-visible",
            stickyTopClassName
          )}
        >
          {children}
        </div>
      </section>
    </StorytellingContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// 2. StorytellingHeader
// ---------------------------------------------------------------------------

/**
 * Header component for the storytelling section.
 */
export function StorytellingHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="storytelling-header"
      className={cn(
        "mb-6 flex flex-col items-start gap-4 border-b border-border/60 pb-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// 3. StorytellingTabs
// ---------------------------------------------------------------------------

/**
 * Represents a single tab item in the storytelling navigation.
 */
export interface StorytellingTabItem {
  label: string
  icon?: React.ComponentType<{ className?: string }>
}

/**
 * Props for the StorytellingTabs component.
 */
export interface StorytellingTabsProps {
  /**
   * Optional custom tab items. If not provided, generates default tabs based on step count.
   */
  items?: StorytellingTabItem[]
}

/**
 * Navigation tabs for the storytelling steps.
 */
export function StorytellingTabs({
  items = [],
  className,
  ...props
}: StorytellingTabsProps & React.ComponentProps<"div">) {
  const { activeStep, totalSteps, scrollToStep } = useStorytelling()

  const tabs: StorytellingTabItem[] =
    items.length > 0
      ? items
      : Array.from({ length: totalSteps }, (_, i) => ({
          label: `Step ${i + 1}`,
        }))

  return (
    <div
      data-slot="storytelling-tabs"
      className={cn(
        "flex w-full scrollbar-none items-center gap-1.5 overflow-x-auto rounded-xl border border-border/80 bg-card/90 p-1.5 shadow-xs backdrop-blur-md sm:w-auto",
        className
      )}
      {...props}
    >
      {tabs.map((tab, idx) => {
        const Icon = tab.icon
        const isActive = activeStep === idx
        return (
          <button
            key={idx}
            type="button"
            onClick={() => scrollToStep(idx)}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all sm:gap-2 sm:px-3",
              isActive
                ? "bg-primary font-semibold text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
            <span>{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------------------
// 4. StorytellingGrid / Content Wrapper
// ---------------------------------------------------------------------------

/**
 * Grid layout wrapper for storytelling content.
 */
export function StorytellingGrid({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="storytelling-grid"
      className={cn(
        "grid min-h-0 grid-cols-1 items-start gap-6 sm:gap-8 lg:min-h-[360px] lg:grid-cols-12 lg:gap-10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// 5. StorytellingNarrative (Left Column)
// ---------------------------------------------------------------------------

/**
 * Displays the text narrative (left column) for the current storytelling step.
 */
export function StorytellingNarrative({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const context = useStorytelling()

  return (
    <div
      data-slot="storytelling-narrative"
      className={cn(
        "flex max-w-full min-w-0 flex-col lg:col-span-5",
        className
      )}
      {...props}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`narrative-${context.activeStep}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <StorytellingContext.Provider value={context}>
            {children}
          </StorytellingContext.Provider>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 6. StorytellingPreview (Right Column Card)
// ---------------------------------------------------------------------------

/**
 * Props for the StorytellingPreview component.
 */
export interface StorytellingPreviewProps {
  /**
   * Class name for the outer grid column container.
   */
  containerClassName?: string
}

/**
 * Displays the visual preview (right column) for the current storytelling step.
 */
export function StorytellingPreview({
  className,
  children,
  containerClassName,
  ...props
}: StorytellingPreviewProps & React.ComponentProps<"div">) {
  const context = useStorytelling()

  return (
    <div
      data-slot="storytelling-preview"
      className={cn(
        "w-full max-w-full min-w-0 overflow-hidden lg:col-span-7",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "relative flex min-h-0 max-w-full flex-col lg:min-h-[360px]",
          className
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`preview-${context.activeStep}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full"
          >
            <StorytellingContext.Provider value={context}>
              {children}
            </StorytellingContext.Provider>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 7. StorytellingContent (Unified Auto-Responsive Steps Container)
// ---------------------------------------------------------------------------

/**
 * Represents the content for a single storytelling step.
 */
export interface StorytellingStepItem {
  /**
   * The text narrative content rendered for this step.
   */
  narrative: React.ReactNode
  /**
   * The visual preview/card content rendered for this step.
   */
  preview: React.ReactNode
  /**
   * Defines the layout order for this specific step.
   * "narrative-first": Narrative on left/top, Preview on right/bottom.
   * "preview-first": Preview on left/top, Narrative on right/bottom.
   * @default "narrative-first"
   */
  layout?: "narrative-first" | "preview-first"
}

/**
 * Props for the StorytellingContent component.
 */
export interface StorytellingContentProps {
  /**
   * The list of steps to display.
   */
  steps: StorytellingStepItem[]
  /**
   * Tailwind gap classes applied to the vertical stack on mobile/tablet viewports.
   * @default "gap-12 sm:gap-16"
   */
  mobileGapClassName?: string
  /**
   * Additional class name applied to the desktop grid container.
   */
  gridClassName?: string
  /**
   * Additional class name applied to the narrative column.
   */
  narrativeClassName?: string
  /**
   * Additional class name applied to the preview container.
   */
  previewClassName?: string
}

/**
 * Unified container that handles rendering steps automatically based on viewport size.
 */
export function StorytellingContent({
  steps,
  mobileGapClassName = "gap-12 sm:gap-16",
  gridClassName,
  narrativeClassName,
  previewClassName,
  className,
  ...props
}: StorytellingContentProps & React.ComponentProps<"div">) {
  const { activeStep } = useStorytelling()

  return (
    <div
      data-slot="storytelling-content"
      className={cn("w-full", className)}
      {...props}
    >
      {/* 1. Mobile & Tablet Layout: Sequential full vertical stack */}
      <div className={cn("flex flex-col lg:hidden", mobileGapClassName)}>
        {steps.map((step, idx) => {
          const isPreviewFirst = step.layout === "preview-first"
          const NarrativeNode = <div>{step.narrative}</div>
          const PreviewNode = (
            <div className={cn("relative", previewClassName)}>
              {step.preview}
            </div>
          )

          return (
            <div key={`mobile-step-${idx}`} className="flex flex-col gap-4">
              {isPreviewFirst ? (
                <>
                  {PreviewNode}
                  {NarrativeNode}
                </>
              ) : (
                <>
                  {NarrativeNode}
                  {PreviewNode}
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* 2. Desktop Layout: In-Place Sticky Parallax Grid */}
      <div className="hidden lg:block">
        <StorytellingGrid className={gridClassName}>
          <StorytellingNarrative
            className={cn(
              steps[activeStep]?.layout === "preview-first"
                ? "lg:order-2"
                : "lg:order-1",
              "transition-all duration-500",
              narrativeClassName
            )}
          >
            {steps[activeStep]?.narrative}
          </StorytellingNarrative>

          <StorytellingPreview
            containerClassName={cn(
              steps[activeStep]?.layout === "preview-first"
                ? "lg:order-1"
                : "lg:order-2",
              "transition-all duration-500"
            )}
            className={previewClassName}
          >
            {steps[activeStep]?.preview}
          </StorytellingPreview>
        </StorytellingGrid>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 9. StorytellingProgress (Bottom Indicator with Mobile Prev/Next Controls)
// ---------------------------------------------------------------------------

/**
 * Props for the StorytellingProgress component.
 */
export interface StorytellingProgressProps {
  /**
   * Optional label text shown next to the scroll arrow indicator.
   */
  label?: string
}

/**
 * Progress indicator for storytelling steps.
 */
export function StorytellingProgress({
  label = "",
  className,
  ...props
}: StorytellingProgressProps & React.ComponentProps<"div">) {
  const { activeStep, totalSteps } = useStorytelling()

  const formattedCurrent = String(activeStep + 1).padStart(2, "0")
  const formattedTotal = String(totalSteps).padStart(2, "0")

  return (
    <div
      data-slot="storytelling-progress"
      className={cn(
        "mt-6 hidden items-center justify-between border-t border-border/50 pt-3 text-xs text-muted-foreground lg:flex",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <span className="font-mono">{label}</span>
        <span className="animate-bounce">↓</span>
      </div>

      <div className="flex items-center gap-1 font-mono text-[11px]">
        <span className="font-bold text-foreground">{formattedCurrent}</span>
        <span>/</span>
        <span>{formattedTotal}</span>
      </div>
    </div>
  )
}
