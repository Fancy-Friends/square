<?php

declare(strict_types=1);

use ParticleAcademy\Square\SquareFaker;
use ParticleAcademy\Connectors\FakeValues;

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
 * The golden fixtures — the SAME values the TypeScript and Python packages
 * assert.
 *
 * Bit-for-bit identical is the claim, and this is what checks it.
 * Cross-runtime drift does not fail loudly on its own: it completes, down one
 * path, with no error.
 */

it('payment_create fakes the shape Square publishes', function () {
    $config = [
        'currency' => 'USD',
    ];
    $fake = new FakeValues(FakeValues::seedForCall('square', 'payment_create', $config));

    $faked = SquareFaker::respond('payment_create', ['config' => $config, 'fake' => $fake]);

    // Through JSON and back, because a faked EMPTY object is a stdClass — the only
    // PHP value that spells `{}` on the wire — and `toBe` compares objects by
    // identity. This asserts the VALUES; the `{}`-versus-`[]` spelling is what
    // weaver's cross-runtime parity suite asserts, byte for byte.
    $faked = json_decode((string) json_encode($faked), true, 512, JSON_THROW_ON_ERROR);

    expect($faked)->toBe([
        'payment' => [
            'id' => '2b698c4346ddc75338ccd1',
            'created_at' => '2026-01-01T00:00:00.000Z',
            'updated_at' => '2026-01-01T00:00:00.000Z',
            'amount_money' => [
                'amount' => 22938,
                'currency' => 'USD',
            ],
            'total_money' => [
                'amount' => 22938,
                'currency' => 'USD',
            ],
            'status' => 'COMPLETED',
            'source_type' => 'CARD',
            'location_id' => null,
            'customer_id' => null,
            'reference_id' => null,
            'note' => null,
            'receipt_url' => 'https://squareup.com/receipt/preview/fake',
        ],
        'errors' => [],
    ]);
});

it('throws for an operation with no fixture rather than inventing a shape', function () {
    $fake = new FakeValues(FakeValues::seedForCall('square', 'no_such_operation', []));

    expect(fn () => SquareFaker::respond('no_such_operation', ['config' => [], 'fake' => $fake]))
        ->toThrow(InvalidArgumentException::class);
});
