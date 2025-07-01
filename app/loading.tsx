export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-teal-400 rounded-full animate-spin animate-reverse mx-auto"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Nutri-Guardian</h2>
        <p className="text-gray-600">Preparing your allergy-friendly experience...</p>
      </div>
    </div>
  )
}
