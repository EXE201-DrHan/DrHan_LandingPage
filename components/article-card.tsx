import Link from "next/link"
import Image from "next/image"
import { Calendar, User } from "lucide-react"

interface Article {
  id: number
  title: string
  excerpt: string
  author: string
  date: string
  category: string
  image: string
}

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/education/${article.id}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="relative h-48">
          <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
          <div className="absolute top-4 left-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{article.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
