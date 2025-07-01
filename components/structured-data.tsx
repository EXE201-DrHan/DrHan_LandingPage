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
