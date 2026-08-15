'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Lock,
  UserPlus,
  KeyRound,
  RotateCcw,
  ShieldCheck,
  QrCode,
  Fingerprint,
  ArrowRight,
  Boxes,
} from 'lucide-react';

const componentsData = [
  {
    name: 'Sign In Flow',
    id: 'auth-signin',
    category: 'Authentication',
    href: '/docs/components/auth-signin',
    icon: Lock,
    desc: 'Flexible multi-method sign in supporting email, username, phone, social providers, magic link, and passkey.',
    tags: ['Multi-Method', 'Social OAuth', 'Magic Link', 'Passkey'],
    color: 'from-blue-500/20 to-cyan-500/20 text-blue-500',
  },
  {
    name: 'Sign Up Flow',
    id: 'auth-signup',
    category: 'Authentication',
    href: '/docs/components/auth-signup',
    icon: UserPlus,
    desc: 'Comprehensive account registration with password strength meter, email confirmation, and optional custom fields.',
    tags: ['Validation', 'Zod', 'Compound', 'Terms Agreement'],
    color: 'from-cyan-500/20 to-teal-500/20 text-cyan-500',
  },
  {
    name: 'Forgot Password',
    id: 'auth-forgot-password',
    category: 'Authentication',
    href: '/docs/components/auth-forgot-password',
    icon: KeyRound,
    desc: 'Account recovery flow supporting email magic link dispatch or SMS verification OTP with cooldown timer.',
    tags: ['Email Link', 'SMS OTP', 'Rate Limit UI', 'Cooldown'],
    color: 'from-amber-500/20 to-orange-500/20 text-amber-500',
  },
  {
    name: 'Reset Password',
    id: 'auth-reset-password',
    category: 'Authentication',
    href: '/docs/components/auth-reset-password',
    icon: RotateCcw,
    desc: 'Secure password reset interface validating URL tokens or 6-digit OTP codes with password confirmation.',
    tags: ['Token Verification', 'OTP Code', 'Password Strength'],
    color: 'from-indigo-500/20 to-blue-500/20 text-indigo-500',
  },
  {
    name: 'Two-Factor Challenge',
    id: 'auth-two-factor',
    category: 'Security & 2FA',
    href: '/docs/components/auth-two-factor',
    icon: ShieldCheck,
    desc: 'Multi-factor verification challenge supporting TOTP authenticator apps, email OTP codes, and emergency backup codes.',
    tags: ['TOTP', 'Authenticator', 'Backup Codes', 'Auto-submit'],
    color: 'from-emerald-500/20 to-green-500/20 text-emerald-500',
  },
  {
    name: '2FA Registration',
    id: 'auth-two-factor-registration',
    category: 'Security & 2FA',
    href: '/docs/components/auth-two-factor-registration',
    icon: QrCode,
    desc: 'Complete 2FA enrollment flow with dynamic QR code generator, secret key copy, and backup codes download.',
    tags: ['QR Generator', 'Secret Key', 'Backup Codes', 'Step Wizard'],
    color: 'from-violet-500/20 to-purple-500/20 text-violet-500',
  },
  {
    name: 'Passkey Manager',
    id: 'auth-passkey-manager',
    category: 'Passwordless',
    href: '/docs/components/auth-passkey-manager',
    icon: Fingerprint,
    desc: 'Biometric credential manager for listing, registering, renaming, and revoking WebAuthn FIDO2 passkeys.',
    tags: ['WebAuthn', 'Biometrics', 'FIDO2', 'CRUD Manager'],
    color: 'from-rose-500/20 to-pink-500/20 text-rose-500',
  },
];

const categories = ['All', 'Authentication', 'Security & 2FA', 'Passwordless'] as const;

export function ComponentShowcase() {
  const [activeCategory, setActiveCategory] = React.useState<string>('All');

  const filteredComponents =
    activeCategory === 'All'
      ? componentsData
      : componentsData.filter((c) => c.category === activeCategory);

  return (
    <section className="relative w-full border-t border-fd-border/70 py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-pattern opacity-30" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-fd-primary/20 bg-fd-primary/10 px-3 py-1 text-xs font-semibold text-fd-primary">
            <Boxes className="h-3.5 w-3.5" />
            <span>Component Registry</span>
          </div>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-fd-foreground sm:text-4xl">
            Available components & flows
          </h2>
          <p className="mt-3 max-w-2xl text-base text-fd-muted-foreground">
            Explore our pre-designed UI flows with built-in validation, error handling, and edge cases.
            Currently featuring authentication flows, with more flow categories coming soon.
          </p>


          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 rounded-xl border border-fd-border/60 bg-fd-card/80 p-1.5 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-fd-primary text-fd-primary-foreground shadow-xs'
                    : 'text-fd-muted-foreground hover:bg-fd-muted hover:text-fd-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Component Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredComponents.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-fd-border/80 bg-fd-card/90 p-6 shadow-xs backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-fd-primary/50 hover:shadow-xl hover:shadow-fd-primary/5"
                >
                  {/* Ambient Hover Gradient Glow */}
                  <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-fd-primary/10 to-transparent opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                  <div>
                    {/* Card Top */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} ring-1 ring-fd-border/50`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-md border border-fd-border/60 bg-fd-muted/50 px-2 py-0.5 text-[11px] font-medium text-fd-muted-foreground">
                        {item.category}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="mt-5">
                      <h3 className="text-lg font-bold tracking-tight text-fd-card-foreground group-hover:text-fd-primary transition-colors flex items-center justify-between">
                        <span>{item.name}</span>
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-fd-primary" />
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-fd-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-6 flex flex-wrap gap-1.5 border-t border-fd-border/50 pt-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-fd-muted/60 px-2 py-0.5 text-[10px] font-medium text-fd-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
