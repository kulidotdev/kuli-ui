import { Button } from "@/components/ui/button"
import { ArrowRight, Terminal, Sparkles } from "lucide-react"
import { motion } from "motion/react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-40 flex flex-col items-center justify-center min-h-screen">
      {/* Animated Glowing Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--primary),0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--primary),0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* Glow orb */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10"
      ></motion.div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center justify-center"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium mb-8 text-primary shadow-[0_0_15px_rgba(var(--primary),0.2)] backdrop-blur-md cursor-pointer"
          >
            <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
            Introducing kuli-ui v1.0
          </motion.div>
          
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl mb-6">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50">Build modern web apps</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60 drop-shadow-[0_0_15px_rgba(var(--primary),0.6)] mt-2">faster than ever.</span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10 leading-relaxed font-light"
          >
            Beautifully designed, accessible, and customizable components that you can copy and paste into your apps. Open source and free forever.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto"
          >
            <Button size="lg" className="h-14 px-8 rounded-full text-base shadow-[0_0_20px_rgba(var(--primary),0.5)] transition-all hover:shadow-[0_0_35px_rgba(var(--primary),0.8)] hover:scale-105 active:scale-95 group relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                Start Building <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-base border-primary/50 text-foreground bg-background/30 backdrop-blur hover:bg-primary/10 hover:border-primary transition-all hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:scale-105 active:scale-95 group">
              <Terminal className="mr-2 h-4 w-4 text-primary group-hover:animate-pulse" /> pnpm create kuli-app
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
