<?php

declare(strict_types=1);

namespace ParticleAcademy\Square\Actions;

use ParticleAcademy\Square\Square;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
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
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Square or calls the faker.
 */
final class PaymentCreate
{
    public const OPERATION = 'payment_create';
    public const METHOD = 'POST';
    public const PATH = '/v2/payments';
    public const SIDE_EFFECTS = 'unsafe-to-replay';

    /**
     * Build the JSON body for one call.
     *
     * Validation fails loudly and specifically here, rather than three frames
     * later as an "invalid request" from Square.
     *
     * @param array<string,mixed> $config
     * An EMPTY body is `{}`, not `[]` — and PHP cannot tell those apart, because
     * both are `array()` and `json_encode` picks the list. So an empty one is
     * returned as an object. TypeScript and Python have no such ambiguity, which
     * is why this is a difference only the byte-parity suite can see.
     *
     * @return array<string,mixed>|\stdClass
     */
    public static function body(array $config, ?string $idempotencyKey): array|\stdClass
    {
        if ($idempotencyKey === null || $idempotencyKey === '') {
            throw new ConnectorConfigException(
                'payment_create: an idempotencyKey is required — derive it from the RUN and the STEP, '.
                'never fresh, or a retried run takes a second payment.'
            );
        }

        if (($config['sourceId'] ?? null) === null || ($config['sourceId'] ?? null) === '') {
            throw new ConnectorConfigException('payment_create: "sourceId" is required (Payment source).');
        }

        $amount = $config['amount'] ?? null;
        if (! (is_numeric($amount) && (float) $amount === floor((float) $amount) && (float) $amount >= 1)) {
            throw new ConnectorConfigException(
                'payment_create: "amount" must be a positive whole number in the currency\'s smallest unit (1000 = $10.00), got '.json_encode($amount).'.'
            );
        }

        $body = [];

        $value = $config['sourceId'] ?? null;
        $body['source_id'] = (string) $value;

        $value = $config['amount'] ?? null;
        $body['amount_money.amount'] = (int) $value;

        $value = $config['currency'] ?? null;
        $body['amount_money.currency'] = ($value !== null && $value !== '') ? strtoupper((string) $value) : 'USD';

        $value = $config['locationId'] ?? null;
        if ($value !== null && $value !== '') {
            $body['location_id'] = (string) $value;
        }

        $value = $config['customerId'] ?? null;
        if ($value !== null && $value !== '') {
            $body['customer_id'] = (string) $value;
        }

        $value = $config['referenceId'] ?? null;
        if ($value !== null && $value !== '') {
            $body['reference_id'] = (string) $value;
        }

        $value = $config['note'] ?? null;
        if ($value !== null && $value !== '') {
            $body['note'] = (string) $value;
        }

        $body['idempotency_key'] = $idempotencyKey;

        $body = self::nestFields($body);
        $body = $body === [] ? new \stdClass() : $body;
        return $body;
    }

    /**
     * `['properties.email' => x]` -> `['properties' => ['email' => x]]`.
     *
     * A dotted `as` means NESTING, and only a JSON body can nest — in a form
     * body that spelling already means a literal dotted key.
     *
     * @param  array<string,mixed>  $flat
     * @return array<string,mixed>
     */
    private static function nestFields(array $flat): array
    {
        $out = [];

        foreach ($flat as $path => $value) {
            $parts = explode('.', (string) $path);
            $node = &$out;

            while (count($parts) > 1) {
                $key = array_shift($parts);

                if (! isset($node[$key]) || ! is_array($node[$key])) {
                    $node[$key] = [];
                }

                $node = &$node[$key];
            }

            $node[$parts[0]] = $value;
            unset($node);
        }

        return $out;
    }
}
