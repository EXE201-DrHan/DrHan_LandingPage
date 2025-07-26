import { Users, HeartHandshake, Globe2 } from "lucide-react"
import Image from 'next/image'
import { generateMetadata } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = generateMetadata({
  title: "Về Nutri-Guardian - Ứng Dụng Quản Lý Dị Ứng Thực Phẩm của Đội Dr. Han",
  description: "Tìm hiểu về Nutri-Guardian của Đội Dr. Han, ứng dụng quản lý dị ứng thực phẩm hàng đầu. Khám phá sứ mệnh của chúng tôi trong việc trao quyền cho những người có dị ứng thực phẩm thông qua công nghệ dinh dưỡng sáng tạo, hướng dẫn chuyên gia và các giải pháp ăn uống an toàn dị ứng toàn diện.",
  keywords: [
    "về nutri-guardian",
    "đội dr han",
    "người tạo nutri guardian",
    "chuyên gia dị ứng thực phẩm",
    "nhà phát triển ứng dụng dinh dưỡng",
    "sứ mệnh thân thiện dị ứng",
    "đổi mới sức khỏe",
    "chuyên gia an toàn thực phẩm",
    "đội ngũ nutri guardian",
    "về ứng dụng nutri guardian",
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
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Về Nutri-Guardian</h1>
          <h2 className="text-xl font-semibold mb-4 text-blue-600 flex items-center justify-center gap-2">
            <Users className="w-6 h-6 text-blue-400" /> Được tạo bởi Đội Dr. Han
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            Chào mừng đến với Nutri-Guardian! Chúng tôi là Đội Dr. Han, những chuyên gia dị ứng thực phẩm đầy đam mê, tận tâm làm cho việc ăn uống thân thiện với dị ứng trở nên dễ tiếp cận, an toàn và thú vị cho mọi người thông qua ứng dụng Nutri Guardian sáng tạo của chúng tôi.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-6">
            <div className="flex flex-col items-center">
              <HeartHandshake className="w-10 h-10 text-teal-400 mb-2" />
              <div className="font-semibold text-gray-900">Sứ Mệnh Của Chúng Tôi</div>
              <div className="text-gray-600 text-sm">Trao quyền cho những người có dị ứng thực phẩm để sống cuộc sống khỏe mạnh hơn, hạnh phúc hơn thông qua giáo dục, hỗ trợ và đổi mới.</div>
            </div>
            <div className="flex flex-col items-center">
              <Globe2 className="w-10 h-10 text-blue-400 mb-2" />
              <div className="font-semibold text-gray-900">Tầm Nhìn Của Chúng Tôi</div>
              <div className="text-gray-600 text-sm">Một thế giới nơi mọi người có thể thưởng thức thức ăn một cách an toàn, bất kể hạn chế chế độ ăn uống hay dị ứng.</div>
            </div>
          </div>
          <p className="text-gray-500">
            Hãy tham gia cùng chúng tôi trong hành trình làm cho thế giới trở thành một nơi an toàn hơn, bao dung hơn cho tất cả mọi người. Cùng nhau, chúng ta có thể tạo ra sự khác biệt!
          </p>
        </div>
      </div>
    </div>
  )
}