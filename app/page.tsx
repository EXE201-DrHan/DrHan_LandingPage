"use client"

import { Hero } from "@/components/hero"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { DoctorSection } from "@/components/doctor-section"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { ReactNode } from "react"
import { StructuredData, FAQStructuredData } from "@/components/structured-data"
import { generateStructuredData } from "@/lib/seo"

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
  const productStructuredData = generateStructuredData('product', {})
  
  const faqData = [
    {
      question: "What is Nutri-Guardian?",
      answer: "Nutri-Guardian is a specialized nutritionist app designed for people with food allergies. It provides personalized meal plans, ingredient analysis, and expert guidance for safe, allergy-friendly eating."
    },
    {
      question: "How does Nutri-Guardian help with food allergies?",
      answer: "Our app offers ingredient analysis, allergy-safe recipe recommendations, nutritional guidance, and educational resources to help you manage your food allergies safely and effectively."
    },
    {
      question: "Is Nutri-Guardian suitable for all types of food allergies?",
      answer: "Yes, Nutri-Guardian supports various food allergies including common allergens like nuts, dairy, seafood, eggs, and more. Our database covers a wide range of allergenic ingredients."
    },
    {
      question: "Can I get personalized meal plans with Nutri-Guardian?",
      answer: "Absolutely! Nutri-Guardian creates customized meal plans based on your specific allergies, dietary preferences, and nutritional needs to ensure safe and healthy eating."
    }
  ]

  return (
    <div className="min-h-screen">
      <StructuredData data={productStructuredData} />
      <FAQStructuredData questions={faqData} />
      
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