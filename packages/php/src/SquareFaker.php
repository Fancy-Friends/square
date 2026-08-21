<?php

declare(strict_types=1);

namespace ParticleAcademy\Square;

use ParticleAcademy\Connectors\FakeRequest;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- square
 */
/**
 * The Square faker — the PHP twin of the js package's `src/faker.ts`.
 *
 * Bit-for-bit identical: the same FNV-1a seed and the same xorshift32
 * sequence, so a golden fixture asserts the exact faked payload and BOTH
 * runtimes have to produce it. That turns the faker into a parity test rather
 * than a convenience.
 */
final class SquareFaker
{
    /** @param array<string,mixed> $request */
    public static function respond(string $operation, array $request): mixed
    {
        /** @var array<string,mixed> $config */
        $config = $request['config'] ?? [];
        /** @var FakeValuesLike $fake */
        $fake = $request['fake'];

        return match ($operation) {
            'payment_create' => self::PaymentCreate($config, $fake),
            default => throw new \InvalidArgumentException(
                // A faker asked for an operation it has no shape for must SAY so.
                // Making something up would produce a green run whose output
                // silently has none of the fields the author is about to reference.
                'square: no fake response is defined for "'.$operation.'". '
                    .'Add a fixture under provider/fixtures/ and regenerate — a connector without a faker '
                    .'cannot be developed against, tested, or demonstrated.'
            ),
        };
    }

    /** @param array<string,mixed> $config */
    private static function PaymentCreate(array $config, mixed $fake): array
    {
        $boundAmount = ((($v = $config['amount'] ?? null) !== null && $v !== '') ? (int) $v : $fake->int(500, 25000));
        $boundCurrency = ((($v = $config['currency'] ?? null) !== null && $v !== '') ? (string) $v : 'USD');

        return [
        'payment' => [
            'id' => $fake->hex(22),
            'created_at' => '2026-01-01T00:00:00.000Z',
            'updated_at' => '2026-01-01T00:00:00.000Z',
            'amount_money' => [
                'amount' => $boundAmount,
                'currency' => $boundCurrency,
            ],
            'total_money' => [
                'amount' => $boundAmount,
                'currency' => $boundCurrency,
            ],
            'status' => 'COMPLETED',
            'source_type' => 'CARD',
            'location_id' => ((($v = $config['locationId'] ?? null) !== null && $v !== '') ? (string) $v : null),
            'customer_id' => ((($v = $config['customerId'] ?? null) !== null && $v !== '') ? (string) $v : null),
            'reference_id' => ((($v = $config['referenceId'] ?? null) !== null && $v !== '') ? (string) $v : null),
            'note' => ((($v = $config['note'] ?? null) !== null && $v !== '') ? (string) $v : null),
            'receipt_url' => 'https://squareup.com/receipt/preview/fake',
        ],
        'errors' => [],
    ];
    }
}
