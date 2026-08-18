"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/cn"

interface CopyButtonProps {
  text: string
  className?: string
  variant?: "icon" | "pill"
  label?: string
}

export function CopyButton({
  text,
  className,
  variant = "icon",
  label,
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback if clipboard API fails
      const textarea = document.createElement("textarea")
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "group bg-fd-muted/80 text-fd-foreground hover:border-fd-primary/40 hover:bg-fd-muted inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-xs font-medium transition-all active:scale-[0.98]",
          className
        )}
        aria-label="Copy to clipboard"
      >
        <span className="truncate">{label || text}</span>
        {copied ? (
          <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500 transition-transform" />
        ) : (
          <Copy className="text-fd-muted-foreground group-hover:text-fd-foreground h-3.5 w-3.5 shrink-0 transition-colors" />
        )}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "border-fd-border/50 bg-fd-background/80 text-fd-muted-foreground hover:border-fd-border hover:bg-fd-accent hover:text-fd-foreground inline-flex h-8 w-8 items-center justify-center rounded-md border transition-all active:scale-95",
        className
      )}
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className="h-4 w-4 scale-110 text-emerald-500 transition-transform" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  )
}
