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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nutriguardian.xyz'
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
  title: 'Nutri-Guardian - Food Allergy Management App | Dr. Han Team',
  description: 'Nutri-Guardian by Dr. Han Team - The leading food allergy management app. Get personalized nutrition plans, allergen detection, and expert guidance for safe eating. Download Nutri Guardian app for comprehensive allergy-friendly nutrition support.',
  keywords: [
    'nutri guardian',
    'nutri-guardian', 
    'nutriguardian',
    'nutri guardian app',
    'nutri guardian food allergy',
    'dr han team nutri guardian',
    'food allergy app',
    'allergy management app',
    'nutrition app for allergies',
    'allergen detection app',
    'food safety app',
    'allergy-friendly eating',
    'personalized nutrition',
    'meal planning allergies',
    'food intolerance app',
    'dietary restrictions app',
    'nutritionist app',
    'health app',
    'safe eating app',
    'allergy nutrition guidance',
    'food allergy management',
    'allergy-safe recipes',
    'ingredient checker',
    'nutrition tracker allergies'
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
        name: 'Nutri-Guardian - Food Allergy Management App',
        alternateName: ['Nutri Guardian', 'NutriGuardian', 'Nutri-Guardian App'],
        description: defaultSEO.description,
        url: baseUrl,
        keywords: 'nutri guardian, food allergy app, nutrition app, allergy management, dr han team',
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
            width: 512,
            height: 512,
            caption: 'Nutri-Guardian Logo by Dr. Han Team'
          },
        },
        sameAs: [
          'https://nutriguardian.xyz',
          'https://nutriguardian.vercel.app',
          'https://facebook.com/nutriguardian',
          'https://twitter.com/nutriguardian',
          'https://instagram.com/nutriguardian',
        ],
      }

    case 'organization':
      return {
        ...baseData,
        '@type': 'Organization',
        name: 'Dr. Han Team - Nutri-Guardian',
        alternateName: 'Nutri Guardian',
        description: 'Creators of Nutri-Guardian, the leading food allergy management app. Expert team providing nutritional guidance and allergy-safe eating solutions.',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/images/logo_better.png`,
          width: 512,
          height: 512,
          caption: 'Nutri-Guardian Logo - Food Allergy Management App by Dr. Han Team'
        },
        founder: {
          '@type': 'Person',
          name: 'Dr. Han',
        },
        foundingDate: '2024',
        keywords: 'nutri guardian, dr han team, food allergy experts, nutrition app developers',
        sameAs: [
          'https://nutriguardian.xyz',
          'https://nutriguardian.vercel.app',
          'https://facebook.com/nutriguardian',
          'https://twitter.com/nutriguardian',
          'https://instagram.com/nutriguardian',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          email: 'nutriguardian_app@gmail.com',
          telephone: '0903 744 380',
        },
      }

    case 'product':
      return {
        ...baseData,
        '@type': 'SoftwareApplication',
        name: 'Nutri-Guardian - Food Allergy Management App',
        alternateName: ['Nutri Guardian', 'NutriGuardian App', 'Nutri-Guardian App'],
        description: 'The most comprehensive food allergy management app by Dr. Han Team. Features allergen detection, personalized nutrition plans, and expert guidance for safe eating.',
        url: baseUrl,
        applicationCategory: 'HealthApplication',
        applicationSubCategory: 'Nutrition & Food Allergy Management',
        operatingSystem: 'Android, iOS, Web',
        keywords: 'nutri guardian, food allergy app, nutrition tracker, allergen detector, meal planner',
        author: {
          '@type': 'Organization',
          name: 'Dr. Han Team',
        },
        publisher: {
          '@type': 'Organization', 
          name: 'Dr. Han Team',
        },
        datePublished: '2024-01-01',
        version: '1.0',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '1250',
          bestRating: '5',
          worstRating: '1',
        },
        features: [
          'Allergen Detection',
          'Personalized Meal Plans', 
          'Nutrition Tracking',
          'Expert Guidance',
          'Safe Recipe Recommendations'
        ],
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
