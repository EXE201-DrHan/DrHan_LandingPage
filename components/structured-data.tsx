interface StructuredDataProps {
  data: Record<string, any>
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}

interface BreadcrumbProps {
  items: Array<{
    name: string
    item: string
  }>
}

export function BreadcrumbStructuredData({ items }: BreadcrumbProps) {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  }

  return <StructuredData data={breadcrumbData} />
}

interface FAQProps {
  questions: Array<{
    question: string
    answer: string
  }>
}

export function FAQStructuredData({ questions }: FAQProps) {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  }

  return <StructuredData data={faqData} />
}

export function LogoStructuredData() {
  const logoData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nutri-Guardian',
    alternateName: ['Nutri Guardian', 'NutriGuardian'],
    url: 'https://nutriguardian.xyz',
    logo: {
      '@type': 'ImageObject',
      url: 'https://nutriguardian.xyz/images/logo_better.png',
      width: 512,
      height: 512,
      caption: 'Nutri-Guardian Logo',
      contentUrl: 'https://nutriguardian.xyz/images/logo_better.png',
      thumbnailUrl: 'https://nutriguardian.xyz/images/logo.png',
      encodingFormat: 'image/png'
    }
  }

  return <StructuredData data={logoData} />
}
