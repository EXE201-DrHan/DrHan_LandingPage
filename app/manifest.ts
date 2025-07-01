import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nutri-Guardian - Your Personal Ally In Allergy-Friendly Eating',
    short_name: 'Nutri-Guardian',
    description: 'Your trusted nutritionist app for allergy sufferers. Get personalized meal plans, ingredient analysis, and expert guidance for safe, healthy eating.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e40af',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/badge-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: '/images/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['health', 'medical', 'lifestyle'],
    lang: 'en',
    dir: 'ltr',
    orientation: 'portrait-primary',
  }
}
