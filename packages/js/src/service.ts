/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- square
 */

/**
 * Square, as one service descriptor shared by every Square operation.
 *
 * @particle-academy/fancy-connector-core carries what is true of ALL
 * connectors. This carries what is true of Square: its base URL, its auth
 * scheme, its idempotency header, and its faker.
 *
 * ## The sandbox trap, written down where it is used
 *
 * The one sandbox kind that is genuinely a DIFFERENT PLACE. Stripe's estate is
 * chosen by the key, Telegram's and HubSpot's by the account, SES's not at all
 * -- Square's is another host, with its own data and its own credentials. A
 * sandbox access token sent to the production host is refused rather than
 * silently reaching the real ledger, which makes this the SAFEST of the four
 * kinds and worth saying so: the failure mode is a 401, not a charge.
 */

import type { ConnectorMode, PreparedRequest, ServiceDescriptor } from "@particle-academy/fancy-connector-core";

import { squareFaker } from "./faker.js";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported. An imported constant lets an upgrade rewrite the
 * very claim it exists to detect, after which the copy agrees with itself
 * forever.
 */
export const CONNECTOR_API_VERSION = 1;

export const SQUARE_BASE_URLS = {
  "live": "https://connect.squareup.com",
  "sandbox": "https://connect.squareupsandbox.com"
} as const;

/** Credential keys a remote call cannot proceed without. */
export const SQUARE_REQUIRES = [
  "accessToken"
] as const;

/**
 * Apply Square's auth scheme to an outgoing request.
 *
 *
 *
 * The mode is passed in because for some providers auth and estate are the
 * same decision expressed in the URL; here it is unused, and saying so is
 * cheaper than wondering later whether it was forgotten.
 */
export function squareAuthorize(
  credentials: Record<string, string | undefined>,
  request: PreparedRequest,
  _mode: ConnectorMode,
): void {
  request.headers["Square-Version"] = "2026-08-19";

  request.headers.Authorization = `Bearer ${credentials.accessToken ?? ""}`;
}

/** The Square service, for the TypeScript runtime. */
export const SQUARE: ServiceDescriptor = {
  service: "square",
  title: "Square",
  sandbox: "base-url",
  baseUrls: { ...SQUARE_BASE_URLS },
  requires: [...SQUARE_REQUIRES],
  authorize: squareAuthorize,
  faker: squareFaker,
};
