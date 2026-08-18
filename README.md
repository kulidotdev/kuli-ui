# kuli/ui

<p align="center">
  <strong>Production-ready UI components with pre-designed flows, built on top of shadcn/ui.</strong>
</p>

<p align="center">
  <a href="https://ui.kuli.dev">Documentation</a> &bull;
  <a href="https://ui.kuli.dev/docs/components">Components</a> &bull;
  <a href="https://github.com/kulidotdev/kuli-ui">GitHub</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-compatible-000000?logo=shadcnui&logoColor=white" alt="shadcn/ui compatible" />
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License" />
</p>

---

## Overview

**kuli/ui** is a curated collection of production-ready components and interactive flows built on top of [shadcn/ui](https://ui.shadcn.com) and Radix UI primitives.

Instead of assembling forms, validation schemas, OTP timers, passkey managers, and error alerts from scratch for every new project, **kuli/ui** provides pre-wired compound components that you can copy directly into your project with the shadcn CLI.

- **No vendor lock-in**: Components live in your codebase. You own every line of code.
- **Designed flows, not just loose parts**: Built-in validation, loading states, and error handling.
- **Backend agnostic**: Connect to NextAuth, Supabase, Firebase, Clerk, Better Auth, or custom APIs in minutes.

---

## Key Features

- ⚡ **Pre-Wired Flows** &mdash; Ready-to-use authentication and form flows with validation ([Zod](https://zod.dev) + [React Hook Form](https://react-hook-form.com)), loading states, and error banners.
- 🧩 **Compound Component Architecture** &mdash; Fully modular sub-components powered by React Context. Rearrange, wrap, style, or omit parts effortlessly.
- 📦 **Copy-Paste via shadcn CLI** &mdash; Install components directly into your project using standard shadcn registry namespaces.
- 🎣 **Headless Hooks** &mdash; Business logic is separated into custom hooks (`useSignIn`, `useTwoFactor`, `usePasskeyManager`), allowing UI-independent customizations.
- 🎨 **Tailwind CSS v4 Ready** &mdash; Native support for Tailwind CSS v4 variables, light/dark modes, and sleek micro-interactions with [Motion](https://motion.dev).
- ♿ **Accessible by Default** &mdash; Built on accessible Radix UI primitives with full keyboard navigation and ARIA compliance.

---

## Quick Start

### 1. Prerequisites

Ensure your project has:
- **React 18+** (React 19 recommended)
- **Tailwind CSS v4**
- **TypeScript**
- **shadcn/ui** initialized in your project ([shadcn installation guide](https://ui.shadcn.com/docs/installation))

### 2. Configure the Registry

Add the `@kuli-ui` registry to your `components.json`:

```json
{
  "registries": {
    "@kuli-ui": "https://ui.kuli.dev/r/{name}"
  }
}
```

### 3. Add Components

Install components using the shadcn CLI:

```bash
# Using pnpm
pnpm dlx shadcn@latest add @kuli-ui/auth-signin

# Using npm
npx shadcn@latest add @kuli-ui/auth-signin

# Using bun
bunx shadcn@latest add @kuli-ui/auth-signin
```

The CLI automatically pulls all required dependencies and official shadcn primitives directly into your project's component directories.

---

## Usage Example

Every component follows a simple pattern: **you provide the callbacks, the component handles the UI and state.**

```tsx
import { useState } from "react";
import { SignIn } from "@/components/auth/signin";
import type { SigninFormValues } from "@/components/auth/signin-types";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<{ message: string } | null>(null);

  const handleSignIn = async (values: SigninFormValues) => {
    setLoading(true);
    setApiError(null);

    try {
      // Connect to your auth backend (Supabase, NextAuth, Firebase, Better Auth, etc.)
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const error = await res.json();
        setApiError({ message: error.message || "Failed to sign in" });
        return;
      }

      window.location.href = "/dashboard";
    } catch (err: any) {
      setApiError({ message: err.message || "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <SignIn
        onSubmit={handleSignIn}
        isLoading={loading}
        apiError={apiError}
      >
        <SignIn.Header
          title="Welcome Back"
          description="Sign in to access your account"
        />
        <SignIn.Content>
          <SignIn.Form>
            <SignIn.IdentifierField />
            <SignIn.PasswordField forgotPasswordPath="/forgot-password" />
            <SignIn.RememberMe />
            <SignIn.SubmitButton>Sign In</SignIn.SubmitButton>
          </SignIn.Form>
        </SignIn.Content>
      </SignIn>
    </div>
  );
}
```

---

## Available Components

### Authentication & Security

| Component | CLI Command | Description |
|---|---|---|
| **Sign In** | `add @kuli-ui/auth-signin` | Sign-in flow supporting email, username, phone, magic link, passkey, and social logins. |
| **Sign Up** | `add @kuli-ui/auth-signup` | Registration form with name, email, password, optional username, and phone number. |
| **Forgot Password** | `add @kuli-ui/auth-forgot-password` | Password recovery flow via email reset link or phone OTP. |
| **Reset Password** | `add @kuli-ui/auth-reset-password` | Set a new password via secure token or SMS OTP with validation feedback. |
| **Two-Factor Verify** | `add @kuli-ui/auth-two-factor` | 2FA verification supporting authenticator app (TOTP), SMS OTP, and backup recovery codes. |
| **Two-Factor Setup** | `add @kuli-ui/auth-two-factor-registration` | Setup flow for 2FA with interactive QR code scanning and backup code generator. |
| **Passkey Manager** | `add @kuli-ui/auth-passkey-manager` | Passkey/WebAuthn management dashboard to list, register, rename, and revoke credentials. |

### UI & Enhancements

| Component | CLI Command | Description |
|---|---|---|
| **Phone Input** | `add @kuli-ui/phone-input` | International phone input with country selector, flags, and E.164 formatting. |
| **Storytelling** | `add @kuli-ui/storytelling` | Rich animated onboarding / presentation slide container powered by Motion. |
| **Alert Card** | `add @kuli-ui/alert-card` | Styled status and confirmation card for action outcomes. |
| **Alert Error** | `add @kuli-ui/alert-error` | Standardized error banner for server-side error feedback. |
| **Form** | `add @kuli-ui/form` | Accessible form wrapper integrating React Hook Form with Radix UI labels. |

---

## Repository Structure

```
kuli-ui/
├── docs/                   # Documentation website (Next.js + Fumadocs)
│   ├── app/                # Docs app routes & landing page
│   ├── content/docs/       # MDX documentation & component guides
│   └── out/                # Static export for docs & registry
├── src/                    # Component library source
│   ├── components/
│   │   ├── auth/           # Auth flow compound components
│   │   └── ui/             # Reusable UI primitives & utilities
│   ├── hooks/              # Headless custom hooks
│   └── lib/                # Shared utilities (cn, clsx, tailwind-merge)
├── components.json         # shadcn registry configuration
├── registry.json           # Component registry definition
└── package.json            # Workspace root package manifest
```

---

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/kulidotdev/kuli-ui.git
cd kuli-ui
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run development servers

```bash
# Run the documentation site locally (http://localhost:3000)
pnpm --filter docs dev

# Run Vite dev server for component sandbox
pnpm dev
```

### 4. Build registry & docs

```bash
# Build the shadcn registry JSON schemas
pnpm build:registry

# Build the complete documentation & static output
pnpm build:all
```

### 5. Lint & Typecheck

```bash
pnpm lint
pnpm typecheck
pnpm format
```

---

## Tech Stack

- **Frameworks & Bundlers**: [React 19](https://react.dev), [Next.js](https://nextjs.org), [Vite](https://vite.dev)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com), `clsx`, `tailwind-merge`, `class-variance-authority`
- **Primitives**: [Radix UI](https://www.radix-ui.com), [shadcn/ui](https://ui.shadcn.com)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com), [Zod](https://zod.dev)
- **Animation & Icons**: [Motion](https://motion.dev), [Lucide React](https://lucide.dev)
- **Documentation**: [Fumadocs](https://fumadocs.dev)

---

## Contributing

Contributions are always welcome! If you'd like to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-component`)
3. Commit your changes (`git commit -m 'Add amazing component'`)
4. Push to the branch (`git push origin feature/amazing-component`)
5. Open a Pull Request

---

## License

Distributed under the [MIT License](https://opensource.org/licenses/MIT).
