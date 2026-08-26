export interface Tool {
  slug: string;
  name: string;
  shortName: string;
  tag: string;
  description: string;
  /** path on the site, with trailing slash */
  href: string;
  icon: 'fba' | 'shopify' | 'etsy' | 'roas' | 'discount' | 'breakeven' | 'tiktok' | 'ebay' | 'compare';
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
  {
    slug: 'discount-pricing-calculator',
    name: 'Discount Pricing Calculator',
    shortName: 'Discounts',
    tag: 'Pricing',
    description:
      'Price percentage-off, BOGO, and spend-threshold deals against your real margin. See profit per unit after the discount and the maximum you can afford to give.',
    href: '/tools/discount-pricing-calculator/',
    icon: 'discount',
  },
  {
    slug: 'break-even-units-calculator',
    name: 'Break-Even Units Calculator',
    shortName: 'Break-Even',
    tag: 'Pricing',
    description:
      'Find the exact number of units you must sell to cover fixed costs. See how price, margin, and ad spend shift your break-even point — before you commit inventory.',
    href: '/tools/break-even-units-calculator/',
    icon: 'breakeven',
  },
  {
    slug: 'tiktok-shop-fee-calculator',
    name: 'TikTok Shop Fee Calculator',
    shortName: 'TikTok Shop',
    tag: 'TikTok',
    description:
      'Calculate TikTok Shop referral fees, affiliate commissions, and ad spend to see real profit per order. Includes category presets and refund admin fees.',
    href: '/tools/tiktok-shop-fee-calculator/',
    icon: 'tiktok',
  },
  {
    slug: 'ebay-fee-calculator',
    name: 'eBay Fee & Profit Calculator',
    shortName: 'eBay Fees',
    tag: 'eBay',
    description:
      'Factor in final value fees by category, per-order charges, insertion fees, promoted listings, and Store subscriber savings to see true profit on every eBay sale.',
    href: '/tools/ebay-fee-calculator/',
    icon: 'ebay',
  },
  {
    slug: 'platform-fee-comparison',
    name: 'Platform Fee Comparison',
    shortName: 'Compare',
    tag: 'Compare',
    description:
      'Enter your price and cost once — instantly compare profit, fees, and margin across Amazon, eBay, Etsy, Shopify, and TikTok Shop. Find the most profitable platform in seconds.',
    href: '/tools/platform-fee-comparison/',
    icon: 'compare',
  },
];

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
