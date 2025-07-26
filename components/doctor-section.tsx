import { Button } from "@/components/ui/button"

export function DoctorSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Dr. Han sẽ lắng nghe!</h2>
            <p className="text-gray-600 text-lg mb-8">
              "Bạn có thể hỏi chúng tôi các câu hỏi về vấn đề dị ứng của bạn, hoặc về Ứng dụng Nutri-Guardian để có thêm thông tin."
            </p>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-full">
              Liên hệ Dr.Han
            </Button>
          </div>

          <div className="relative">
            <div className="bg-gray-200 rounded-2xl overflow-hidden">
              <img
                src="images/comingsoon.png?height=400&width=400"
                alt="Dr. Han"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
