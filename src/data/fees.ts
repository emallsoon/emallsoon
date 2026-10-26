/**
 * Fee presets and platform defaults.
 *
 * ⚠️ PLATFORM FEES CHANGE OFTEN. These are editable defaults used to prefill
 * the calculators — every field stays user-editable on the page, and each
 * tool page carries a "verify current rates" disclaimer. Update the numbers
 * here when platforms revise their fee schedules (check Seller Central,
 * Shopify pricing pages, and Etsy's fee help center).
 *
 * Last verified against official sources: 2026-10-26
 *  - Amazon: Seller Central "2026 US Referral and FBA fee changes" (effective 2026-01-15),
 *    plus the 3.5% fuel & logistics surcharge on FBA fulfillment fees (effective 2026-04-17).
 *    2026-10-26 re-verified: holiday peak fulfillment fees apply
 *    2026-10-15 → 2027-01-14. Amazon states the 3.5% fuel & logistics
 *    surcharge does not apply while those holiday peak fees are in effect.
 *  - Shopify: shopify.com/pricing (US) — plans Basic / Grow / Advanced.
 *    2026-08-30: Advanced third-party gateway transaction fee corrected 0.5% → 0.6%
 *    (official pricing page now lists 0.6%; Basic 2% / Grow 1% unchanged).
 *    Card rates unchanged: 2.9% / 2.7% / 2.5% + $0.30. Re-verified 2026-10-26, no change.
 *  - Etsy: Etsy Help Center "What are the Fees and Taxes for Selling on Etsy"
 *    + Fees & Payments Policy (verified 2026-10-26; 2026-08-31 before that).
 *    $0.20 / 6.5% / 3% + $0.25 / Offsite Ads 15%–12% capped $100 all unchanged.
 *    NOTE: policy now mentions a one-time shop set-up fee ("varies by location")
 *    with no published amount — not modeled, informational only.
 *  - TikTok Shop: TikTok Shop US Seller Center fee schedule (verified 2026-10-26;
 *    official category table revised 2026-05-14 still shows 6%).
 *  - eBay: eBay help "Selling fees" (id=4822) + "Store selling fees" (id=4809),
 *    verified 2026-10-26. Broad category presets are labelled "Most" where
 *    official subcategory exceptions exist. Jewelry and Watches are omitted
 *    because their current high-value structures do not fit this calculator's
 *    simple portion-above-threshold model.
 */

/* ---------- Amazon referral fee presets (US, approx.) ---------- */
export interface ReferralPreset {
  label: string;
  pct: number;
}

export const referralPresets: ReferralPreset[] = [
  { label: 'Most common categories · 15%', pct: 15 },
  { label: 'Grocery (sale ≤ $15) · 8%', pct: 8 },
  { label: 'Apparel (sale > $20) · 17%', pct: 17 },
];

/** default referral fee percentage */
export const referralDefault = 15;

/**
 * Default FBA fulfillment fee per unit (US, standard size, approx.).
 * 2026 rate card varies by size tier AND product price band
 * (under $10 / $10–50 / over $50). Per the official 2026 non-peak
 * fulfillment fee table, small standard runs roughly $2.43–$4.22 and
 * large standard roughly $2.91–$6.93 per unit (the 2.75–3 lb large
 * standard tier runs $5.85–$6.93, and the tier above 3 lb starts at
 * $6.97). Outside the holiday peak period, a 3.5% fuel & logistics
 * surcharge applies to the fulfillment fee. Holiday PEAK fulfillment
 * fees apply 2026-10-15 → 2027-01-14; Amazon states that the 3.5%
 * surcharge does not apply during that period.
 * Verified 2026-10-26.
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
  { id: 'advanced', label: 'Advanced — 0.6% transaction fee', txnPct: 0.6, procPct: 2.5, procFlat: 0.3 },
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
  { id: 'optional', label: 'Optional · 15% (under $10k in 365 days)', pct: 15 },
  { id: 'mandatory', label: 'Mandatory · 12% ($10k+ in 365 days)', pct: 12 },
];

/**
 * Offsite Ads fee is capped at $100 per order (US), regardless of
 * the 15% / 12% rate. Source: Etsy Help Center, verified 2026-08-31.
 */
export const offsiteAdsCap = 100;

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
 * ⚠️ UNCONFIRMED: some seller publications report the standard US rate rose
 * to 8% (most non-food categories) effective 2026-08-04, but TikTok's own
 * Seller University fee page (revised 2026-05-14, re-checked 2026-10-26)
 * still lists 6%. Kept at the officially published 6% — re-check Seller
 * Center statements before trusting either figure. NEEDS HUMAN CONFIRMATION.
 * Source: TikTok Shop US Seller Center, verified 2026-10-26.
 */
