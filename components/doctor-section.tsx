import { Button } from "@/components/ui/button"

export function DoctorSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Dr. Han will listen!</h2>
            <p className="text-gray-600 text-lg mb-8">
              "You can ask us questions about your allergic problem, or about the Nutri-Guardian App to get more info."
            </p>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-full">
              Contact Dr.Han
            </Button>
          </div>

          <div className="relative">
            <div className="bg-gray-200 rounded-2xl overflow-hidden">
              <img src="/placeholder.svg?height=400&width=400" alt="Dr. Han" className="w-full h-96 object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
