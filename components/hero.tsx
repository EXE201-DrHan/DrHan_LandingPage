import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[600px] bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/images/placeholder-image.png?height=600&width=1200')",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-center justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-4 mb-8">
              <img
                src="/images/logo.png"
                alt="Nutri Guardian Logo"
                className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-contain"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Your Personal Ally
              <br />
              In <span className="text-yellow-400">Allergy-Friendly</span>
              <br />
              <span className="text-yellow-400">Eating</span>
            </h1>

            <p className="text-gray-300 text-lg mb-8">Nutritionist for allergy sufferers</p>

            <a href="#" className="inline-block">
              <img
                src="/images/chplay.png"
                alt="Download on CH Play"
                className="w-[200px] md:w-[240px] h-auto"
              />
            </a>

            <p className="text-gray-400 text-sm mt-4">Now available on CH Play</p>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">CU</span>
                </div>
                <div>
                  <p className="text-white font-medium">Call Us</p>
                  <p className="text-gray-300 text-sm">0903 744 380</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">EM</span>
                </div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-300 text-sm">nutriguardian_app@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
