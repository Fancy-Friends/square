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
 * Square's identity on the authoring surface, shared by every Square node.
 *
 * This file must import nothing from the js package: a PHP or Python project
 * installs the ui package and never that one, and the import would be a
 * dangling module the moment it did.
 *
 * ## The sandbox trap
 *
 * The one sandbox kind that is genuinely a DIFFERENT PLACE. Stripe's estate is
 * chosen by the key, Telegram's and HubSpot's by the account, SES's not at all
 * -- Square's is another host, with its own data and its own credentials. A
 * sandbox access token sent to the production host is refused rather than
 * silently reaching the real ledger, which makes this the SAFEST of the four
 * kinds and worth saying so: the failure mode is a 401, not a charge.
 */

import type { ConnectorMeta } from "@particle-academy/fancy-flow/connectors";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported — an imported constant lets an upgrade rewrite the
 * very claim it exists to detect.
 */
export const CONNECTOR_API_VERSION = 1;

/** The parts of a connector's identity that belong to the SERVICE, not the node. */
export const SQUARE_SERVICE = {
  service: "square",
  serviceTitle: "Square",
  domain: "payments",
  sandbox: "base-url",
} as const satisfies Pick<ConnectorMeta, "service" | "serviceTitle" | "domain" | "sandbox">;

/** The credentials a Square connection holds. */
export const SQUARE_CREDENTIALS = [
  {
    "key": "accessToken",
    "label": "Access token",
    "scope": "account",
    "secret": true,
    "help": "From the Square developer dashboard. SANDBOX and PRODUCTION tokens are different values for different hosts -- a sandbox token is refused by the production host rather than accepted, which is the whole reason this provider's estates cannot be confused."
  }
] as const;

/** Build a Square node's connector metadata from the operation it performs. */
export function squareMeta(
  role: ConnectorMeta["role"],
  operation: string,
  docs: string,
): ConnectorMeta {
  return { ...SQUARE_SERVICE, role, operation, docs };
}
