import { Button } from "@/components/ui/button"
import { Hexagon } from "lucide-react"
import { motion } from "motion/react"

export function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-4 right-0 left-0 z-50 flex w-full justify-center px-4"
    >
      <div className="flex h-14 w-full max-w-5xl items-center justify-between rounded-full border border-border/50 bg-background/40 px-6 shadow-[0_0_15px_rgba(var(--primary),0.2)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/20">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 animate-pulse rounded-full bg-primary/40 blur-md"></div>
            <Hexagon className="relative h-6 w-6 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
          </div>
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text font-bold tracking-wider text-transparent">
            Kuli UI
          </span>
        </div>
        <nav className="hidden gap-8 text-sm font-medium md:flex">
          <a
            href="#features"
            className="text-muted-foreground transition-all hover:text-primary hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]"
          >
            Features
          </a>
          <a
            href="#docs"
            className="text-muted-foreground transition-all hover:text-primary hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]"
          >
            Documentation
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <Button className="rounded-full shadow-[0_0_15px_rgba(var(--primary),0.4)] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(var(--primary),0.6)] active:scale-95">
            Get Started
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
