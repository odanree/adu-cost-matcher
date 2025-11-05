'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 'what-is-adu',
    question: 'What is an ADU?',
    answer:
      'An Accessory Dwelling Unit (ADU) is a self-contained housing unit on the same lot as a single-family home. It can be attached (like a garage conversion) or detached (like a cottage in the backyard). ADUs typically include their own kitchen, bathroom, and living space.',
    category: 'Basics',
  },
  {
    id: 'why-reverse',
    question: 'Why is this a "reverse" calculator?',
    answer:
      'Traditional ADU calculators ask you to design first (choose bedrooms, materials, finishes), then show you the cost—often shocking! Our reverse approach lets you set your budget first and see what ADU you can actually build. This prevents disappointment and helps you make smart decisions upfront.',
    category: 'How It Works',
  },
  {
    id: 'how-it-works',
    question: 'How does ADU Cost Matcher work?',
    answer:
      'Simply enter your target cost per square foot ($100-$500). Our calculator instantly determines what finish level (Basic, Standard, Premium, Luxury) fits your budget, then shows you: specific materials you\'d get, labor costs breakdown, permits and fees, site work requirements, and money-saving trade-offs.',
    category: 'How It Works',
  },
  {
    id: 'basic-tier',
    question: 'What is included in the Basic tier ($150-180/sqft)?',
    answer:
      'Basic tier is budget-friendly and includes: Vinyl plank flooring, laminate countertops, builder-grade fixtures, basic appliances, asphalt shingle roofing, standard drywall, and painted finishes. Perfect if you want functional space without premium materials.',
    category: 'Finish Levels',
  },
  {
    id: 'standard-tier',
    question: 'What is included in the Standard tier ($180-220/sqft)?',
    answer:
      'Standard tier offers solid mid-range quality with: Engineered wood flooring, quartz countertops, mid-range fixtures, better appliances, composite roofing, textured finishes, and good insulation. This is the most popular tier—great balance of cost and quality.',
    category: 'Finish Levels',
  },
  {
    id: 'premium-tier',
    question: 'What is included in the Premium tier ($220-280/sqft)?',
    answer:
      'Premium tier features upscale finishes: Solid hardwood flooring, granite countertops, high-end fixtures, premium appliances, metal roofing, custom finishes, and premium insulation. Ideal if you want the ADU to feel like a luxury space.',
    category: 'Finish Levels',
  },
  {
    id: 'luxury-tier',
    question: 'What is included in the Luxury tier ($280+/sqft)?',
    answer:
      'Luxury tier is our most premium option with: Premium engineered hardwood, marble/quartz countertops, luxury fixtures, top-tier appliances, premium metal roofing, custom finishes, spa-grade features, and smart home wiring. For when you want the absolute best.',
    category: 'Finish Levels',
  },
  {
    id: 'cost-accuracy',
    question: 'How accurate are these cost estimates?',
    answer:
      'Our estimates use national construction averages and represent typical costs. Actual costs vary based on location, local labor rates, site conditions, and material availability. We recommend getting quotes from local contractors for your specific project. These estimates are great for planning and budgeting, but always verify with professionals.',
    category: 'About Estimates',
  },
  {
    id: 'cost-includes',
    question: 'What do the costs include/exclude?',
    answer:
      'Included: Materials, labor, permits, site work, contingency. Excluded: Land costs, utility connections (beyond site prep), architectural fees, landscaping, specialized systems (pools, elevators), and property taxes. These are one-time ADU construction costs only.',
    category: 'About Estimates',
  },
  {
    id: 'location-pricing',
    question: 'Can I adjust the calculation for my location?',
    answer:
      'The current calculator uses standard national averages. Regional pricing variations are planned for future updates. For location-specific estimates, increase your cost/sqft if you\'re in a high-cost area (like California coastal) or decrease it for lower-cost regions (like Midwest).',
    category: 'About Estimates',
  },
  {
    id: 'sqft-default',
    question: 'Why is the default sqft 800?',
    answer:
      '800 sqft is a typical ADU size that balances affordability with functionality. It\'s large enough for a 1-2 bedroom layout (usually 1 bed/1 bath or studio), common for backyard ADUs. You can adjust this to any size you\'re considering.',
    category: 'How It Works',
  },
  {
    id: 'budget-allocation',
    question: 'How is the budget allocated across categories?',
    answer:
      'Our allocation is based on industry standards: Materials (38%), Labor (33%), Permits & Fees (10%), Site Work (12%), Contingency (7%). This breakdown varies slightly by tier—luxury tiers have higher material costs, while basic tiers have higher labor percentages.',
    category: 'How It Works',
  },
  {
    id: 'change-features',
    question: 'Can I customize materials or change features?',
    answer:
      'The calculator shows typical materials for each tier. In real projects, you can absolutely customize! Want vinyl flooring in the Premium tier? Go for it—you\'ll just adjust your budget. Use the calculator as a starting point, then work with contractors to customize to your needs.',
    category: 'Customization',
  },
  {
    id: 'regulations',
    question: 'Are there regulations for ADUs?',
    answer:
      'Yes, ADU regulations vary significantly by state and city. Some areas have relaxed rules to encourage ADU development, while others have restrictions on size, lot requirements, or use. Our calculator includes permit costs but not specific regulations. Check your local city/county planning department for zoning laws and requirements.',
    category: 'Legal & Permits',
  },
  {
    id: 'permitted-zoning',
    question: 'Can I build an ADU on my property?',
    answer:
      'It depends on your location! California, Oregon, and many states now allow ADUs more easily. Some areas allow front-yard ADUs, while others require backyard. Minimum lot size and setback requirements vary. Contact your local planning department or visit your city\'s website—they can tell you if your property qualifies.',
    category: 'Legal & Permits',
  },
  {
    id: 'financing',
    question: 'How do I finance an ADU?',
    answer:
      'Options include: home equity loans, cash-out refinancing, FHA 203(k) renovation loans (some allow ADU construction), construction loans, personal loans, or savings. Some areas offer ADU-specific financing programs. Talk to your bank or mortgage lender about your options.',
    category: 'Financing',
  },
];

interface ExpandedState {
  [key: string]: boolean;
}

export function FAQ() {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(faqData.map(item => item.category)))];
  const filteredFAQ =
    selectedCategory === 'All'
      ? faqData
      : faqData.filter(item => item.category === selectedCategory);

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className={styles.faqContainer}>
      <div className={styles.faqHeader}>
        <h2 className={styles.title}>Frequently Asked Questions</h2>
        <p className={styles.subtitle}>
          Everything you need to know about ADUs and how to use our cost calculator
        </p>
      </div>

      {/* Category Filter */}
      <div className={styles.categoryFilter}>
        {categories.map(category => (
          <button
            key={category}
            className={`${styles.categoryButton} ${
              selectedCategory === category ? styles.active : ''
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className={styles.faqItems}>
        {filteredFAQ.map(item => (
          <div key={item.id} className={styles.faqItem}>
            <button
              className={styles.faqQuestion}
              onClick={() => toggleExpand(item.id)}
              aria-expanded={expanded[item.id]}
            >
              <span className={styles.questionText}>{item.question}</span>
              <span
                className={`${styles.icon} ${
                  expanded[item.id] ? styles.iconOpen : ''
                }`}
              >
                ▼
              </span>
            </button>
            {expanded[item.id] && (
              <div className={styles.faqAnswer}>
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className={styles.contactSection}>
        <h3>Still have questions?</h3>
        <p>
          Can't find what you're looking for? Feel free to reach out with your ADU questions!
        </p>
      </div>
    </section>
  );
}
