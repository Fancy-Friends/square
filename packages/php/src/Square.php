<?php

declare(strict_types=1);

namespace ParticleAcademy\Square;

use ParticleAcademy\Connectors\Mode;
use ParticleAcademy\Connectors\PreparedRequest;
use ParticleAcademy\Connectors\SandboxKind;
use ParticleAcademy\Connectors\ServiceDescriptor;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- square
 */
/**
 * Square, as one service descriptor shared by every Square operation.
 *
 * The PHP twin of the js package's `src/service.ts`.
 *
 * ## The sandbox trap, written down where it is used
 *
 * The one sandbox kind that is genuinely a DIFFERENT PLACE. Stripe's estate is
 * chosen by the key, Telegram's and HubSpot's by the account, SES's not at all
 * -- Square's is another host, with its own data and its own credentials. A
 * sandbox access token sent to the production host is refused rather than
 * silently reaching the real ledger, which makes this the SAFEST of the four
 * kinds and worth saying so: the failure mode is a 401, not a charge.
 */
final class Square
{
    // The connector API version this package was GENERATED against. A
    // literal, never imported: an imported constant lets an upgrade rewrite
    // the very claim it exists to detect.
    public const CONNECTOR_API_VERSION = 1;

    public const SERVICE = 'square';

    public const LIVE_URL = 'https://connect.squareup.com';
    public const SANDBOX_URL = 'https://connect.squareupsandbox.com';

    /** @var list<string> Credential keys a remote call cannot proceed without. */
    public const REQUIRES = [
        'accessToken',
    ];

    public static function descriptor(): ServiceDescriptor
    {
        return new ServiceDescriptor(
            service: self::SERVICE,
            title: 'Square',
            sandbox: SandboxKind::BaseUrl,
            baseUrls: [
                Mode::Live->value => self::LIVE_URL,
                Mode::Sandbox->value => self::SANDBOX_URL,
            ],
            requires: self::REQUIRES,
            authorize: self::authorize(...),
            faker: SquareFaker::respond(...),
        );
    }

    /**
     * Apply Square's auth scheme to an outgoing request.
     *
     *
     *
     * @param array<string,string> $credentials
     */
    public static function authorize(array $credentials, PreparedRequest $request, Mode $mode): void
    {
        $request->withHeader('Square-Version', '2026-08-19');

        $request->withHeader('Authorization', 'Bearer '.($credentials['accessToken'] ?? ''));
    }
}
