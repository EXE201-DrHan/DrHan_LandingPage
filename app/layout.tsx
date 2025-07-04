import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClientWrapper } from "@/components/client-wrapper"
import { generateMetadata, defaultSEO, generateStructuredData } from "@/lib/seo"
import { LogoStructuredData } from "@/components/structured-data"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export const metadata: Metadata = {
  ...generateMetadata(defaultSEO),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/images/logo.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' }
    ],
    apple: [
      { url: '/images/logo.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon.ico'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const websiteStructuredData = generateStructuredData('website', {})
  const organizationStructuredData = generateStructuredData('organization', {})

  return (
    <html lang="en">
      <head>
        {/* Favicon and Icons for Search Results */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/images/logo.png" sizes="192x192" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo.png" sizes="180x180" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="AI4lG_LLUdPfG8zJqGyKxXJqqP8qhmx5wGjDeWhvF90" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <LogoStructuredData />
      </head>
      <body className={inter.className}>
        <ClientWrapper>
          <Header />
          <main>{children}</main>
          <Footer />
        </ClientWrapper>
      </body>
    </html>
  )
}
