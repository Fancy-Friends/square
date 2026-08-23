# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/payment-create.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/payment-create.json (or weaver's template/) and regenerate:
#
# npm run provider -- square

"""Take a payment through Square.

POST /v2/payments —
https://developer.squareup.com/reference/square/payments-api/create-payment

This describes the request. `call` resolves the connection, picks the
estate, and either calls Square or calls the faker.
"""

from __future__ import annotations

from typing import Any

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "payment_create"
METHOD = "POST"
PATH = "/v2/payments"
SIDE_EFFECTS = "unsafe-to-replay"


def body(config: dict[str, Any], idempotency_key: str | None) -> dict[str, Any]:
    """Build the JSON body for one call, failing loudly and specifically."""
    if idempotency_key is None or idempotency_key == "":
        raise ConnectorConfigError(
            "payment_create: an idempotency_key is required — derive it from the RUN and the "
            "STEP, never fresh, or a retried run takes a second payment."
        )

    if config.get("sourceId") is None or config.get("sourceId") == "":
        raise ConnectorConfigError(
            "payment_create: \"sourceId\" is required (Payment source)."
        )

    amount = config.get("amount")
    if amount is not None and amount != "":
        try:
            _n = float(amount)
        except (TypeError, ValueError):
            _n = None
        if _n is None or _n != int(_n) or _n < 1:
            raise ConnectorConfigError(
                "payment_create: \"amount\" must be a positive whole number in the currency's "
                "smallest unit (1000 = $10.00), got "
                f"{amount!r}."
            )
    else:
        raise ConnectorConfigError(
            "payment_create: \"amount\" is required (Amount)."
        )

    out: dict[str, Any] = {}
    _value = config.get("sourceId")
    if _value is None or _value == "":
        raise ConnectorConfigError("payment_create: \"sourceId\" is required.")

    out["source_id"] = str(_value)
    _value = config.get("amount")
    if _value is None or _value == "":
        raise ConnectorConfigError("payment_create: \"amount\" is required.")

    out["amount_money.amount"] = int(float(_value))
    _value = config.get("currency")
    if _value is not None and _value != "":
        out["amount_money.currency"] = str(_value).upper()
    else:
        out["amount_money.currency"] = "USD"
    _value = config.get("locationId")
    if _value is not None and _value != "":
        out["location_id"] = str(_value)
    _value = config.get("customerId")
    if _value is not None and _value != "":
        out["customer_id"] = str(_value)
    _value = config.get("referenceId")
    if _value is not None and _value != "":
        out["reference_id"] = str(_value)
    _value = config.get("note")
    if _value is not None and _value != "":
        out["note"] = str(_value)

    out["idempotency_key"] = idempotency_key
    return _nest_fields(out)


def payment_create(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    # Derived from the run and the step, never fresh. A retried durable run must
    # send the same key or Square creates a second one.
    idempotency_key: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Take a payment through Square."""
    return call(
        descriptor(),
        operation=OPERATION,
        method=METHOD,
        path=PATH,
        json_body=body(config, idempotency_key),
        config=config,
        credentials=credentials,
        mode=mode,
        connection_id=connection_id,
        attempts=attempts,
    )



def _nest_fields(flat: dict[str, Any]) -> dict[str, Any]:
    """`{"properties.email": x}` -> `{"properties": {"email": x}}`.

    A dotted `as` means NESTING, and only a JSON body can nest -- in a form body
    that spelling already means a literal dotted key.
    """
    out: dict[str, Any] = {}

    for path, value in flat.items():
        parts = path.split(".")
        node = out

        for key in parts[:-1]:
            found = node.get(key)
            if not isinstance(found, dict):
                found = {}
                node[key] = found
            node = found

        node[parts[-1]] = value

    # The ROOT is always an object -- a JSON body's top level is never a list
    # -- so only its VALUES are converted. That also keeps the return type
    # honest: `_listify` returns Any, and returning it directly is a
    # no-any-return error under mypy --strict.
    return {key: _listify(value) for key, value in out.items()}


def _listify(node: Any) -> Any:
    """A mapping whose keys are 0, 1, 2 ... is an ARRAY, not an object.

    `dateRanges.0.startDate` has to become `[{...}]`. PHP produced the list by
    accident -- its integer-keyed arrays serialise as JSON arrays -- while
    TypeScript and Python produced `{"0": {...}}`, which the provider refuses
    as the wrong type. The parity suite is what caught the disagreement, and
    converting at the END keeps the walk above simple.
    """
    if not isinstance(node, dict):
        return node

    walked = {key: _listify(value) for key, value in node.items()}
    wanted = [str(index) for index in range(len(walked))]

    if walked and list(walked.keys()) == wanted:
        return [walked[key] for key in wanted]

    return walked