"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Header() {
  const pathname = usePathname();
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/images/logo.png"
              alt="Nutri Guardian Logo"
              className="w-10 h-10 md:w-16 md:h-16 object-contain rounded-full"
            />
            <span className="font-semibold text-gray-900">Nutri-Guardian</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/about" className={pathname === "/about" ? "text-blue-600 hover:text-blue-700 font-medium" : "text-gray-600 hover:text-gray-900"}>
              Về Chúng Tôi
            </Link>
            <Link href="/education" className={pathname === "/education" ? "text-blue-600 hover:text-blue-700 font-medium" : "text-gray-600 hover:text-gray-900"}>
              Giáo Dục
            </Link>
            <Link href="/update" className={pathname === "/update" ? "text-blue-600 hover:text-blue-700 font-medium" : "text-gray-600 hover:text-gray-900"}>
              Cập Nhật
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/register" className="text-gray-600 hover:text-gray-900">
              Đăng Ký
            </Link>
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700">Đăng Nhập</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
