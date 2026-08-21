/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/ + triggers/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/ + triggers/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- square
 */

/**
 * Square's node kinds with their TypeScript executors attached — for hosts
 * that EXECUTE on TS.
 *
 * The authoring surface in @particle-academy/square-ui carries no executor:
 * the editor is React on every host, so a PHP or Python project installs the
 * ui package and never this one.
 */

import type { NodeExecutor, NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import {
  idempotencyKeyFor,
  NO_IDEMPOTENCY_KEY_WARNING,
  resolveConnection,
  triggerEvent,
  type RequestedMode,
} from "@particle-academy/fancy-connector-core";
import { SQUARE } from "./service.js";

import {
  squarePaymentCreateKind,
} from "@particle-academy/square-ui";

import { squarePaymentCreate } from "./actions/payment-create.js";

export const squarePaymentCreateExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  // Derived from the RUN and the NODE, never fresh. A retried durable run
  // must send the same key or Square creates a second one — the exact
  // failure "unsafe-to-replay" exists to prevent.
  const idempotencyKey = idempotencyKeyFor(ctx, ctx.node.id, {
    context: { service: "square", operation: "payment_create" },
  });
  if (idempotencyKey === null) {
    ctx.emit({
      type: "log",
      level: "warn",
      nodeId: ctx.node.id,
      message: `payment_create: ${NO_IDEMPOTENCY_KEY_WARNING}`,
    });
  }

  const result = await squarePaymentCreate({
    config,
    input: ctx.inputs?.in,
    ...(idempotencyKey === null ? {} : { idempotencyKey }),
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `square payment_create ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

/** The kinds a TypeScript host registers. */
export const SQUARE_RUNNABLE_KINDS: NodeKindDefinition[] = [
  { ...squarePaymentCreateKind, executor: squarePaymentCreateExecutor },
];
