import { ProjectCarousel } from "@/components/project-carousel"
import { ScrollFooter } from "@/components/scroll-footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <ProjectCarousel />
  
      <ScrollFooter />
    </main>
  )
}
