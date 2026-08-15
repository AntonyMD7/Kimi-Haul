// Public Business Calculators v0.1
//
// Pure integer-based reference functions for pricing/break-even, payment-fee
// estimation, and procurement comparison. No network requests, exchange-rate
// lookup, tax advice, accounting classification, or persistence occurs here.

function assertNonNegativeInteger(value, name) {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new TypeError(`${name} must be a non-negative safe integer`)
  }
}

function assertPositiveInteger(value, name) {
  assertNonNegativeInteger(value, name)
  if (value === 0) throw new RangeError(`${name} must be greater than zero`)
}

export function breakEvenUnits({ fixedCostsMinor, pricePerUnitMinor, variableCostPerUnitMinor }) {
  assertNonNegativeInteger(fixedCostsMinor, "fixedCostsMinor")
  assertNonNegativeInteger(pricePerUnitMinor, "pricePerUnitMinor")
  assertNonNegativeInteger(variableCostPerUnitMinor, "variableCostPerUnitMinor")

  const contributionMarginMinor = pricePerUnitMinor - variableCostPerUnitMinor
  if (contributionMarginMinor <= 0) {
    return {
      status: "NO_POSITIVE_CONTRIBUTION",
      contributionMarginMinor,
      breakEvenUnits: null,
      explanation: "Selling price must exceed variable cost per unit before fixed costs can be recovered.",
    }
  }

  const units = Math.ceil(fixedCostsMinor / contributionMarginMinor)
  return {
    status: "OK",
    contributionMarginMinor,
    breakEvenUnits: units,
    explanation: `At the supplied assumptions, at least ${units} unit(s) are required to cover fixed costs.`,
  }
}

export function priceForTargetGrossMargin({ variableCostPerUnitMinor, targetMarginBps }) {
  assertNonNegativeInteger(variableCostPerUnitMinor, "variableCostPerUnitMinor")
  assertNonNegativeInteger(targetMarginBps, "targetMarginBps")
  if (targetMarginBps >= 10000) {
    throw new RangeError("targetMarginBps must be below 10000 (100%)")
  }

  const denominator = 10000 - targetMarginBps
  const priceMinor = Math.ceil((variableCostPerUnitMinor * 10000) / denominator)
  return {
    status: "OK",
    pricePerUnitMinor: priceMinor,
    assumptions: [
      "Target is gross margin, not markup.",
      "Taxes, processor fees, discounts, bad debt, overhead allocation, and currency conversion are excluded unless included in the supplied cost.",
      "Result is rounded upward to the nearest minor currency unit.",
    ],
  }
}

export function estimatePaymentFee({ amountMinor, percentageBps, fixedFeeMinor = 0 }) {
  assertNonNegativeInteger(amountMinor, "amountMinor")
  assertNonNegativeInteger(percentageBps, "percentageBps")
  assertNonNegativeInteger(fixedFeeMinor, "fixedFeeMinor")

  const percentageFeeMinor = Math.round((amountMinor * percentageBps) / 10000)
  const totalFeeMinor = percentageFeeMinor + fixedFeeMinor
  return {
    status: "ESTIMATE_ONLY",
    amountMinor,
    percentageFeeMinor,
    fixedFeeMinor,
    totalFeeMinor,
    netAfterFeeMinor: amountMinor - totalFeeMinor,
    assumptions: [
      "Percentage is supplied in basis points: 100 bps = 1%.",
      "Percentage component is rounded to the nearest minor currency unit.",
      "Provider-specific minimums, caps, taxes, cross-border fees, FX spreads, chargebacks, refunds, and tiering are excluded.",
    ],
  }
}

export function procurementLandedCost({ quantity, unitCostMinor, shippingMinor = 0, dutyMinor = 0, otherMinor = 0 }) {
  assertPositiveInteger(quantity, "quantity")
  for (const [name, value] of Object.entries({ unitCostMinor, shippingMinor, dutyMinor, otherMinor })) {
    assertNonNegativeInteger(value, name)
  }

  const goodsMinor = quantity * unitCostMinor
  if (!Number.isSafeInteger(goodsMinor)) throw new RangeError("computed goods cost exceeds safe integer range")
  const totalMinor = goodsMinor + shippingMinor + dutyMinor + otherMinor
  if (!Number.isSafeInteger(totalMinor)) throw new RangeError("computed landed cost exceeds safe integer range")

  return {
    status: "OK",
    quantity,
    goodsMinor,
    totalMinor,
    landedPerUnitMinor: Math.ceil(totalMinor / quantity),
  }
}

export function compareProcurementOffers(offers) {
  if (!Array.isArray(offers) || offers.length === 0) throw new TypeError("offers must be a non-empty array")
  const normalized = offers.map((offer, index) => {
    const name = String(offer.name ?? `offer-${index + 1}`)
    const cost = procurementLandedCost(offer)
    return { name, ...cost }
  })
  normalized.sort((a, b) => a.totalMinor - b.totalMinor || a.name.localeCompare(b.name))
  return {
    status: "COMPARISON_ONLY",
    offers: normalized,
    lowestNominalTotal: normalized[0].name,
    warnings: [
      "Lowest nominal cost is not automatically the best procurement decision.",
      "Quality, warranty, lead time, reliability, payment terms, compliance, currency risk, supplier concentration, and lifecycle cost are not scored here.",
      "All monetary inputs must already be expressed in the same currency/minor unit.",
    ],
  }
}
