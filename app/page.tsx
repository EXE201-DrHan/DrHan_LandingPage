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
      question: "Nutri-Guardian của Đội Dr. Han là gì?",
      answer: "Nutri-Guardian là ứng dụng quản lý dị ứng thực phẩm hàng đầu được tạo ra bởi Đội Dr. Han. Ứng dụng cung cấp kế hoạch ăn uống cá nhân hóa, phát hiện chất gây dị ứng tiên tiến và hướng dẫn dinh dưỡng chuyên gia để ăn uống an toàn, thân thiện với dị ứng. Tải xuống ứng dụng Nutri Guardian để quản lý dị ứng toàn diện."
    },
    {
      question: "Ứng dụng Nutri-Guardian giúp gì trong việc quản lý dị ứng thực phẩm?",
      answer: "Ứng dụng Nutri-Guardian của Đội Dr. Han cung cấp phân tích thành phần theo thời gian thực, gợi ý công thức nấu ăn an toàn cho dị ứng, theo dõi dinh dưỡng cá nhân hóa và tài nguyên giáo dục để giúp bạn quản lý dị ứng thực phẩm một cách an toàn và hiệu quả."
    },
    {
      question: "Nutri-Guardian có phù hợp với mọi loại dị ứng thực phẩm không?",
      answer: "Có, Nutri-Guardian hỗ trợ nhiều loại dị ứng thực phẩm bao gồm hạt, sữa, hải sản, trứng, gluten và nhiều hơn nữa. Cơ sở dữ liệu toàn diện của chúng tôi bao gồm nhiều thành phần gây dị ứng với hướng dẫn chuyên gia từ Đội Dr. Han."
    },
    {
      question: "Tôi có thể nhận kế hoạch ăn uống cá nhân hóa với Nutri-Guardian không?",
      answer: "Tuyệt đối! Nutri-Guardian tạo ra các kế hoạch ăn uống tùy chỉnh dựa trên các dị ứng cụ thể, sở thích ăn uống và nhu cầu dinh dưỡng của bạn. Chuyên môn của Đội Dr. Han đảm bảo các gợi ý ăn uống an toàn và lành mạnh."
    },
    {
      question: "Ai đã tạo ra ứng dụng dị ứng thực phẩm Nutri-Guardian?",
      answer: "Nutri-Guardian được tạo ra bởi Đội Dr. Han, một nhóm các chuyên gia dinh dưỡng chuyên về quản lý dị ứng thực phẩm. Đội ngũ kết hợp chuyên môn y tế với công nghệ để cung cấp các giải pháp dinh dưỡng an toàn dị ứng tốt nhất."
    },
    {
      question: "Ứng dụng Nutri-Guardian có miễn phí để tải xuống không?",
      answer: "Có, Nutri-Guardian miễn phí để tải xuống và sử dụng. Ứng dụng cung cấp các tính năng quản lý dị ứng thực phẩm toàn diện miễn phí, làm cho dinh dưỡng an toàn dị ứng có thể tiếp cận được với mọi người."
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