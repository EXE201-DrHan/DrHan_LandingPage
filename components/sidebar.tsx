export function Sidebar() {
  const categories = [
    { name: "Common food allergy", count: 24 },
    { name: "Seasonal allergy", count: 18 },
    { name: "Skin allergy", count: 15 },
    { name: "Skin symptoms", count: 12 },
    { name: "Treatment", count: 20 },
    { name: "Education", count: 16 },
  ]

  const popularArticles = [
    {
      title: "Benefit of morning coffee",
      date: "March 5, 2025",
    },
    {
      title: "Milk and risk",
      date: "March 3, 2025",
    },
    {
      title: "How to handle food allergies",
      date: "March 1, 2025",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">CATEGORIES</h3>
        <div className="space-y-3">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-600">{category.name}</span>
              <span className="text-gray-400 text-sm">{category.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">POPULAR ARTICLES</h3>
        <div className="space-y-4">
          {popularArticles.map((article, index) => (
            <div key={index} className="flex space-x-3">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">{article.title}</h4>
                <p className="text-xs text-gray-500">{article.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
