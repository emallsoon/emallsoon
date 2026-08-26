/**
 * Fee presets and platform defaults.
 *
 * ⚠️ PLATFORM FEES CHANGE OFTEN. These are editable defaults used to prefill
 * the calculators — every field stays user-editable on the page, and each
 * tool page carries a "verify current rates" disclaimer. Update the numbers
 * here when platforms revise their fee schedules (check Seller Central,
 * Shopify pricing pages, and Etsy's fee help center).
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

/** default FBA fulfillment fee per unit (US, standard size, approx.) */
export const fbaFeeDefault = 5.5;

/* ---------- Shopify ---------- */
export interface ShopifyPlan {
  id: string;
  label: string;
  /** transaction fee % when NOT using Shopify Payments */
  txnPct: number;
}

export const shopifyPlans: ShopifyPlan[] = [
  { id: 'basic', label: 'Basic — 2% transaction fee', txnPct: 2 },
  { id: 'shopify', label: 'Shopify — 1% transaction fee', txnPct: 1 },
  { id: 'advanced', label: 'Advanced — 0.5% transaction fee', txnPct: 0.5 },
];

/** US Shopify Payments online credit card rate */
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
