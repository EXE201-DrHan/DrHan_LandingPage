import { Hero } from "@/components/hero"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { DoctorSection } from "@/components/doctor-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <StatsSection />
      <FeaturesSection />
      <TestimonialSection />
      <DoctorSection />
    </div>
  )
}
