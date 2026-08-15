'use client';

import * as React from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/cn';

interface CopyButtonProps {
  text: string;
  className?: string;
  variant?: 'icon' | 'pill';
  label?: string;
}

export function CopyButton({ text, className, variant = 'icon', label }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API fails
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          'group inline-flex items-center gap-2 rounded-lg border bg-fd-muted/80 px-3 py-1.5 font-mono text-xs font-medium text-fd-foreground transition-all hover:border-fd-primary/40 hover:bg-fd-muted active:scale-[0.98]',
          className
        )}
        aria-label="Copy to clipboard"
      >
        <span className="truncate">{label || text}</span>
        {copied ? (
          <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500 transition-transform" />
        ) : (
          <Copy className="h-3.5 w-3.5 shrink-0 text-fd-muted-foreground transition-colors group-hover:text-fd-foreground" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        'inline-flex h-8 w-8 items-center justify-center rounded-md border border-fd-border/50 bg-fd-background/80 text-fd-muted-foreground transition-all hover:border-fd-border hover:bg-fd-accent hover:text-fd-foreground active:scale-95',
        className
      )}
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className="h-4 w-4 text-emerald-500 transition-transform scale-110" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
}
