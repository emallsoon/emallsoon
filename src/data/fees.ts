/**
 * Fee presets and platform defaults.
 *
 * ⚠️ PLATFORM FEES CHANGE OFTEN. These are editable defaults used to prefill
 * the calculators — every field stays user-editable on the page, and each
 * tool page carries a "verify current rates" disclaimer. Update the numbers
 * here when platforms revise their fee schedules (check Seller Central,
 * Shopify pricing pages, and Etsy's fee help center).
 *
 * Last verified against official sources: 2026-08-26
 *  - Amazon: Seller Central "2026 US Referral and FBA fee changes" (effective 2026-01-15)
 *  - Shopify: shopify.com/pricing (US) — plans Basic / Grow / Advanced
 *  - Etsy: Etsy Help Center "What are the Fees and Taxes for Selling on Etsy"
 *  - TikTok Shop: TikTok Shop US Seller Center fee schedule (verified 2026-08-26)
 *  - eBay: eBay Seller Center "Understanding selling fees" (verified 2026-08-26)
 */

/* ---------- Amazon referral fee presets (US, approx.) ---------- */
export interface ReferralPreset {
  label: string;
  pct: number;
}

export const referralPresets: ReferralPreset[] = [
  { label: 'Most categories · 15%', pct: 15 },
  { label: 'Grocery · 8%', pct: 8 },
  { label: 'Apparel · 17%', pct: 17 },
  { label: 'Jewelry · 20%', pct: 20 },
];

/** default referral fee percentage */
export const referralDefault = 15;

/**
 * Default FBA fulfillment fee per unit (US, standard size, approx.).
 * 2026 rate card varies by size tier AND product price band
 * (under $10 / $10–50 / over $50) — small standard runs roughly
 * $2.56–$3.84, large standard roughly $2.91–$5.66 per unit.
 */
export const fbaFeeDefault = 5.5;

/* ---------- Shopify ---------- */
export interface ShopifyPlan {
  id: string;
  label: string;
  /** transaction fee % when NOT using Shopify Payments */
  txnPct: number;
  /** US Shopify Payments online standard card rate (official, per plan) */
  procPct: number;
  procFlat: number;
}

export const shopifyPlans: ShopifyPlan[] = [
  { id: 'basic', label: 'Basic — 2% transaction fee', txnPct: 2, procPct: 2.9, procFlat: 0.3 },
  { id: 'grow', label: 'Grow — 1% transaction fee', txnPct: 1, procPct: 2.7, procFlat: 0.3 },
  { id: 'advanced', label: 'Advanced — 0.5% transaction fee', txnPct: 0.5, procPct: 2.5, procFlat: 0.3 },
];

/** Default processing prefill (Basic plan, US online standard card rate) */
export const shopifyProcessingPct = 2.9;
export const shopifyProcessingFlat = 0.3;

/* ---------- Etsy (US) ---------- */
export const etsyListingFee = 0.2;
export const etsyTransactionPct = 6.5;
export const etsyProcessingPct = 3;
export const etsyProcessingFlat = 0.25;

export interface OffsiteAdsOption {
  id: string;
  label: string;
  pct: number;
}

export const offsiteAdsOptions: OffsiteAdsOption[] = [
  { id: 'none', label: 'No Offsite Ads fee', pct: 0 },
  { id: 'mandatory', label: 'Mandatory · 15% (under $10k/yr)', pct: 15 },
  { id: 'opted', label: 'Opted in · 12% (over $10k/yr)', pct: 12 },
];

/* ---------- TikTok Shop (US) ---------- */
export interface TikTokCategory {
  id: string;
  label: string;
  pct: number;
}

/**
 * TikTok Shop US referral fees (2026).
 * The referral fee is a single unified charge that ALREADY includes
 * payment processing — there is no separate transaction or processing fee.
 * Source: TikTok Shop US Seller Center, verified 2026-08-26.
 */
export const tiktokCategories: TikTokCategory[] = [
  { id: 'most', label: 'Most categories · 6%', pct: 6 },
  { id: 'jewelry', label: 'Jewelry · 5%', pct: 5 },
  { id: 'preowned', label: 'Pre-owned · 5%', pct: 5 },
  { id: 'newseller', label: 'New seller promo · 3% (first 30 days)', pct: 3 },
];

/** Default referral fee percentage */
export const tiktokReferralDefault = 6;

/**
 * Refund administration fee: 20% of the referral fee, capped at $5 per SKU.
 * Applied when a buyer returns an item.
 */
export const tiktokRefundAdminPct = 20;
export const tiktokRefundAdminCap = 5;

/* ---------- eBay (US) ---------- */
export interface EbayCategory {
  id: string;
  label: string;
  /** Individual (non-store) final value fee % */
  individualPct: number;
  /** Store subscriber discounted final value fee % */
  storePct: number;
  /** Whether the per-order fee ($0.30/$0.40) applies */
  perOrderFeeApplies: boolean;
}

/**
 * eBay US final value fee categories (2026).
 * The final value fee is calculated on the total amount of the sale
 * (item price + shipping + sales tax + handling). Per-order fee is
 * $0.30 for orders ≤$10, $0.40 for orders >$10.
 * Source: eBay Seller Center, verified 2026-08-26.
 */
export const ebayCategories: EbayCategory[] = [
  { id: 'most', label: 'Most categories', individualPct: 13.6, storePct: 12.7, perOrderFeeApplies: true },
  { id: 'books', label: 'Books, Movies & Music', individualPct: 15.3, storePct: 15.3, perOrderFeeApplies: true },
  { id: 'jewelry', label: 'Jewelry & Watches', individualPct: 15, storePct: 13, perOrderFeeApplies: true },
  { id: 'sneakers', label: 'Sneakers (over $150)', individualPct: 8, storePct: 7, perOrderFeeApplies: false },
  { id: 'guitars', label: 'Guitars & Basses', individualPct: 6.7, storePct: 6.7, perOrderFeeApplies: true },
  { id: 'electronics', label: 'Consumer Electronics', individualPct: 13.6, storePct: 9.35, perOrderFeeApplies: true },
  { id: 'computers', label: 'Computers', individualPct: 13.6, storePct: 7.35, perOrderFeeApplies: true },
  { id: 'coins', label: 'Coins & Paper Money', individualPct: 13.25, storePct: 9, perOrderFeeApplies: true },
  { id: 'tradingcards', label: 'Trading Cards', individualPct: 13.25, storePct: 12.35, perOrderFeeApplies: true },
  { id: 'autparts', label: 'Auto Parts & Accessories', individualPct: 13.6, storePct: 11.5, perOrderFeeApplies: true },
  { id: 'stamps', label: 'Stamps', individualPct: 13.6, storePct: 9.7, perOrderFeeApplies: true },
  { id: 'instruments', label: 'Musical Instruments & Gear', individualPct: 13.6, storePct: 10.35, perOrderFeeApplies: true },
];

/** Per-order fees (included in final value fee) */
export const ebayPerOrderUnder10 = 0.3;
export const ebayPerOrderOver10 = 0.4;

/** Insertion fee for listings beyond the 250/month free allotment */
export const ebayInsertionFee = 0.35;
export const ebayFreeListingsPerMonth = 250;
