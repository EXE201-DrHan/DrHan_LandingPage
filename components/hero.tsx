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
              Đồng Hành Cùng Bạn
              <br />
              Tránh Xa <span className="text-yellow-400">Dị Ứng Thực Phẩm</span>
              <br />
            </h1>

            <h2 className="text-xl md:text-2xl font-semibold text-blue-200 mb-4">
              Bởi Team Dr. Han - Ứng Dụng Quản Lý Dị Ứng Thực Phẩm Hàng Đầu
            </h2>

            <p className="text-gray-300 text-lg mb-8">
              Tải xuống ứng dụng Nutri Guardian để có kế hoạch dinh dưỡng cá nhân hóa, phát hiện chất gây dị ứng và hướng dẫn chuyên gia từ Đội Dr. Han. Giải pháp quản lý dị ứng thực phẩm đáng tin cậy nhất.
            </p>

            <a href="https://l.facebook.com/l.php?u=https%3A%2F%2Fexpo.dev%2Faccounts%2Fdematto%2Fprojects%2Fnutri-guardian-mobile%2Fbuilds%2F79659857-606f-4f32-a68b-97c600667904&h=AT2qKQHBlz1C3eZdIB6FHfem2bkdBZSMG-hepNyn1yWFOa-ngGrT6uU56siq8Y_uj8wC4O16xv_a_xC_mhHRolJvVezpJQuwkSp9Rbszq4IrzhgCb6CiD8PxGP5DAss&s=1" className="inline-block bg-white/20 backdrop-blur-sm rounded-lg p-3 shadow-lg hover:shadow-xl transition-shadow">
              <img
                src="/images/apk-icon.png"
                alt="Tải APK cho android"
                className="w-[200px] md:w-[240px] h-auto"
              />
            </a>

            <p className="text-gray-400 text-sm mt-4">Hiện có thể tải bản APK cho Android</p>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">CU</span>
                </div>
                <div>
                  <p className="text-white font-medium">Gọi Cho Chúng Tôi</p>
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
