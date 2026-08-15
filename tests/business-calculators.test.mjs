import assert from "node:assert/strict"
import test from "node:test"

import {
  breakEvenUnits,
  compareProcurementOffers,
  estimatePaymentFee,
  priceForTargetGrossMargin,
  procurementLandedCost,
} from "../tools/business-calculators.mjs"

test("break-even uses contribution margin and rounds units upward", () => {
  const result = breakEvenUnits({ fixedCostsMinor: 100_00, pricePerUnitMinor: 25_00, variableCostPerUnitMinor: 15_00 })
  assert.equal(result.status, "OK")
  assert.equal(result.contributionMarginMinor, 10_00)
  assert.equal(result.breakEvenUnits, 10)
})

test("break-even refuses a non-positive contribution margin", () => {
  const result = breakEvenUnits({ fixedCostsMinor: 100_00, pricePerUnitMinor: 15_00, variableCostPerUnitMinor: 15_00 })
  assert.equal(result.status, "NO_POSITIVE_CONTRIBUTION")
  assert.equal(result.breakEvenUnits, null)
})

test("target gross margin distinguishes margin from markup", () => {
  const result = priceForTargetGrossMargin({ variableCostPerUnitMinor: 60_00, targetMarginBps: 4000 })
  assert.equal(result.pricePerUnitMinor, 100_00)
  assert.match(result.assumptions.join(" "), /gross margin, not markup/i)
})

test("payment fee reports assumptions and net estimate", () => {
  const result = estimatePaymentFee({ amountMinor: 100_00, percentageBps: 290, fixedFeeMinor: 30 })
  assert.equal(result.status, "ESTIMATE_ONLY")
  assert.equal(result.percentageFeeMinor, 290)
  assert.equal(result.totalFeeMinor, 320)
  assert.equal(result.netAfterFeeMinor, 9680)
  assert.match(result.assumptions.join(" "), /FX spreads/i)
})

test("procurement comparison uses landed totals in one currency", () => {
  const result = compareProcurementOffers([
    { name: "A", quantity: 10, unitCostMinor: 1000, shippingMinor: 1000, dutyMinor: 500 },
    { name: "B", quantity: 10, unitCostMinor: 1050, shippingMinor: 100, dutyMinor: 100 },
  ])
  assert.equal(result.lowestNominalTotal, "B")
  assert.match(result.warnings.join(" "), /same currency/i)
  assert.match(result.warnings.join(" "), /not automatically the best/i)
})

test("landed cost validates positive quantity", () => {
  assert.throws(
    () => procurementLandedCost({ quantity: 0, unitCostMinor: 1000 }),
    /greater than zero/,
  )
})

test("monetary inputs must be non-negative integer minor units", () => {
  assert.throws(
    () => estimatePaymentFee({ amountMinor: 100.5, percentageBps: 250, fixedFeeMinor: 0 }),
    /safe integer/,
  )
  assert.throws(
    () => breakEvenUnits({ fixedCostsMinor: -1, pricePerUnitMinor: 100, variableCostPerUnitMinor: 50 }),
    /non-negative/,
  )
})
