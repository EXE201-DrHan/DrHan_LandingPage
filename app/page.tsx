"use client"

import { Hero } from "@/components/hero"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { DoctorSection } from "@/components/doctor-section"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { ReactNode } from "react"

// Properly typed props interface
interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  className?: string
}

// Animated wrapper component with proper types
function AnimatedSection({ children, delay = 0, className = "" }: AnimatedSectionProps) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 })
  
  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero section - no animation needed as it's above fold */}
      <Hero />
      
      <AnimatedSection delay={100}>
        <StatsSection />
      </AnimatedSection>
      
      <AnimatedSection delay={200}>
        <FeaturesSection />
      </AnimatedSection>
      
      <AnimatedSection delay={300}>
        <TestimonialSection />
      </AnimatedSection>
      
      <AnimatedSection delay={400}>
        <DoctorSection />
      </AnimatedSection>
      
    </div>
  )
}