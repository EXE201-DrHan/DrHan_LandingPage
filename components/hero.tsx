import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[600px] bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/placeholder.svg?height=600&width=1200')",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex items-center justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="text-white font-medium">Nutri-Guardian</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Your Personal Ally
              <br />
              In <span className="text-yellow-400">Allergy-Friendly</span>
              <br />
              <span className="text-yellow-400">Eating</span>
            </h1>

            <p className="text-gray-300 text-lg mb-8">Nutritionist for allergy sufferers</p>

            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-full flex items-center space-x-2">
              <span>Download</span>
              <Play className="w-5 h-5 fill-current" />
            </Button>

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
                  <p className="text-gray-300 text-sm">+84 123 456 789</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">EM</span>
                </div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-300 text-sm">contact@nutriguardian.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
