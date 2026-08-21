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
 * The golden fixtures.
 *
 * Deterministic on purpose: the same seed produces the same bytes in
 * TypeScript, PHP and Python, so this file and its twins in the other packages
 * assert the SAME values. That turns the faker into a parity test rather than
 * a convenience — which matters, because cross-runtime drift does not fail
 * loudly. It completes, down one path, with no error.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

import { squareFaker } from "../src/faker.js";

test("payment_create fakes the shape Square publishes", () => {
  const config = {
    "currency": "USD"
  };

  const faked = squareFaker("payment_create", fakeRequest("square", "payment_create", config));

  assert.deepEqual(faked, {
    "payment": {
      "id": "2b698c4346ddc75338ccd1",
      "created_at": "2026-01-01T00:00:00.000Z",
      "updated_at": "2026-01-01T00:00:00.000Z",
      "amount_money": {
        "amount": 22938,
        "currency": "USD"
      },
      "total_money": {
        "amount": 22938,
        "currency": "USD"
      },
      "status": "COMPLETED",
      "source_type": "CARD",
      "location_id": null,
      "customer_id": null,
      "reference_id": null,
      "note": null,
      "receipt_url": "https://squareup.com/receipt/preview/fake"
    },
    "errors": []
  });
});

test("an operation with no fixture throws rather than inventing a shape", () => {
  assert.throws(() => squareFaker("no_such_operation", fakeRequest("square", "no_such_operation", {})), /no fake response/);
});
