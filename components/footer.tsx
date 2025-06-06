import Link from "next/link"
import { Facebook, Linkedin, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-semibold text-gray-900">Nutri-Guardian</span>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-4">Updates right to your inbox</p>
              <div className="flex space-x-2">
                <Input type="email" placeholder="Email Address" className="flex-1" />
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">Send</Button>
              </div>
            </div>

            <p className="text-sm text-gray-500">© NUTRI-GUARDIAN 2025</p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-gray-500 hover:text-gray-700">
                Privacy policy
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700">
                Terms of use
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Our goal</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Allergy</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Treatments
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Health
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-900">
                  Information
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-gray-600">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-600">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-600">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-600">
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
