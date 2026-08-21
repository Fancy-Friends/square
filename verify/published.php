<?php

declare(strict_types=1);

/*
 * Square — the published Composer package.
 *
 * GENERATED — do not edit. Fix weaver's template/ and regenerate.
 *
 * This runs against the PUBLISHED package, installed by name from the
 * registry into a project that has never seen this repo. Every other test
 * here imports from ../src and therefore cannot see the packaging.
 */

$autoload = getcwd().'/vendor/autoload.php';

if (! is_file($autoload)) {
    fwrite(STDERR, 'No vendor/autoload.php in '.getcwd().PHP_EOL);
    fwrite(STDERR, 'Run this from a project that has composer-required the published package:'.PHP_EOL);
    fwrite(STDERR, '    composer require particle-academy/square-php'.PHP_EOL);
    exit(2);
}

require $autoload;

use ParticleAcademy\Connectors\FakeValues;
use ParticleAcademy\Square\SquareFaker;

$goldens = [
    [
        'operation' => 'payment_create',
        'config' => [
            'currency' => 'USD',
        ],
        'expected' => [
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
        ],
    ],
];

foreach ($goldens as $golden) {
    $operation = $golden['operation'];
    $config = $golden['config'];

    $fake = new FakeValues(FakeValues::seedForCall('square', $operation, $config));
    $faked = SquareFaker::respond($operation, ['config' => $config, 'fake' => $fake]);

    if ($faked !== $golden['expected']) {
        fwrite(STDERR, "the PUBLISHED package produced different bytes for {$operation}\n");
        fwrite(STDERR, '  got:      '.json_encode($faked)."\n");
        fwrite(STDERR, '  expected: '.json_encode($golden['expected'])."\n");
        exit(1);
    }

    echo "  ok   {$operation}\n";
}

echo "\n  ".count($goldens)." operations verified against the published package.\n";
