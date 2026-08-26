export interface Tool {
  slug: string;
  name: string;
  shortName: string;
  tag: string;
  description: string;
  /** path on the site, with trailing slash */
  href: string;
  icon: 'fba' | 'shopify' | 'etsy' | 'roas';
}

export const tools: Tool[] = [
  {
    slug: 'amazon-fba-profit-calculator',
    name: 'Amazon FBA Profit Calculator',
    shortName: 'FBA Profit',
    tag: 'Amazon FBA',
    description:
      'Price in referral fees, FBA fulfillment, storage, and inbound shipping to see true profit, margin, ROI, and your break-even price per unit.',
    href: '/tools/amazon-fba-profit-calculator/',
    icon: 'fba',
  },
  {
    slug: 'shopify-profit-margin-calculator',
    name: 'Shopify Profit Margin Calculator',
    shortName: 'Shopify Margin',
    tag: 'Shopify',
    description:
      'Includes Shopify plan transaction fees and payment processing, so your margin reflects what actually lands in the bank on every order.',
    href: '/tools/shopify-profit-margin-calculator/',
    icon: 'shopify',
  },
  {
    slug: 'etsy-fee-calculator',
    name: 'Etsy Fee & Profit Calculator',
    shortName: 'Etsy Fees',
    tag: 'Etsy',
    description:
      'Adds up the $0.20 listing fee, 6.5% transaction fee, payment processing, and Offsite Ads to reveal real profit on every Etsy sale.',
    href: '/tools/etsy-fee-calculator/',
    icon: 'etsy',
  },
  {
    slug: 'roas-break-even-calculator',
    name: 'ROAS & Break-Even Calculator',
    shortName: 'Ad ROAS',
    tag: 'Paid Ads',
    description:
      'Find your break-even ROAS before you scale spend. Compare it with actual campaign ROAS to know if your ads print money or burn it.',
    href: '/tools/roas-break-even-calculator/',
    icon: 'roas',
  },
];

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
