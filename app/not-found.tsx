import Link from 'next/link';
import { Button } from '@/components/ui/button'
import { generateMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = generateMetadata({
  title: 'Page Not Found - Nutri-Guardian',
  description: 'The page you are looking for could not be found. Return to Nutri-Guardian to continue exploring our allergy-friendly nutrition resources.',
  url: '/404',
})

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-teal-50">
      <div className="text-center max-w-md px-6">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full">
              Return to Home
            </Button>
          </Link>
          
          <Link href="/education">
            <Button variant="outline" className="w-full">
              Browse Education Resources
            </Button>
          </Link>
        </div>
        
        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Need help? Contact us at{' '}
            <a 
              href="mailto:nutriguardian_app@gmail.com" 
              className="text-blue-600 hover:underline"
            >
              nutriguardian_app@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
