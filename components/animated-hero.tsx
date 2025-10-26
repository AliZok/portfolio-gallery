"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ProjectCarousel } from "@/components/project-carousel"
import { ArrowRight, Code, Palette, Zap, Globe, Smartphone } from "lucide-react"

const slogans = [
  {
    title: "Frontend Development",
    subtitle: "Crafting Digital Experiences",
    description: "Building responsive, interactive web applications that engage users and drive business growth.",
    icon: Code,
    color: "text-yellow-500"
  },
  {
    title: "Modern Web Design",
    subtitle: "Beautiful & Functional",
    description: "Creating stunning visual designs that combine aesthetics with seamless user experience.",
    icon: Palette,
    color: "text-yellow-500"
  },
  {
    title: "Performance Optimization",
    subtitle: "Lightning Fast",
    description: "Optimizing applications for speed and efficiency to deliver exceptional user experiences.",
    icon: Zap,
    color: "text-yellow-500"
  },
  {
    title: "Responsive Design",
    subtitle: "Perfect on Every Device",
    description: "Ensuring your web applications look and work perfectly across all devices and screen sizes.",
    icon: Smartphone,
    color: "text-yellow-500"
  },
  {
    title: "Web Innovation",
    subtitle: "Cutting-Edge Solutions",
    description: "Leveraging the latest technologies to build innovative web solutions for tomorrow's challenges.",
    icon: Globe,
    color: "text-yellow-500"
  }
]

export function AnimatedHero() {
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentSloganIndex((prev) => (prev + 1) % slogans.length)
        setIsVisible(true)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const currentSlogan = slogans[currentSloganIndex]
  const IconComponent = currentSlogan.icon

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Side - Animated Content */}
          <div className="space-y-8">
            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  Frontend
                </span>
                <br />
                <span className="text-white">Developer</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-md">
                Transforming ideas into exceptional digital experiences
              </p>
            </div>

            {/* Animated Slogan Section */}
            <div className="space-y-6">
              <div className="h-32 flex items-center">
                <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-yellow-500/20 backdrop-blur-sm ${currentSlogan.color}`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white">
                        {currentSlogan.title}
                      </h2>
                      <p className={`text-lg font-medium ${currentSlogan.color}`}>
                        {currentSlogan.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                    {currentSlogan.description}
                  </p>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="flex gap-2">
                {slogans.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentSloganIndex 
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

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">3+</div>
                <div className="text-sm text-gray-400">Years</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-gray-400">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Side - Project Carousel */}
          <div className="relative">
            <ProjectCarousel />
          </div>
        </div>
      </div>
    </div>
  )
}
