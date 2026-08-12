import { Header } from "./components/landing/header"
import { HeroSection } from "./components/landing/hero-section"
import { AuthShowcase } from "./components/landing/auth-showcase"
import { DashboardShowcase } from "./components/landing/dashboard-showcase"
import { Footer } from "./components/landing/footer"

export function App() {
  return (
    <div className="flex min-h-svh flex-col font-sans selection:bg-primary/20">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AuthShowcase />
        <DashboardShowcase />
      </main>
      <Footer />
    </div>
  )
}

export default App
