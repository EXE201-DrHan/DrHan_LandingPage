import { generateMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = generateMetadata({
  title: 'Nutri-Guardian - Food Allergy Management App by Dr. Han Team',
  description: 'Official Nutri-Guardian website by Dr. Han Team. Download the leading food allergy management app for personalized nutrition, allergen detection, and safe eating guidance. Get Nutri Guardian app today for comprehensive allergy-friendly nutrition support.',
  keywords: [
    'nutri guardian',
    'nutri-guardian',
    'nutriguardian',
    'nutri guardian app',
    'nutri guardian official',
    'dr han team nutri guardian',
    'nutri guardian website',
    'food allergy app nutri guardian',
    'download nutri guardian',
    'nutri guardian food allergy management',
    'official nutri guardian app',
    'nutri guardian by dr han',
    'nutriguardian app download',
    'nutri guardian nutrition app'
  ],
  url: '/',
  type: 'website'
})

// This metadata will be imported and used in the page component
