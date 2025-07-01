import type { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nutri-guardian.com'
const defaultImage = '/images/logo_better.png'

export function generateMetadata({
  title,
  description,
  keywords = [],
  image = defaultImage,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section
}: SEOConfig): Metadata {
  const fullTitle = title.includes('Nutri-Guardian') ? title : `${title} | Nutri-Guardian`
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : [{ name: 'Dr. Han Team' }],
    creator: 'Dr. Han Team',
    publisher: 'Nutri-Guardian',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: 'Nutri-Guardian',
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: type === 'product' ? 'website' : type,
      publishedTime,
      modifiedTime,
      section,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullImage],
      creator: '@nutriguardian',
      site: '@nutriguardian',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
    },
  }

  return metadata
}

export const defaultSEO: SEOConfig = {
  title: 'Nutri-Guardian - Your Personal Ally In Allergy-Friendly Eating',
  description: 'Nutri-Guardian is your trusted nutritionist app for allergy sufferers. Get personalized meal plans, ingredient analysis, and expert guidance for safe, healthy eating with food allergies. Download the Nutri Guardian app today for allergy-safe nutrition.',
  keywords: [
    'nutri guardian',
    'nutri-guardian',
    'nutriguardian',
    'nutri guardian app',
    'food allergies',
    'nutrition app',
    'allergy-friendly eating',
    'meal planning',
    'food safety',
    'nutritionist app',
    'dietary restrictions',
    'health app',
    'allergen detection',
    'safe eating',
    'food intolerance',
    'healthy lifestyle',
    'allergy nutrition',
    'food allergy management',
    'dr han team',
    'allergy-safe recipes'
  ],
}

export function generateStructuredData(type: 'website' | 'article' | 'organization' | 'product', data: any) {
  const baseData = {
    '@context': 'https://schema.org',
  }

  switch (type) {
    case 'website':
      return {
        ...baseData,
        '@type': 'WebSite',
        name: 'Nutri-Guardian',
        description: defaultSEO.description,
        url: baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Dr. Han Team',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/images/logo_better.png`,
          },
        },
      }

    case 'organization':
      return {
        ...baseData,
        '@type': 'Organization',
        name: 'Nutri-Guardian',
        description: defaultSEO.description,
        url: baseUrl,
        logo: `${baseUrl}/images/logo_better.png`,
        sameAs: [
          'https://facebook.com/nutriguardian',
          'https://twitter.com/nutriguardian',
          'https://instagram.com/nutriguardian',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          email: 'support@nutri-guardian.com',
        },
      }

    case 'product':
      return {
        ...baseData,
        '@type': 'SoftwareApplication',
        name: 'Nutri-Guardian',
        description: defaultSEO.description,
        url: baseUrl,
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Android, iOS',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '1250',
        },
      }

    case 'article':
      return {
        ...baseData,
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        author: {
          '@type': 'Person',
          name: data.author || 'Dr. Han Team',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Nutri-Guardian',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/images/logo_better.png`,
          },
        },
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime || data.publishedTime,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url,
        },
        image: data.image,
      }

    default:
      return baseData
  }
}
