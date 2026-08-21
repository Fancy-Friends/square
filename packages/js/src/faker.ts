/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- square
 */

/**
 * The Square faker.
 *
 * Shapes, not behaviour: the goal is that a downstream node sees the field
 * NAMES Square actually publishes, so an author can wire {{ $json.data.id }}
 * against a fake and have it keep working against the real thing.
 *
 * Deterministic — same inputs, same output. A faker returning a fresh uuid
 * every call cannot be asserted on, so its fixtures degrade to "it did not
 * throw", which is the assertion that catches nothing.
 */

import type { ConnectorFaker, FakeRequest } from "@particle-academy/fancy-connector-core";

function fakePaymentCreate({ config, fake }: FakeRequest): unknown {
  const boundAmount = (config.amount !== undefined && config.amount !== null && config.amount !== "" ? Math.trunc(Number(config.amount)) : fake.int(500, 25000));
  const boundCurrency = (config.currency !== undefined && config.currency !== null && config.currency !== "" ? String(config.currency) : "USD");

  return {
    "payment": {
      "id": fake.hex(22),
      "created_at": "2026-01-01T00:00:00.000Z",
      "updated_at": "2026-01-01T00:00:00.000Z",
      "amount_money": {
        "amount": boundAmount,
        "currency": boundCurrency,
      },
      "total_money": {
        "amount": boundAmount,
        "currency": boundCurrency,
      },
      "status": "COMPLETED",
      "source_type": "CARD",
      "location_id": (config.locationId !== undefined && config.locationId !== null && config.locationId !== "" ? String(config.locationId) : null),
      "customer_id": (config.customerId !== undefined && config.customerId !== null && config.customerId !== "" ? String(config.customerId) : null),
      "reference_id": (config.referenceId !== undefined && config.referenceId !== null && config.referenceId !== "" ? String(config.referenceId) : null),
      "note": (config.note !== undefined && config.note !== null && config.note !== "" ? String(config.note) : null),
      "receipt_url": "https://squareup.com/receipt/preview/fake",
    },
    "errors": [],
  };
}

export const squareFaker: ConnectorFaker = (operation, request) => {
  switch (operation) {
    case "payment_create":
      return fakePaymentCreate(request);

    default:
      // A faker asked for an operation it has no shape for must SAY so. Making
      // something up would produce a green run whose output silently has none
      // of the fields the author is about to reference.
      throw new Error(
        `square: no fake response is defined for "${operation}". ` +
          "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker " +
          "cannot be developed against, tested, or demonstrated.",
      );
  }
};
