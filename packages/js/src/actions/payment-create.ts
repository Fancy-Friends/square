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
 * Take a payment through Square.
 *
 * POST /v2/payments —
 * https://developer.squareup.com/reference/square/payments-api/create-payment
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls Square or calls the faker.
 *
 * sideEffects: unsafe-to-replay. Pass an idempotencyKey derived from the RUN
 * and the STEP, never a fresh one — that is what turns "never retry" into
 * "retry safely".
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { SQUARE } from "../service.js";

export const PAYMENT_CREATE_OPERATION = "payment_create";

export type PaymentCreateOptions = {
  /** The node's resolved config. Keys: sourceId, amount, currency, locationId, customerId, referenceId, note. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  /** Derived from the run and the step, never fresh. See the note above. */
  idempotencyKey?: string;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function squarePaymentCreate(options: PaymentCreateOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.sourceId === undefined || config.sourceId === null || config.sourceId === "") {
    throw new Error(`payment_create: "sourceId" is required (Payment source).`);
  }

  {
    const n = Number(config.amount);
    if (!(Number.isInteger(n) && n >= 1)) {
      throw new Error(
        `payment_create: "amount" must be a positive whole number in the currency's smallest unit (1000 = $10.00), got ${JSON.stringify(config.amount)}.`,
      );
    }
  }

  if (options.idempotencyKey === undefined || options.idempotencyKey === "") {
    throw new Error(
      "payment_create: an idempotencyKey is required — derive it from the RUN and the STEP, " +
      "never fresh, or a retried run takes a second payment.",
    );
  }

  return callConnector(SQUARE, {
    operation: PAYMENT_CREATE_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "POST",
      path: "/v2/payments",
      json: nestFields({
        "source_id": String(config.sourceId),
        "amount_money.amount": Math.trunc(Number(config.amount)),
        "amount_money.currency": config.currency !== undefined && config.currency !== null && config.currency !== "" ? String(config.currency).toUpperCase() : "USD",
        ...(config.locationId !== undefined && config.locationId !== null && config.locationId !== "" ? { "location_id": String(config.locationId) } : {}),
        ...(config.customerId !== undefined && config.customerId !== null && config.customerId !== "" ? { "customer_id": String(config.customerId) } : {}),
        ...(config.referenceId !== undefined && config.referenceId !== null && config.referenceId !== "" ? { "reference_id": String(config.referenceId) } : {}),
        ...(config.note !== undefined && config.note !== null && config.note !== "" ? { "note": String(config.note) } : {}),
        "idempotency_key": options.idempotencyKey,
      }),
    },
  });
}

/**
 * `{"properties.email": x}` -> `{properties: {email: x}}`.
 *
 * A dotted `as` means NESTING, and only a JSON body can nest. The validator
 * refuses that spelling anywhere else, because in a form body it already means
 * something different — a literal dotted key.
 */
function nestFields(flat: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};

  for (const [path, value] of Object.entries(flat)) {
    const parts = path.split(".");
    let node = out;

    while (parts.length > 1) {
      const key = parts.shift() as string;

      if (typeof node[key] !== "object" || node[key] === null) node[key] = {};
      node = node[key] as Record<string, unknown>;
    }

    node[parts[0] as string] = value;
  }

  return out;
}
