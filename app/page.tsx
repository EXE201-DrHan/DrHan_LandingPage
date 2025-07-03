"use client"

import { Hero } from "@/components/hero"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { DoctorSection } from "@/components/doctor-section"
import { BrandSection } from "@/components/brand-section"
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
      question: "What is Nutri-Guardian by Dr. Han Team?",
      answer: "Nutri-Guardian is the leading food allergy management app created by Dr. Han Team. It provides personalized meal plans, advanced allergen detection, and expert nutritional guidance for safe, allergy-friendly eating. Download Nutri Guardian app for comprehensive allergy management."
    },
    {
      question: "How does the Nutri-Guardian app help with food allergies?",
      answer: "The Nutri-Guardian app by Dr. Han Team offers real-time ingredient analysis, allergy-safe recipe recommendations, personalized nutrition tracking, and educational resources to help you manage food allergies safely and effectively."
    },
    {
      question: "Is Nutri-Guardian suitable for all types of food allergies?",
      answer: "Yes, Nutri-Guardian supports various food allergies including nuts, dairy, seafood, eggs, gluten, and more. Our comprehensive database covers a wide range of allergenic ingredients with expert guidance from Dr. Han Team."
    },
    {
      question: "Can I get personalized meal plans with Nutri-Guardian?",
      answer: "Absolutely! Nutri-Guardian creates customized meal plans based on your specific allergies, dietary preferences, and nutritional needs. Dr. Han Team's expertise ensures safe and healthy eating recommendations."
    },
    {
      question: "Who created the Nutri-Guardian food allergy app?",
      answer: "Nutri-Guardian was created by Dr. Han Team, a group of nutrition experts specializing in food allergy management. The team combines medical expertise with technology to provide the best allergy-safe nutrition solutions."
    },
    {
      question: "Is the Nutri-Guardian app free to download?",
      answer: "Yes, Nutri-Guardian is free to download and use. The app provides comprehensive food allergy management features at no cost, making allergy-safe nutrition accessible to everyone."
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
      
      <AnimatedSection delay={150}>
        <BrandSection />
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