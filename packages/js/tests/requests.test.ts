/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- square
 */

/**
 * What Square actually receives.
 *
 * Every assertion below is about the request rather than the response, and
 * none of it touches the network: the transport is a stub that records what it
 * was handed.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import type { PreparedRequest } from "@particle-academy/fancy-connector-core";

import { squarePaymentCreate } from "../src/actions/payment-create.js";

/** Capture the prepared request instead of sending it. */
function capture() {
  const seen: PreparedRequest[] = [];

  return {
    seen,
    transport: async (request: PreparedRequest) => {
      seen.push(request);

      return { status: 200, body: JSON.stringify({ id: "captured" }), headers: {} };
    },
  };
}

const CREDENTIALS = {
  "accessToken": "test_accessToken"
};

test("payment_create sends POST /v2/payments", async () => {
  const { seen, transport } = capture();

  await squarePaymentCreate({
    config: {
      "sourceId": "example-sourceId",
      "amount": 1000,
      "currency": "example-currency",
      "locationId": "example-locationId",
      "customerId": "example-customerId",
      "referenceId": "example-referenceId",
      "note": "example-note"
    },
    credentials: CREDENTIALS,
    mode: "live",
    idempotencyKey: "test-idempotency-key",
    transport,
  });

  assert.equal(seen.length, 1);
  assert.equal(seen[0]!.method, "POST");
  assert.ok(new URL(seen[0]!.url).pathname.endsWith("/v2/payments"), seen[0]!.url);

  assert.deepEqual(JSON.parse(String(seen[0]!.body ?? "{}")), {
    "idempotency_key": "test-idempotency-key",
    "source_id": "example-sourceId",
    "amount_money": {
      "amount": 1000,
      "currency": "EXAMPLE-CURRENCY"
    },
    "location_id": "example-locationId",
    "customer_id": "example-customerId",
    "reference_id": "example-referenceId",
    "note": "example-note"
  });
});

test("the credential is placed the way the provider wants it", async () => {
  const { seen, transport } = capture();

  await squarePaymentCreate({
    config: {
      "sourceId": "example-sourceId",
      "amount": 1000,
      "currency": "example-currency",
      "locationId": "example-locationId",
      "customerId": "example-customerId",
      "referenceId": "example-referenceId",
      "note": "example-note"
    },
    credentials: CREDENTIALS,
    mode: "live",
    idempotencyKey: "test-idempotency-key",
    transport,
  });

  assert.equal(seen[0]!.headers.Authorization, "Bearer test_accessToken");
});

test("a missing required field is refused BEFORE anything is sent", async () => {
  // Nothing was attempted, so there is nothing to classify — and the message names
  // the field, rather than letting the provider answer three frames later with
  // "invalid request".
  const { seen, transport } = capture();

  await assert.rejects(
    squarePaymentCreate({
      config: {
        "amount": 1000,
        "currency": "example-currency",
        "locationId": "example-locationId",
        "customerId": "example-customerId",
        "referenceId": "example-referenceId",
        "note": "example-note"
      },
      credentials: CREDENTIALS,
      mode: "live",
      idempotencyKey: "test-idempotency-key",
      transport,
    }),
    new RegExp("sourceId"),
  );

  assert.equal(seen.length, 0, "the request must not have been sent");
});
