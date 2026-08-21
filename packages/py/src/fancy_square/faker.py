# GENERATED FILE — do not edit.
#
# Emitted from provider/fixtures/ by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/fixtures/ (or weaver's template/) and regenerate:
#
# npm run provider -- square

"""The Square faker.

Bit-for-bit identical to the TypeScript and PHP fakers: the same FNV-1a seed
and the same xorshift32 sequence, so a golden fixture asserts the exact
faked payload and ALL THREE runtimes have to produce it. That turns the
faker into a parity test rather than a convenience — which matters, because
cross-runtime drift does not fail loudly. It completes, down one path, with
no error.
"""

from __future__ import annotations

from typing import Any

from ._fake import FakeValues


def _payment_create(config: dict[str, Any], fake: FakeValues) -> Any:
    bound_amount = (
        int(float(_v))
        if (_v := config.get("amount")) is not None and _v != ""
        else fake.int(500, 25000)
    )
    bound_currency = (str(_v) if (_v := config.get("currency")) is not None and _v != "" else "USD")

    return {
        "payment": {
            "id": fake.hex(22),
            "created_at": "2026-01-01T00:00:00.000Z",
            "updated_at": "2026-01-01T00:00:00.000Z",
            "amount_money": {
                "amount": bound_amount,
                "currency": bound_currency,
            },
            "total_money": {
                "amount": bound_amount,
                "currency": bound_currency,
            },
            "status": "COMPLETED",
            "source_type": "CARD",
            "location_id": (
                str(_v)
                if (_v := config.get("locationId")) is not None and _v != ""
                else None
            ),
            "customer_id": (
                str(_v)
                if (_v := config.get("customerId")) is not None and _v != ""
                else None
            ),
            "reference_id": (
                str(_v)
                if (_v := config.get("referenceId")) is not None and _v != ""
                else None
            ),
            "note": (str(_v) if (_v := config.get("note")) is not None and _v != "" else None),
            "receipt_url": "https://squareup.com/receipt/preview/fake",
        },
        "errors": [],
    }


def respond(operation: str, request: dict[str, Any]) -> Any:
    """Dispatch to the fixture for one operation."""
    config: dict[str, Any] = request.get("config") or {}
    fake: FakeValues = request["fake"]

    if operation == "payment_create":
        return _payment_create(config, fake)

    # A faker asked for an operation it has no shape for must SAY so. Making
    # something up would produce a green run whose output silently has none of
    # the fields the author is about to reference.
    raise ValueError(
        f'square: no fake response is defined for "{operation}". '
        "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker "
        "cannot be developed against, tested, or demonstrated."
    )
