import test from 'node:test';
import assert from 'node:assert/strict';

import {
  calculateReferralFee,
  calculateWalmartProfit,
  walmartCategories,
} from '../src/lib/walmart-fees.ts';

test('flat-rate categories charge the published percentage on total sales price', () => {
  assert.equal(calculateReferralFee(120, 'everything-else'), 18);
  assert.equal(calculateReferralFee(120, 'consumer-electronics'), 9.6);
  assert.equal(calculateReferralFee(120, 'personal-computers'), 7.2);
});

test('single-threshold categories select the rate for the whole total sales price', () => {
  assert.equal(calculateReferralFee(15, 'apparel'), 0.75);
  assert.equal(calculateReferralFee(20, 'apparel'), 2);
  assert.equal(calculateReferralFee(21, 'apparel'), 3.15);
  assert.equal(calculateReferralFee(10, 'baby-beauty'), 0.8);
  assert.equal(calculateReferralFee(11, 'baby-beauty'), 1.65);
  assert.equal(calculateReferralFee(15, 'grocery'), 1.2);
  assert.equal(calculateReferralFee(16, 'grocery'), 2.4);
});

test('marginal tier categories charge each price portion at its published rate', () => {
  assert.equal(calculateReferralFee(150, 'electronics-accessories'), 19);
  assert.equal(calculateReferralFee(400, 'compact-appliances'), 44);
  assert.equal(calculateReferralFee(300, 'furniture'), 40);
  assert.equal(calculateReferralFee(300, 'jewelry'), 52.5);
  assert.equal(calculateReferralFee(600, 'outdoor-power-tools'), 83);
  assert.equal(calculateReferralFee(2000, 'watches'), 240);
});

test('profit model uses total sales price and seller-entered costs without inventing fulfillment fees', () => {
  assert.deepEqual(
    calculateWalmartProfit({
      itemPrice: 100,
      buyerCharges: 10,
      categoryId: 'home',
      fulfillmentCost: 8,
      adsCost: 5,
      cogs: 40,
      otherCosts: 2,
    }),
    {
      totalSalesPrice: 110,
      referralFee: 16.5,
      totalCosts: 71.5,
      profit: 38.5,
      marginPct: 35,
      effectiveReferralRatePct: 15,
    },
  );
});

test('category list contains every supported representative category', () => {
  assert.equal(walmartCategories.length, 21);
  assert.ok(walmartCategories.some((category) => category.id === 'plumbing-hvac'));
  assert.ok(walmartCategories.some((category) => category.id === 'watches'));
});
