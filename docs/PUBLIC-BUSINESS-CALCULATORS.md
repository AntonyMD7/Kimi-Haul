# Public Small-Business Calculators — Reference v0.1

Roadmap mapping:

- `P-165 Pricing/Break-Even Calculator` — **IN PROGRESS**
- `P-170 Payment Fee Calculator` — **IN PROGRESS**
- `P-171 Procurement Comparison Tool` — **IN PROGRESS**

These are transparent mathematical reference functions, not accounting, tax, legal, investment, merchant-eligibility, foreign-exchange or procurement advice.

## Search-before-build

Full accounting/invoicing platforms already exist in open source, including projects such as **InvoicePlane** and broader accounting suites. This tranche therefore does **not** attempt to build another accounting platform inside Kimi-Haul. It isolates a smaller reusable gap: auditable calculation primitives whose assumptions are explicit enough for beginners to inspect and engineers to test.

A future `P-162 Invoice/Quotation Tool` should evaluate adoption/integration with established invoice software before creating a new full-stack product.

## Money representation

Every function accepts integer **minor currency units** rather than binary floating-point currency amounts.

Examples:

- USD 10.25 → `1025`
- GYD 1,000 → `100000` if the application chooses cents as its minor unit

The library never guesses a currency and performs no exchange-rate lookup. Procurement offers must already use the same currency/minor-unit convention.

## P-165 — Pricing / Break-Even

`breakEvenUnits()` calculates:

```text
contribution per unit = selling price - variable cost per unit
break-even units = ceil(fixed costs / contribution per unit)
```

If contribution is zero or negative, the tool returns `NO_POSITIVE_CONTRIBUTION` instead of a misleading number.

`priceForTargetGrossMargin()` distinguishes **gross margin** from markup and rounds upward to the nearest supplied minor unit. It explicitly excludes taxes, processor fees, discounts, overhead allocation and other costs unless the caller has already included them.

## P-170 — Payment Fee Calculator

`estimatePaymentFee()` accepts:

- transaction amount in minor units;
- percentage fee in basis points (`100 bps = 1%`);
- optional fixed fee in minor units.

It returns an `ESTIMATE_ONLY` result and calls out excluded provider behavior such as minimums, caps, taxes, cross-border fees, FX spreads, chargebacks, refunds and tiered pricing.

The function intentionally does **not** scrape live provider pricing. A production comparator must source fee schedules from current authoritative provider documentation and attach dates/provenance.

## P-171 — Procurement Comparison

`procurementLandedCost()` adds:

- goods cost;
- shipping;
- duty supplied by the user;
- other supplied landed costs.

`compareProcurementOffers()` sorts offers by nominal landed total but explicitly warns that cheapest is not automatically best. Quality, warranty, lead time, supplier reliability, payment terms, compliance, currency risk, concentration risk and lifecycle cost are not silently reduced to one score.

## Safety and decision quality

The tools fail closed on negative/non-integer monetary inputs and zero quantity. They never:

- connect to a bank or payment provider;
- move money;
- create invoices;
- alter Kimi-Haul bookings;
- calculate tax obligations;
- choose a supplier automatically;
- fetch exchange rates;
- infer merchant eligibility.

## Beginner example

Suppose fixed costs are 100 currency units, selling price is 25, and variable cost is 15:

```text
contribution = 25 - 15 = 10
break-even = 100 / 10 = 10 units
```

The result only holds while those assumptions hold. If cost or price changes, recalculate.

## Engineer use

The functions are pure ECMAScript modules and have no external dependencies. Tests use Node's built-in `node:test` runner, making the arithmetic/validation contract independently executable without starting the Next.js application or touching Supabase.

## Completion gaps

None of the three projects is COMPLETE. Completion-grade work still needs a dedicated accessible UI/distribution path, explicit reusable-package license/packaging decision, currency-formatting/localization layer, versioned release, broader real-world acceptance, accessibility/multilingual testing, documented numerical/rounding policy, current-authoritative data provenance for any live fee schedule, and canonical completion evidence.
