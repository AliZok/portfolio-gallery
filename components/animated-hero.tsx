"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ProjectCarousel } from "@/components/project-carousel"
import { ArrowRight, Sparkles, Layout, Grid, Scissors } from "lucide-react"

interface ProjectInfo {
  title: string
  subtitle: string
  description: string
  icon: typeof Sparkles
  color: string
}

const projectInfos: ProjectInfo[] = [
  {
    title: "Personal Branding",
    subtitle: "Brand Identity Design",
    description: "Creating professional brand identities with modern aesthetics that represent your unique vision.",
    icon: Sparkles,
    color: "text-yellow-500"
  },
  {
    title: "Carousel Gallery",
    subtitle: "Dynamic UI Components",
    description: "Building interactive image galleries with smooth carousel transitions and elegant animations.",
    icon: Grid,
    color: "text-yellow-500"
  },
  {
    title: "Cars Gallery",
    subtitle: "Photography Showcase",
    description: "Showcasing automotive photography with elegant presentation and attention to detail.",
    icon: Layout,
    color: "text-yellow-500"
  },
  {
    title: "Woman Salon",
    subtitle: "Elegant Interfaces",
    description: "Designing beautiful salon interfaces with elegant design elements and perfect user experience.",
    icon: Scissors,
    color: "text-yellow-500"
  },
]

export function AnimatedHero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (isHovering) return

    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % projectInfos.length)
        setIsVisible(true)
      }, 300)
    }, 6000)

    return () => clearInterval(interval)
  }, [isHovering])

  const handleIndexChange = (index: number) => {
    setIsVisible(false)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsVisible(true)
    }, 300)
  }

  const currentInfo = projectInfos[currentIndex]
  const IconComponent = currentInfo.icon

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Side - Animated Content */}
          <div className="space-y-8">
            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                <div className="text-white">
                  ALI ZOKAEI
                </div>
             
                <div className="text-xs lg:text-sm text-gray-400 font-normal">as</div>

                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Developer</div>
              </h1>
              <p className="text-xl text-gray-300 max-w-md">
                Transforming ideas into exceptional digital experiences
              </p>
            </div>

            {/* Animated Slogan Section */}
            <div className="space-y-6">
              <div 
                className="h-32 flex items-center"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-yellow-500/20 backdrop-blur-sm ${currentInfo.color}`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white">
                        {currentInfo.title}
                      </h2>
                      <p className={`text-lg font-medium ${currentInfo.color}`}>
                        {currentInfo.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                    {currentInfo.description}
                  </p>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="flex gap-2">
                {projectInfos.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'w-8 bg-gradient-to-r from-yellow-400 to-yellow-600' 
                        : 'w-4 bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 font-semibold px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300"
              >
                Get In Touch
              </Button>
            </div>

          </div>

          {/* Right Side - Project Carousel */}
          <div className="relative">
            <ProjectCarousel 
              currentIndex={currentIndex}
              onIndexChange={handleIndexChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
