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
    title: "Personal Branding",
    description: "Professional brand identity design with modern aesthetics",
    image: "/personal-branding.PNG",
    link: "https://example.com/project1",
    tags: ["Branding", "Design", "Identity"],
  },
  {
    id: 2,
    title: "Carousel Gallery",
    description: "Dynamic image gallery with smooth carousel transitions",
    image: "/carousel.PNG",
    link: "https://example.com/project2",
    tags: ["UI/UX", "React", "Design"],
  },
  {
    id: 3,
    title: "Cars Gallery",
    description: "Showcase automotive photography and elegant presentation",
    image: "/cars-gallery.PNG",
    link: "https://example.com/project3",
    tags: ["Photography", "Gallery", "Design"],
  },
  {
    id: 4,
    title: "Woman Salon",
    description: "Beautiful salon interface with elegant design elements",
    image: "/woman-salon.PNG",
    link: "https://example.com/project4",
    tags: ["UI/UX", "Web Design", "Beauty"],
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
    }, 2000)

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
      className="relative h-[600px] w-full overflow-hidden bg-background rounded-2xl shadow-2xl"
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


        {/* Main Content */}
        <div className="flex flex-1 flex-col justify-end p-6">
          <div className="max-w-2xl space-y-4">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {currentProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 font-mono text-xs text-yellow-400 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h2 className="font-sans text-3xl font-bold leading-tight text-white md:text-4xl">
              {currentProject.title}
            </h2>

            {/* Description */}
            <p className="font-sans text-base leading-relaxed text-white/80 md:text-lg">{currentProject.description}</p>

            {/* CTA Button */}
            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="group bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 font-sans text-sm font-semibold text-black shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
        <div className="flex items-center justify-between p-6">
          {/* Dots Navigation */}
          <div className="flex gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === currentIndex ? "w-8 bg-gradient-to-r from-yellow-400 to-yellow-600" : "w-4 bg-white/30 hover:bg-white/50",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Navigation */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="h-12 w-12 rounded-xl border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous project</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="h-12 w-12 rounded-xl border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next project</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}