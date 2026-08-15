'use client';

import * as React from 'react';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';
import { cn } from '@/lib/cn';

interface PreviewProps {
  children: React.ReactNode;
  className?: string;
}

interface PreviewDemoProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

interface PreviewCodeProps {
  children: React.ReactNode;
}

export function Preview({ children, className }: PreviewProps) {
  return (
    <Tabs items={['Preview', 'Code']} className={cn('not-prose my-6', className)}>
      {children}
    </Tabs>
  );
}

export function PreviewDemo({ children, className, centered = true }: PreviewDemoProps) {
  return (
    <Tab value="Preview">
      <div
        className={cn(
          'preview-root rounded-xl border px-4 py-12',
          centered && 'flex items-center justify-center',
          className,
        )}
      >
        {children}
      </div>
    </Tab>
  );
}

export function PreviewCode({ children }: PreviewCodeProps) {
  return <Tab value="Code">{children}</Tab>;
}

Preview.Demo = PreviewDemo;
Preview.Code = PreviewCode;
