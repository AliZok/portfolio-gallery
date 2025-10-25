"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Project {
  id: number
  title: string
  description: string
  image: string
  link: string
  tags: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution with seamless checkout experience",
    image: "/modern-ecommerce-interface.png",
    link: "https://example.com/project1",
    tags: ["Next.js", "TypeScript", "Stripe"],
  },
  {
    id: 2,
    title: "Portfolio Dashboard",
    description: "Real-time analytics dashboard for portfolio management",
    image: "/analytics-dashboard-dark-theme.png",
    link: "https://example.com/project2",
    tags: ["React", "D3.js", "TailwindCSS"],
  },
  {
    id: 3,
    title: "Social Media App",
    description: "Connect and share moments with friends and family",
    image: "/social-media-app-interface.png",
    link: "https://example.com/project3",
    tags: ["Next.js", "Supabase", "Framer Motion"],
  },
  {
    id: 4,
    title: "Task Management Tool",
    description: "Streamline your workflow with intuitive task organization",
    image: "/task-management-kanban.png",
    link: "https://example.com/project4",
    tags: ["React", "Node.js", "MongoDB"],
  },
]

export function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right")
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setSlideDirection("right")
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious()
      } else if (e.key === "ArrowRight") {
        goToNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const goToNext = () => {
    setIsAutoPlaying(false)
    setSlideDirection("right")
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setSlideDirection("left")
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setSlideDirection(index > currentIndex ? "right" : "left")
    setCurrentIndex(index)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        goToNext()
      } else {
        goToPrevious()
      }
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      touchEndX.current = e.clientX
    }
  }

  const handleMouseUp = () => {
    const swipeDistance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        goToNext()
      } else {
        goToPrevious()
      }
    }
  }

  const currentProject = projects[currentIndex]

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-background"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={cn(
              "absolute inset-0 transition-all duration-700 ease-out",
              index === currentIndex
                ? "translate-x-0 opacity-100"
                : index < currentIndex
                  ? slideDirection === "right"
                    ? "-translate-x-full opacity-0"
                    : "translate-x-full opacity-0"
                  : slideDirection === "right"
                    ? "translate-x-full opacity-0"
                    : "-translate-x-full opacity-0",
            )}
          >
            <img src={project.image || "/placeholder.svg"} alt={project.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-6 md:p-8">
          <div>
            <h1 className="font-sans text-2xl font-bold tracking-tight text-white md:text-3xl">Portfolio</h1>
            <p className="mt-1 font-sans text-sm text-white/70">Frontend Developer</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-accent">{String(currentIndex + 1).padStart(2, "0")}</span>
            <span className="text-white/50">/</span>
            <span className="font-mono text-sm text-white/50">{String(projects.length).padStart(2, "0")}</span>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 flex-col justify-end p-6 md:p-12 lg:p-16">
          <div className="max-w-3xl space-y-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {currentProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h2 className="font-sans text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              {currentProject.title}
            </h2>

            {/* Description */}
            <p className="font-sans text-lg leading-relaxed text-white/80 md:text-xl">{currentProject.description}</p>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="group bg-accent font-sans text-base font-semibold text-black hover:bg-accent/90"
              >
                <a
                  href={currentProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  View Project
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between p-6 md:p-8">
          {/* Dots Navigation */}
          <div className="flex gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === currentIndex ? "w-12 bg-accent" : "w-8 bg-white/30 hover:bg-white/50",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Navigation */}
          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="h-16 w-16 rounded-xl border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="h-7 w-7" />
              <span className="sr-only">Previous project</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="h-16 w-16 rounded-xl border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
            >
              <ChevronRight className="h-7 w-7" />
              <span className="sr-only">Next project</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
