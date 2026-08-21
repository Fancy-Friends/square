"""
Square — the published PyPI wheel.

GENERATED — do not edit. Fix weaver's template/ and regenerate.

Runs against the PUBLISHED wheel, installed by name into a fresh venv.
Every other test here imports from ../src and cannot see the packaging —
a missing py.typed or an unshipped module passes there and breaks for
every user.
"""

from importlib.metadata import requires

from fancy_square._fake import FakeValues, seed_for_call
from fancy_square.faker import respond

GOLDENS = [
    {
        "operation": "payment_create",
        "config": {
            "currency": "USD",
        },
        "expected": {
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
        },
    },
]


def main() -> None:
    # Zero runtime dependencies is a design constraint, checked on the
    # INSTALLED distribution rather than on the pyproject that claimed it.
    declared = requires("fancy-square")
    assert not declared, f"expected no runtime dependencies, got {declared}"
    print("  ok   zero runtime dependencies on the installed distribution")

    for golden in GOLDENS:
        operation, config = golden["operation"], golden["config"]
        fake = FakeValues(seed_for_call("square", operation, config))
        faked = respond(operation, {"config": config, "fake": fake})

        assert faked == golden["expected"], (
            f"the PUBLISHED wheel produced different bytes for {operation} than the repo does"
        )
        print(f"  ok   {operation}")

    print(f"\n  {len(GOLDENS)} operations verified against the published wheel.")


if __name__ == "__main__":
    main()
