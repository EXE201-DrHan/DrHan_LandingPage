// SEO Development Checklist Component
// This component is for development use only to ensure all SEO elements are in place

interface SEOChecklistProps {
  isDevelopment?: boolean
}

export function SEOChecklist({ isDevelopment = process.env.NODE_ENV === 'development' }: SEOChecklistProps) {
  if (!isDevelopment) return null

  const checklistItems = [
    { label: 'Page Title (max 60 chars)', check: () => document.title.length <= 60 && document.title.length > 0 },
    { label: 'Meta Description (120-160 chars)', check: () => {
      const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement
      return meta && meta.content.length >= 120 && meta.content.length <= 160
    }},
    { label: 'H1 Tag Present', check: () => document.querySelectorAll('h1').length === 1 },
    { label: 'Alt Text on Images', check: () => {
      const images = document.querySelectorAll('img')
      return Array.from(images).every(img => img.alt && img.alt.length > 0)
    }},
    { label: 'Open Graph Tags', check: () => {
      return !!document.querySelector('meta[property="og:title"]') &&
             !!document.querySelector('meta[property="og:description"]') &&
             !!document.querySelector('meta[property="og:image"]')
    }},
    { label: 'Twitter Card Tags', check: () => {
      return !!document.querySelector('meta[name="twitter:card"]') &&
             !!document.querySelector('meta[name="twitter:title"]') &&
             !!document.querySelector('meta[name="twitter:description"]')
    }},
    { label: 'Canonical URL', check: () => !!document.querySelector('link[rel="canonical"]') },
    { label: 'Structured Data', check: () => document.querySelectorAll('script[type="application/ld+json"]').length > 0 },
  ]

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <h3 className="font-bold text-sm mb-2">SEO Checklist</h3>
      <div className="space-y-1 text-xs">
        {checklistItems.map((item, index) => {
          const isValid = item.check()
          return (
            <div key={index} className="flex items-center space-x-2">
              <span className={isValid ? 'text-green-600' : 'text-red-600'}>
                {isValid ? '✓' : '✗'}
              </span>
              <span className={isValid ? 'text-gray-700' : 'text-red-600'}>
                {item.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Hook to use the SEO checklist
export function useSEOChecklist() {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
    return null
  }

  return <SEOChecklist />
}
