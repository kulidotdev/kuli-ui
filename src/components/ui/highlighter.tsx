"use client"

import { useEffect, useRef } from "react"
import type React from "react"
import { useInView } from "motion/react"
import { annotate } from "rough-notation"

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  })

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = !isView || isInView

  // Use useEffect instead of useLayoutEffect to allow the DOM to paint and animations to settle
  useEffect(() => {
    const element = elementRef.current
    // let resizeObserver: ResizeObserver | null = null
    let timeoutId: ReturnType<typeof setTimeout>

    const annotationConfig = {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    }

    if (shouldShow && element) {
      // Delay to ensure framer-motion animations or font loading have settled
      // 800ms allows typical framer-motion initial animations to complete before drawing the SVG
      timeoutId = setTimeout(() => {
        const currentAnnotation = annotate(element, annotationConfig)
        currentAnnotation.show()
      }, 800)
    }

    return () => {
      clearTimeout(timeoutId)
      // We purposefully do NOT call annotation?.remove() here.
      // This allows the SVG to persist and fade out smoothly alongside the text
      // during framer-motion's exit animations (AnimatePresence).
      // The SVG will be garbage collected naturally when React unmounts the wrapper.
    }
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
  ])

  return (
    <span className="relative inline-block">
      <span ref={elementRef} className="bg-transparent">
        {children}
      </span>
    </span>
  )
}
