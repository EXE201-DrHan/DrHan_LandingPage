import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nutri-guardian.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/education`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // You can add dynamic pages here
  // For example, if you have blog posts or article pages:
  // const articles = await getArticles()
  // const articlePages = articles.map((article) => ({
  //   url: `${baseUrl}/education/${article.id}`,
  //   lastModified: new Date(article.updatedAt),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.7,
  // }))

  return [
    ...staticPages,
    // ...articlePages,
  ]
}
