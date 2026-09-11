<?php

declare(strict_types=1);

namespace ParticleAcademy\Square\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\Connectors\Idempotency;
use ParticleAcademy\Square\Actions\PaymentCreate;
use ParticleAcademy\Square\Square;

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
 * Take payment, run on a fancy-flow-php host.
 *
 * The PHP twin of `squarePaymentCreateExecutor` in
 * @particle-academy/square-js: the same request, built from the node's config
 * by the same `Actions\PaymentCreate` a host would call directly, and the same
 * value on `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Square. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/square_payment_create',
    aliases: [
        'square_payment_create',
    ],
    category: 'io',
    label: 'Take payment',
    description: 'Take a payment through Square.',
    icon: '◫',
    inputs: [
        [
            'id' => 'in',
        ],
    ],
    outputs: [
        [
            'id' => 'out',
        ],
    ],
    sideEffects: 'unsafe-to-replay',
    outputShape: [
        [
            'path' => 'mode',
            'type' => 'string',
            'description' => 'Which estate this ran against: fake, sandbox or live.',
        ],
        [
            'path' => 'connection',
            'type' => 'string',
            'description' => 'The connection id that was used.',
        ],
        [
            'path' => 'data.payment.id',
            'type' => 'string',
            'description' => 'Square\'s payment id. NESTED under `payment` — Square wraps its responses where Stripe returns the object at the top level.',
        ],
        [
            'path' => 'data.payment.status',
            'type' => 'string',
            'description' => 'APPROVED, COMPLETED, CANCELED or FAILED.',
        ],
        [
            'path' => 'data.payment.amount_money.amount',
            'type' => 'number',
            'description' => 'Amount in the currency\'s smallest unit.',
        ],
        [
            'path' => 'data.payment.amount_money.currency',
            'type' => 'string',
            'description' => 'Three-letter ISO code, uppercase.',
        ],
        [
            'path' => 'data.payment.receipt_url',
            'type' => 'string',
            'description' => 'A hosted receipt Square generates for the buyer.',
        ],
        [
            'path' => 'data.errors',
            'type' => 'array',
            'description' => 'Present when Square accepted the request and refused the payment. Check it before treating a 200 as money taken.',
        ],
    ],
)]
final class PaymentCreateExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        // Derived from the RUN and the NODE, never fresh. A retried durable run
        // must send the same key or Square creates a second one — the exact
        // failure "unsafe-to-replay" exists to prevent. It travels in the BODY,
        // as `idempotency_key`, and is deliberately NOT also handed to the
        // client, which only knows how to send one as a header.
        $idempotencyKey = Idempotency::keyFor($ctx, $ctx->node->id, service: Square::SERVICE, operation: PaymentCreate::OPERATION);
        if ($idempotencyKey === null) {
            $ctx->emit(RunEvent::log('warn', PaymentCreate::OPERATION.': '.Idempotency::NO_KEY_WARNING, $ctx->node->id));
        }

        $result = ($this->client ?? new ConnectorClient)->call(
            Square::descriptor(),
            PaymentCreate::OPERATION,
            $config,
            [
                'method' => PaymentCreate::METHOD,
                'path' => PaymentCreate::PATH,
                'json' => PaymentCreate::body($config, $idempotencyKey),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'square payment_create'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
