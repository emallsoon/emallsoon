export type WalmartCategory = {
  id: string;
  label: string;
  feeModel:
    | { type: 'flat'; rate: number }
    | { type: 'bands'; bands: Array<{ upTo: number | null; rate: number }> }
    | { type: 'marginal'; threshold: number; firstRate: number; overRate: number };
};

export const walmartCategories: WalmartCategory[] = [
  { id: 'everything-else', label: 'Everything Else / Home — 15%', feeModel: { type: 'flat', rate: 15 } },
  { id: 'consumer-electronics', label: 'Consumer Electronics — 8%', feeModel: { type: 'flat', rate: 8 } },
  { id: 'personal-computers', label: 'Personal Computers — 6%', feeModel: { type: 'flat', rate: 6 } },
  { id: 'automotive', label: 'Automotive — 12%', feeModel: { type: 'flat', rate: 12 } },
  { id: 'industrial', label: 'Industrial & Scientific — 12%', feeModel: { type: 'flat', rate: 12 } },
  { id: 'plumbing-hvac', label: 'Plumbing, Heating & Cooling — 10%', feeModel: { type: 'flat', rate: 10 } },
  { id: 'tires-wheels', label: 'Tires & Wheels — 10%', feeModel: { type: 'flat', rate: 10 } },
  { id: 'major-appliances', label: 'Major Appliances — 8%', feeModel: { type: 'flat', rate: 8 } },
  { id: 'camera', label: 'Camera & Photo — 8%', feeModel: { type: 'flat', rate: 8 } },
  { id: 'books', label: 'Books — 15%', feeModel: { type: 'flat', rate: 15 } },
  { id: 'pet', label: 'Pet Supplies — 15%', feeModel: { type: 'flat', rate: 15 } },
  { id: 'tools-home-improvement', label: 'Tools & Home Improvement — 15%', feeModel: { type: 'flat', rate: 15 } },
  {
    id: 'apparel',
    label: 'Apparel — 5% / 10% / 15% by price',
    feeModel: { type: 'bands', bands: [{ upTo: 15, rate: 5 }, { upTo: 20, rate: 10 }, { upTo: null, rate: 15 }] },
  },
  {
    id: 'baby-beauty',
    label: 'Baby / Beauty — 8% ≤ $10, then 15%',
    feeModel: { type: 'bands', bands: [{ upTo: 10, rate: 8 }, { upTo: null, rate: 15 }] },
  },
  {
    id: 'grocery',
    label: 'Grocery — 8% ≤ $15, then 15%',
    feeModel: { type: 'bands', bands: [{ upTo: 15, rate: 8 }, { upTo: null, rate: 15 }] },
  },
  {
    id: 'electronics-accessories',
    label: 'Electronics Accessories — 15% first $100, 8% above',
    feeModel: { type: 'marginal', threshold: 100, firstRate: 15, overRate: 8 },
  },
  {
    id: 'compact-appliances',
    label: 'Compact Appliances — 12% first $300, 8% above',
    feeModel: { type: 'marginal', threshold: 300, firstRate: 12, overRate: 8 },
  },
  {
    id: 'furniture',
    label: 'Furniture — 15% first $200, 10% above',
    feeModel: { type: 'marginal', threshold: 200, firstRate: 15, overRate: 10 },
  },
  {
    id: 'jewelry',
    label: 'Jewelry — 20% first $250, 5% above',
    feeModel: { type: 'marginal', threshold: 250, firstRate: 20, overRate: 5 },
  },
  {
    id: 'outdoor-power-tools',
    label: 'Outdoor Power Tools — 15% first $500, 8% above',
    feeModel: { type: 'marginal', threshold: 500, firstRate: 15, overRate: 8 },
  },
  {
    id: 'watches',
    label: 'Watches — 15% first $1,500, 3% above',
    feeModel: { type: 'marginal', threshold: 1500, firstRate: 15, overRate: 3 },
  },
];

const round = (value: number, places = 2) => {
  const factor = 10 ** places;
  return Math.round((value + Number.EPSILON) * factor) / factor;
};

export function calculateReferralFee(totalSalesPrice: number, categoryId: string): number {
  const total = Math.max(0, totalSalesPrice);
  const category = walmartCategories.find((entry) => entry.id === categoryId) ?? walmartCategories[0];
  const model = category.feeModel;

  if (model.type === 'flat') return round(total * (model.rate / 100));

  if (model.type === 'bands') {
    const band = model.bands.find((entry) => entry.upTo === null || total <= entry.upTo) ?? model.bands.at(-1)!;
    return round(total * (band.rate / 100));
  }

  const firstPortion = Math.min(total, model.threshold);
  const overPortion = Math.max(0, total - model.threshold);
  return round(firstPortion * (model.firstRate / 100) + overPortion * (model.overRate / 100));
}

export type WalmartProfitInput = {
  itemPrice: number;
  buyerCharges: number;
  categoryId: string;
  fulfillmentCost: number;
  adsCost: number;
  cogs: number;
  otherCosts: number;
};

export function calculateWalmartProfit(input: WalmartProfitInput) {
  const totalSalesPrice = round(Math.max(0, input.itemPrice) + Math.max(0, input.buyerCharges));
  const referralFee = calculateReferralFee(totalSalesPrice, input.categoryId);
  const totalCosts = round(
    referralFee +
      Math.max(0, input.fulfillmentCost) +
      Math.max(0, input.adsCost) +
      Math.max(0, input.cogs) +
      Math.max(0, input.otherCosts),
  );
  const profit = round(totalSalesPrice - totalCosts);
  const marginPct = totalSalesPrice > 0 ? round((profit / totalSalesPrice) * 100, 1) : 0;
  const effectiveReferralRatePct = totalSalesPrice > 0 ? round((referralFee / totalSalesPrice) * 100, 1) : 0;

  return { totalSalesPrice, referralFee, totalCosts, profit, marginPct, effectiveReferralRatePct };
}
