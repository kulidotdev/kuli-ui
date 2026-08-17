"use client"

import * as React from "react"
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react"
import { cn } from "../../lib/utils"

// ---------------------------------------------------------------------------
// Context & Types
// ---------------------------------------------------------------------------

interface StorytellingContextValue {
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
  /**
   * Enable scroll snapping anchors along the track so scrolling settles on each step.
   * Default is false.
   */
  snapToSteps?: boolean
  /**
   * The storytelling content and subcomponents.
   */
  children: React.ReactNode
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
  snapToSteps = false,
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

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
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
          "relative w-full max-w-full overflow-x-clip border-t border-border/70",
          "h-auto lg:h-[var(--storytelling-height)]",
          snapToSteps && "lg:snap-y lg:snap-mandatory",
          className
        )}
        {...props}
      >
        {/* Optional scroll snap anchors */}
        {snapToSteps && (
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            {Array.from({ length: stepCount }, (_, i) => (
              <div
                key={i}
                style={{ height: `${scrollPerStep * 100}vh` }}
                className="w-full snap-start"
              />
            ))}
          </div>
        )}

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
  shortLabel?: string
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
  className?: string
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
          shortLabel: `${i + 1}`,
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
            <span className="inline sm:inline">{tab.label}</span>
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
        "grid min-h-0 grid-cols-1 items-center gap-6 sm:gap-8 lg:min-h-[360px] lg:grid-cols-12 lg:gap-10",
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
 * Props for the StorytellingNarrative component.
 */
export interface StorytellingNarrativeProps {
  stepIndex?: number
  transitionDuration?: number
  className?: string
  children?: React.ReactNode
}

/**
 * Displays the text narrative (left column) for the current storytelling step.
 */
export function StorytellingNarrative({
  className,
  children,
  ...props
}: StorytellingNarrativeProps & React.ComponentProps<"div">) {
  const { activeStep } = useStorytelling()

  return (
    <div
      data-slot="storytelling-narrative"
      className={cn(
        "flex max-w-full min-w-0 flex-col justify-center lg:col-span-5",
        className
      )}
      {...props}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`narrative-${activeStep}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="space-y-3 sm:space-y-4"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 6. StorytellingPreview (Right Column Card)
// ---------------------------------------------------------------------------

/**
 * Displays the visual preview (right column) for the current storytelling step.
 */
export function StorytellingPreview({
  className,
  children,
  showCornerTicks = true,
  ...props
}: React.ComponentProps<"div"> & { showCornerTicks?: boolean }) {
  const { activeStep } = useStorytelling()

  return (
    <div
      data-slot="storytelling-preview"
      className="w-full max-w-full min-w-0 overflow-hidden lg:col-span-7"
      {...props}
    >
      <div
        className={cn(
          "relative flex min-h-0 max-w-full flex-col justify-center rounded-2xl border border-border/80 bg-card/90 p-4 shadow-md backdrop-blur-md sm:p-5 lg:min-h-[360px] lg:p-6",
          className
        )}
      >
        {showCornerTicks && <StorytellingCornerTicks />}

        <AnimatePresence mode="wait">
          <motion.div
            key={`preview-${activeStep}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full"
          >
            {children}
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
  narrative: React.ReactNode
  preview: React.ReactNode
  showCornerTicks?: boolean
}

/**
 * Props for the StorytellingContent component.
 */
export interface StorytellingContentProps {
  /**
   * The list of steps to display.
   */
  steps: StorytellingStepItem[]
  mobileGapClassName?: string
  gridClassName?: string
  narrativeClassName?: string
  previewClassName?: string
  previewCardClassName?: string
  className?: string
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
  previewCardClassName,
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
        {steps.map((step, idx) => (
          <div key={`mobile-step-${idx}`} className="space-y-4">
            <div className="space-y-3">{step.narrative}</div>
            <div
              className={cn(
                "relative rounded-2xl border border-border/80 bg-card/90 p-4 shadow-md backdrop-blur-md sm:p-6",
                previewCardClassName,
                previewClassName
              )}
            >
              {step.showCornerTicks !== false && <StorytellingCornerTicks />}
              {step.preview}
            </div>
          </div>
        ))}
      </div>

      {/* 2. Desktop Layout: In-Place Sticky Parallax Grid */}
      <div className="hidden lg:block">
        <StorytellingGrid className={gridClassName}>
          <StorytellingNarrative className={narrativeClassName}>
            {steps[activeStep]?.narrative}
          </StorytellingNarrative>

          <StorytellingPreview
            className={cn(previewCardClassName, previewClassName)}
            showCornerTicks={steps[activeStep]?.showCornerTicks !== false}
          >
            {steps[activeStep]?.preview}
          </StorytellingPreview>
        </StorytellingGrid>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 8. StorytellingCornerTicks (CAD/Nova aesthetic crosshairs)
// ---------------------------------------------------------------------------

/**
 * Decorative corner ticks component for visual styling.
 */
export function StorytellingCornerTicks({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none select-none", className)}
    >
      <span className="absolute -top-2.5 -left-2.5 flex h-5 w-5 items-center justify-center font-mono text-sm font-light text-muted-foreground/60">
        {/* + */}
      </span>
      <span className="absolute -top-2.5 -right-2.5 flex h-5 w-5 items-center justify-center font-mono text-sm font-light text-muted-foreground/60">
        {/* + */}
      </span>
      <span className="absolute -bottom-2.5 -left-2.5 flex h-5 w-5 items-center justify-center font-mono text-sm font-light text-muted-foreground/60">
        {/* + */}
      </span>
      <span className="absolute -right-2.5 -bottom-2.5 flex h-5 w-5 items-center justify-center font-mono text-sm font-light text-muted-foreground/60">
        {/* + */}
      </span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 9. StorytellingProgress (Bottom Indicator with Mobile Prev/Next Controls)
// ---------------------------------------------------------------------------

/**
 * Progress indicator for storytelling steps.
 */
export function StorytellingProgress({
  label = "",
  className,
  ...props
}: React.ComponentProps<"div"> & { label?: string }) {
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
