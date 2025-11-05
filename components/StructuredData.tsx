import { ReactNode } from 'react';

interface StructuredDataProps {
  children?: ReactNode;
}

export function StructuredData({ children }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'ADU Cost Matcher',
    description:
      'Reverse ADU cost calculator - set your budget per sqft and see what features and finishes you can build',
    url: 'https://adu-cost-matcher.vercel.app',
    applicationCategory: 'CalculatorApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      description: 'Free ADU cost calculation tool',
    },
    author: {
      '@type': 'Organization',
      name: 'ADU Cost Matcher',
      url: 'https://adu-cost-matcher.vercel.app',
    },
    potentialAction: {
      '@type': 'CalculateAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://adu-cost-matcher.vercel.app',
        actionPlatform: ['DesktopWebPlatform', 'MobileWebPlatform'],
      },
      actionStatus: 'PotentialActionStatus',
      result: {
        '@type': 'Thing',
        name: 'ADU Cost Breakdown',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  );
}

interface FAQStructuredDataProps {
  children?: ReactNode;
}

export function FAQStructuredData({ children }: FAQStructuredDataProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is an ADU?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An Accessory Dwelling Unit (ADU) is a self-contained housing unit on the same lot as a single-family home. It can be attached or detached and typically includes its own kitchen, bathroom, and living space.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does ADU Cost Matcher work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Simply enter your target cost per square foot, and our calculator instantly shows you what ADU features, materials, and finishes fit within your budget. Instead of designing first and discovering unaffordable costs, you start with your budget and see what you can build.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is included in the Basic tier?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Basic tier ($150-180/sqft) includes vinyl plank flooring, laminate countertops, builder-grade fixtures, basic appliances, and asphalt shingle roofing. It\'s a budget-friendly option for functional ADUs.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is included in the Premium tier?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Premium tier ($220-280/sqft) includes solid hardwood flooring, granite countertops, high-end fixtures, premium appliances, and metal roofing. It offers a more upscale finish with quality materials.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I adjust the calculation for my location?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The current calculator uses standard national averages. Regional pricing variations are planned for future updates. Contact us for location-specific estimates.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