export const tiktokCategories: TikTokCategory[] = [
  { id: 'most', label: 'Most categories · 6%', pct: 6 },
  { id: 'fine-jewelry', label: 'Selected fine jewelry categories · 5%', pct: 5 },
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
  /**
   * Tiered rate structure: portions of the sale above `individualThreshold`
   * (or `storeThreshold` for store subscribers) are charged a LOWER
   * `individualOverPct` / `storeOverPct` instead of the base rate.
   * Null = flat rate, no tier.
   */
  individualThreshold: number | null;
  /** % on the portion of the sale above individualThreshold */
  individualOverPct: number | null;
  storeThreshold: number | null;
  /** % on the portion of the sale above storeThreshold */
  storeOverPct: number | null;
}

/**
 * eBay US final value fee categories (2026).
 * The final value fee is calculated on the total amount of the sale
 * (item price + shipping + sales tax + handling). Per-order fee is
 * $0.30 for orders ≤$10, $0.40 for orders >$10.
 *
 * Tiered structure (portion above threshold charged at overPct):
 *  - Most non-store categories: 2.35% on the portion over $7,500.
 *  - Most store categories: 2.35% on the portion over $2,500.
 *  - Exceptions: Auto Parts stores threshold $1,000; Coins & Paper Money stores
 *    threshold $4,000; Sneakers are flat with no per-order fee.
 * Source: eBay help "Selling fees" (id=4822) + "Store selling fees"
 * (id=4809), verified 2026-10-26.
 */
export const ebayCategories: EbayCategory[] = [
  { id: 'most', label: 'Most categories', individualPct: 13.6, storePct: 12.7, perOrderFeeApplies: true, individualThreshold: 7500, individualOverPct: 2.35, storeThreshold: 2500, storeOverPct: 2.35 },
  { id: 'books', label: 'Books, Movies & most Music (excl. Vinyl)', individualPct: 15.3, storePct: 15.3, perOrderFeeApplies: true, individualThreshold: 7500, individualOverPct: 2.35, storeThreshold: 2500, storeOverPct: 2.35 },
  { id: 'sneakers', label: 'Sneakers ($150 or more)', individualPct: 8, storePct: 7, perOrderFeeApplies: false, individualThreshold: null, individualOverPct: null, storeThreshold: null, storeOverPct: null },
  { id: 'guitars', label: 'Guitars & Basses', individualPct: 6.7, storePct: 6.7, perOrderFeeApplies: true, individualThreshold: 7500, individualOverPct: 2.35, storeThreshold: 2500, storeOverPct: 2.35 },
  { id: 'electronics', label: 'Most Consumer Electronics', individualPct: 13.6, storePct: 9.35, perOrderFeeApplies: true, individualThreshold: 7500, individualOverPct: 2.35, storeThreshold: 2500, storeOverPct: 2.35 },
  { id: 'computers', label: 'Most Computers/Tablets & Networking', individualPct: 13.6, storePct: 9.35, perOrderFeeApplies: true, individualThreshold: 7500, individualOverPct: 2.35, storeThreshold: 2500, storeOverPct: 2.35 },
  { id: 'coins', label: 'Coins & Paper Money', individualPct: 13.25, storePct: 9, perOrderFeeApplies: true, individualThreshold: 7500, individualOverPct: 2.35, storeThreshold: 4000, storeOverPct: 2.35 },
  { id: 'tradingcards', label: 'Trading Cards', individualPct: 13.25, storePct: 12.35, perOrderFeeApplies: true, individualThreshold: 7500, individualOverPct: 2.35, storeThreshold: 2500, storeOverPct: 2.35 },
  { id: 'autparts', label: 'Most Auto Parts & Accessories', individualPct: 13.6, storePct: 11.5, perOrderFeeApplies: true, individualThreshold: 7500, individualOverPct: 2.35, storeThreshold: 1000, storeOverPct: 2.35 },
  { id: 'stamps', label: 'Stamps', individualPct: 13.6, storePct: 9.7, perOrderFeeApplies: true, individualThreshold: 7500, individualOverPct: 2.35, storeThreshold: 2500, storeOverPct: 2.35 },
  { id: 'instruments', label: 'Most Musical Instruments & Gear', individualPct: 13.6, storePct: 10.35, perOrderFeeApplies: true, individualThreshold: 7500, individualOverPct: 2.35, storeThreshold: 2500, storeOverPct: 2.35 },
];

/** Per-order fees (included in final value fee) */
export const ebayPerOrderUnder10 = 0.3;
export const ebayPerOrderOver10 = 0.4;

/** Insertion fee for listings beyond the 250/month free allotment */
export const ebayInsertionFee = 0.35;
export const ebayFreeListingsPerMonth = 250;
