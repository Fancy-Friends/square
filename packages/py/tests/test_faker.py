# GENERATED FILE — do not edit.
#
# Emitted from provider/fixtures/ by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/fixtures/ (or weaver's template/) and regenerate:
#
# npm run provider -- square

"""The golden fixtures — the SAME values the TypeScript and PHP packages
assert.

Bit-for-bit identical is the claim, and this is what checks it for Python.
Cross-runtime drift does not fail loudly on its own: it completes, down one
path, with no error.
"""

import pytest

from fancy_square._fake import FakeValues, seed_for_call
from fancy_square.faker import respond


def test_payment_create_fakes_the_published_shape() -> None:
    config = {
        "currency": "USD",
    }
    fake = FakeValues(seed_for_call("square", "payment_create", config))

    faked = respond("payment_create", {"config": config, "fake": fake})

    assert faked == {
        "payment": {
            "id": "2b698c4346ddc75338ccd1",
            "created_at": "2026-01-01T00:00:00.000Z",
            "updated_at": "2026-01-01T00:00:00.000Z",
            "amount_money": {
                "amount": 22938,
                "currency": "USD",
            },
            "total_money": {
                "amount": 22938,
                "currency": "USD",
            },
            "status": "COMPLETED",
            "source_type": "CARD",
            "location_id": None,
            "customer_id": None,
            "reference_id": None,
            "note": None,
            "receipt_url": "https://squareup.com/receipt/preview/fake",
        },
        "errors": [],
    }


def test_an_operation_with_no_fixture_raises_rather_than_inventing_a_shape() -> None:
    fake = FakeValues(seed_for_call("square", "no_such_operation", {}))

    with pytest.raises(ValueError, match="no fake response"):
        respond("no_such_operation", {"config": {}, "fake": fake})
