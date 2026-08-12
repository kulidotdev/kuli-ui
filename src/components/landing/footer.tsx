import { Hexagon } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative mt-12 overflow-hidden border-t border-primary/20 bg-background/80 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"></div>
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-12 sm:px-6 md:flex-row lg:px-8">
        <div className="flex items-center gap-2">
          <Hexagon className="h-5 w-5 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
          <span className="font-semibold tracking-wide text-primary">
            Kuli UI
          </span>
        </div>

        <p className="text-center text-sm font-light text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} KuliDotDev. All rights reserved.
        </p>

        <div className="flex gap-6 text-sm font-medium text-muted-foreground">
          <a
            href="#"
            className="transition-all hover:text-primary hover:drop-shadow-[0_0_5px_rgba(var(--primary),0.8)]"
          >
            Twitter
          </a>
          <a
            href="#"
            className="transition-all hover:text-primary hover:drop-shadow-[0_0_5px_rgba(var(--primary),0.8)]"
          >
            GitHub
          </a>
          <a
            href="#"
            className="transition-all hover:text-primary hover:drop-shadow-[0_0_5px_rgba(var(--primary),0.8)]"
          >
            Discord
          </a>
        </div>
      </div>
    </footer>
  )
}
