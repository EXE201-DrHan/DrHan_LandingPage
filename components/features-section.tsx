import { Utensils, Users, TestTube, Handshake } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Utensils,
      title: "Gợi ý thực phẩm",
      description: "Cung cấp kế hoạch ăn uống và gợi ý chế độ ăn phù hợp với tình trạng dị ứng và các hạn chế.",
    },
    {
      icon: Users,
      title: "Thành viên",
      description:
        "Cung cấp các gói thành viên để truy cập tất cả các tính năng đặc biệt bao gồm kế hoạch ăn uống cho một ngày hoặc một tuần, lưu trữ lịch sử để theo dõi dễ dàng, và đưa ra gợi ý trong các gợi ý hỗn hợp.",
    },
    {
      icon: TestTube,
      title: "Thông tin xét nghiệm dị ứng",
      description:
        "Cung cấp thông tin xét nghiệm về cách kiểm tra dị ứng tại nhà hoặc các địa điểm thương mại để xét nghiệm chính xác.",
    },
    {
      icon: Handshake,
      title: "Hợp tác",
      description:
        "Chúng tôi có các nhà hàng phổ biến nhất và thuốc từ bệnh viện để tạo ra một thực đơn đa dạng và toàn diện.",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nutri-Guardian sẽ là đối tác tốt nhất của bạn!!</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
