import { Users, HeartHandshake, Globe2 } from "lucide-react"
import Image from 'next/image'
import { generateMetadata } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = generateMetadata({
  title: "About Nutri-Guardian - Dr. Han Team's Food Allergy Management App",
  description: "Learn about Nutri-Guardian by Dr. Han Team, the leading food allergy management app. Discover our mission to empower people with food allergies through innovative nutrition technology, expert guidance, and comprehensive allergy-safe eating solutions.",
  keywords: [
    "about nutri-guardian",
    "dr han team",
    "nutri guardian creators",
    "food allergy experts",
    "nutrition app developers",
    "allergy-friendly mission",
    "health innovation",
    "food safety experts",
    "nutri guardian team",
    "about nutri guardian app",
    "dr han nutri guardian"
  ],
  url: "/about",
  type: "website"
})

export default function AboutPage() {
  return (
    <div className="min-h-screen relative">
      <Image
        src="/images/logo_better.png"
        alt="Background"
        fill
        className="object-cover"
        priority
        quality={100}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-teal-50/30" />
      
      <div className="relative flex flex-col items-center justify-center min-h-screen py-20 px-4">
        <div className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-10 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">About Nutri-Guardian</h1>
          <h2 className="text-xl font-semibold mb-4 text-blue-600 flex items-center justify-center gap-2">
            <Users className="w-6 h-6 text-blue-400" /> Created by Dr. Han Team
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            Welcome to Nutri-Guardian! We are Dr. Han Team, passionate food allergy experts dedicated to making allergy-friendly eating accessible, safe, and enjoyable for everyone through our innovative Nutri Guardian app.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-6">
            <div className="flex flex-col items-center">
              <HeartHandshake className="w-10 h-10 text-teal-400 mb-2" />
              <div className="font-semibold text-gray-900">Our Mission</div>
              <div className="text-gray-600 text-sm">Empowering people with food allergies to live healthier, happier lives through education, support, and innovation.</div>
            </div>
            <div className="flex flex-col items-center">
              <Globe2 className="w-10 h-10 text-blue-400 mb-2" />
              <div className="font-semibold text-gray-900">Our Vision</div>
              <div className="text-gray-600 text-sm">A world where everyone can enjoy food safely, regardless of dietary restrictions or allergies.</div>
            </div>
          </div>
          <p className="text-gray-500">
            Join us on our journey to make the world a safer, more inclusive place for all. Together, we can make a difference!
          </p>
        </div>
      </div>
    </div>
  )
}