import { AnimatedHero } from "@/components/animated-hero"
import { ScrollFooter } from "@/components/scroll-footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <AnimatedHero />
      <ScrollFooter />
    </main>
  )
}
