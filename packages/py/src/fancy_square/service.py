# GENERATED FILE — do not edit.
#
# Emitted from provider/manifest.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/manifest.json (or weaver's template/) and regenerate:
#
# npm run provider -- square

"""Square, as one service descriptor shared by every Square operation.

The Python twin of the js and php packages' service modules.

## The sandbox trap, written down where it is used

The one sandbox kind that is genuinely a DIFFERENT PLACE. Stripe's estate is
chosen by the key, Telegram's and HubSpot's by the account, SES's not at all
-- Square's is another host, with its own data and its own credentials. A
sandbox access token sent to the production host is refused rather than
silently reaching the real ledger, which makes this the SAFEST of the four
kinds and worth saying so: the failure mode is a 401, not a charge.
"""

from __future__ import annotations

from ._runtime import PreparedRequest, ServiceDescriptor
from .faker import respond

# The connector API version this package was GENERATED against. A literal,
# never imported: an imported constant lets an upgrade rewrite the very claim
# it exists to detect, after which the copy agrees with itself forever.
CONNECTOR_API_VERSION = 1

SERVICE = "square"
TITLE = "Square"
SANDBOX = "base-url"
BASE_URLS = {
    "live": "https://connect.squareup.com",
    "sandbox": "https://connect.squareupsandbox.com",
}

"""Credential keys a remote call cannot proceed without."""
REQUIRES = [
    "accessToken",
]


def authorize(
    credentials: dict[str, str | None],
    request: PreparedRequest,
    mode: str,
) -> None:
    """Apply Square's auth scheme to an outgoing request.
    
    
    """
    request.headers["Square-Version"] = "2026-08-19"

    request.headers["Authorization"] = f"Bearer {credentials.get('accessToken') or ''}"


def descriptor() -> ServiceDescriptor:
    """The Square service, for the Python runtime."""
    return ServiceDescriptor(
        service=SERVICE,
        title=TITLE,
        sandbox=SANDBOX,
        base_urls=BASE_URLS,
        requires=REQUIRES,
        authorize=authorize,
        faker=respond,
        idempotency_header=None,
    )
