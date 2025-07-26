import Image from "next/image"
import { User, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { articles, Article } from "@/lib/articles"
import { generateMetadata } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = generateMetadata({
  title: "Trung Tâm Giáo Dục Dị Ứng Thực Phẩm - Bài Viết & Tài Nguyên Chuyên Gia",
  description: "Trung tâm giáo dục dị ứng thực phẩm toàn diện với các bài viết chuyên gia về dị ứng phổ biến, dị ứng hải sản, dị ứng sữa, triệu chứng, điều trị và mẹo an toàn cho người bị dị ứng.",
  keywords: [
    "giáo dục dị ứng thực phẩm",
    "bài viết dị ứng",
    "giáo dục an toàn thực phẩm",
    "triệu chứng dị ứng",
    "điều trị dị ứng",
    "dị ứng hải sản",
    "dị ứng sữa",
    "dị ứng thực phẩm phổ biến",
    "tài nguyên dị ứng",
    "giáo dục dinh dưỡng"
  ],
  url: "/education",
  type: "website"
})

const categories = [
  { name: "Dị ứng thực phẩm phổ biến", count: 24 },
  { name: "Dị ứng hải sản", count: 12 },
  { name: "Dị ứng sữa", count: 12 },
  { name: "Triệu chứng da", count: 12 },
  { name: "Điều trị", count: 12 },
  { name: "Giáo dục", count: 12 },
]

const popularArticles = [
  {
    title: "Lợi ích của cà phê buổi sáng.",
    date: "12 tháng 3, 2025",
    image: undefined, // Replace with your real image
  },
  {
    title: "Người châu Á và sữa.",
    date: "12 tháng 3, 2025",
    image: undefined, // Replace with your real image
  },
  {
    title: "Cách xử lý dị ứng thực phẩm",
    date: "12 tháng 3, 2025",
    image: undefined, // Replace with your real image
  },
]

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bài Viết Giáo Dục Dị Ứng</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Luôn cập nhật thông tin với bộ sưu tập toàn diện các bài viết về dị ứng, điều trị và chiến lược phòng ngừa của chúng tôi.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured Article */}
            <Link href={`/education/${articles[0].id}`} className="block">
              <div className="bg-white rounded-2xl shadow p-6 flex flex-col hover:shadow-lg transition-shadow">
                <div className="relative w-full h-56 mb-6 rounded-xl overflow-hidden">
                  <Image src={articles[0].image || "/images/placeholder-image.png"} alt={articles[0].title} fill className="object-cover" />
                </div>
                <span className="text-blue-600 font-medium mb-2">{articles[0].category}</span>
                <h2 className="text-2xl font-bold mb-2">{articles[0].title}</h2>
                <p className="text-gray-600 mb-4">{articles[0].excerpt}</p>
                <div className="flex items-center space-x-3 text-sm text-gray-500">
                  <Image src={"/images/phuchong.jpg"} alt="Dr. Sarah Johnson" width={32} height={32} className="rounded-full" />
                  <span>Dr. Sarah Johnson</span>
                  <span>•</span>
                  <span>Posted on {articles[0].date}</span>
                </div>
              </div>
            </Link>

            {/* Article Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {articles.slice(1).map((article) => (
                <Link key={article.id} href={`/education/${article.id}`} className="block">
                  <div className="bg-white rounded-2xl shadow p-4 flex flex-col hover:shadow-lg transition-shadow">
                    <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden">
                      <Image src={article.image ?? "/images/placeholder-image.png"} alt={article.title} fill className="object-cover" />
                    </div>
                    <span className="text-blue-600 font-medium mb-1">{article.category}</span>
                    <h3 className="text-lg font-bold mb-1">{article.title}</h3>
                    <p className="text-gray-600 mb-2">{article.excerpt}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-auto">
                      <Image src={"/images/phuchong.jpg"} alt="Dr. Sarah Johnson" width={24} height={24} className="rounded-full" />
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Search Bar */}
            <div className="bg-white rounded-xl p-4 shadow flex items-center">
              <Input placeholder="Tìm kiếm bài viết..." className="w-full" />
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">DANH MỤC</h3>
              <div className="space-y-3">
                {categories.map((category, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-gray-600">{category.name}</span>
                    <span className="text-gray-400 text-sm">{category.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Articles */}
            <div className="bg-white rounded-xl p-6 shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">BÀI VIẾT PHỔ BIẾN</h3>
              <div className="space-y-4">
                {popularArticles.map((article, idx) => (
                  <div key={idx} className="flex space-x-3 items-center">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                      <Image src={article.image ?? "/images/placeholder-image.png"} alt={article.title} width={48} height={48} className="object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">{article.title}</h4>
                      <p className="text-xs text-gray-500">{article.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
