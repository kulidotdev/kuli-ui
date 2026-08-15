import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/hero-section';
import { WhySection } from '@/components/home/why-section';
import { ComponentShowcase } from '@/components/home/component-showcase';
import { CtaSection } from '@/components/home/cta-section';

export const metadata: Metadata = {
  title: 'kuli/ui · Reusable UI Components with Pre-designed Flows',
  description:
    'Production-ready UI components where the flow is already designed for you — validation, error handling, and loading states included. Built on shadcn/ui and Radix primitives.',
};

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center w-full max-w-full overflow-x-clip">
      {/* 1. Hero Section with Interactive Preview Demo */}
      <HeroSection />

      {/* 2. Why Section (Features & Architecture) */}
      <WhySection />

      {/* 3. Production Component Showcase Catalog */}
      <ComponentShowcase />

      {/* 4. Bottom Call to Action & GitHub Links */}
      <CtaSection />
    </main>
  );
}
