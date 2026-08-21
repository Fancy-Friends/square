/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/payment-create.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/payment-create.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- square
 */

/**
 * Take payment — Take a payment through Square.
 *
 * https://developer.squareup.com/reference/square/payments-api/create-payment
 *
 * `unsafe-to-replay`, and the idempotency key is why that is survivable rather
 * than merely declared: a durable run that retries this node sends the same
 * `undefined`, so Square returns the original result instead of creating a
 * second one.
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { squareMeta } from "../service.js";

export const SQUARE_PAYMENT_CREATE_KIND = "@particle-academy/square_payment_create";
export const SQUARE_PAYMENT_CREATE_OPERATION = "payment_create";

export const SQUARE_PAYMENT_CREATE_META = squareMeta("action", "take a payment", "https://developer.squareup.com/reference/square/payments-api/create-payment");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const SQUARE_PAYMENT_CREATE_OUTPUT: OutputField[] = [
  {
    "path": "mode",
    "type": "string",
    "description": "Which estate this ran against: fake, sandbox or live."
  },
  {
    "path": "connection",
    "type": "string",
    "description": "The connection id that was used."
  },
  {
    "path": "data.payment.id",
    "type": "string",
    "description": "Square's payment id. NESTED under `payment` — Square wraps its responses where Stripe returns the object at the top level."
  },
  {
    "path": "data.payment.status",
    "type": "string",
    "description": "APPROVED, COMPLETED, CANCELED or FAILED."
  },
  {
    "path": "data.payment.amount_money.amount",
    "type": "number",
    "description": "Amount in the currency's smallest unit."
  },
  {
    "path": "data.payment.amount_money.currency",
    "type": "string",
    "description": "Three-letter ISO code, uppercase."
  },
  {
    "path": "data.payment.receipt_url",
    "type": "string",
    "description": "A hosted receipt Square generates for the buyer."
  },
  {
    "path": "data.errors",
    "type": "array",
    "description": "Present when Square accepted the request and refused the payment. Check it before treating a 200 as money taken."
  }
];

export const squarePaymentCreateKind: NodeKindDefinition = defineConnectorKind(SQUARE_PAYMENT_CREATE_META, {
  name: SQUARE_PAYMENT_CREATE_KIND,
  aliases: ["square_payment_create"],
  label: "Take payment",
  description: "Take a payment through Square.",
  icon: "◫",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "unsafe-to-replay",
  outputShape: SQUARE_PAYMENT_CREATE_OUTPUT,
  configSchema: [
    {
      "type": "expression",
      "key": "sourceId",
      "label": "Payment source",
      "example": "{{ $json.card_nonce }}",
      "description": "A payment token from the Web Payments SDK, a saved card id, or CASH / EXTERNAL. Square calls it source_id.",
      "required": true
    },
    {
      "type": "expression",
      "key": "amount",
      "label": "Amount",
      "example": "{{ $json.total_cents }}",
      "description": "In the currency's smallest unit — 1000 is $10.00. Square has no decimal amounts, exactly like Stripe.",
      "required": true
    },
    {
      "type": "text",
      "key": "currency",
      "label": "Currency",
      "default": "USD",
      "placeholder": "USD",
      "description": "Three-letter ISO code. Square wants it UPPERCASE, where Stripe wants it lowercase — the same field, opposite conventions."
    },
    {
      "type": "expression",
      "key": "locationId",
      "label": "Location",
      "example": "{{ $json.location_id }}",
      "description": "Which of the seller's locations the payment belongs to. Square scopes almost everything by location."
    },
    {
      "type": "expression",
      "key": "customerId",
      "label": "Customer"
    },
    {
      "type": "expression",
      "key": "referenceId",
      "label": "Reference",
      "example": "Order {{ $json.order_id }}",
      "description": "Your own id for this payment. The usual way to find it again later."
    },
    {
      "type": "textarea",
      "key": "note",
      "label": "Note",
      "rows": 2
    }
  ],
  defaultConfig: {
    "mode": "auto",
    "currency": "USD"
  },
  renderBody: ({ config }) =>
    summarize(SQUARE_PAYMENT_CREATE_META, config as Record<string, unknown>, "take a payment"),
});
