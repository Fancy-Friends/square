# Square

Square for [fancy-flow][flow] — as **four imported, versioned packages**, one
per runtime. Not vendored source: a copy cannot be upgraded, and third-party APIs
change.

[flow]: https://github.com/Particle-Academy/fancy-flow

| Runtime | Package | Install |
|---|---|---|
| Authoring surface (every host) | `@particle-academy/square-ui` | `npm install @particle-academy/square-ui` |
| Node | `@particle-academy/square-js` | `npm install @particle-academy/square-js` |
| PHP 8.4+ | `particle-academy/square-php` | `composer require particle-academy/square-php` |
| Python 3.11+ | `fancy-square` | `pip install fancy-square` |

The `ui` package is the editor surface and is React on every host — a PHP or
Python project installs it *and* its own runtime package, and never the `js` one.

## What it costs you

One dependency: `@particle-academy/fancy-connector-core` (or
`particle-academy/fancy-connector-core` on Composer), which the `js` and `php`
packages pull in themselves. The Python package has **zero** runtime
dependencies.

**No Square SDK.** Plain HTTP, deliberately: a vendor SDK is third-party code
subject to the kit's full approval bar, and one per provider is hundreds of
dependencies nobody is tracking.

## Setting it up

Everything below is generated from `provider/manifest.json`, so it cannot disagree with what the packages do.

### Credentials

A Square connection holds 1 value.

Every value here is `account` scope: one per connected account, not one per installation.

| Field | Scope | Secret | Where it comes from |
|---|---|---|---|
| **Access token** | per connected account | **secret** | From the Square developer dashboard. SANDBOX and PRODUCTION tokens are different values for different hosts -- a sandbox token is refused by the production host rather than accepted, which is the whole reason this provider's estates cannot be confused. |

### The estate

Square has a separate test host. Selecting sandbox mode changes the base URL.

> The one sandbox kind that is genuinely a DIFFERENT PLACE. Stripe's estate is chosen by the key, Telegram's and HubSpot's by the account, SES's not at all -- Square's is another host, with its own data and its own credentials. A sandbox access token sent to the production host is refused rather than silently reaching the real ledger, which makes this the SAFEST of the four kinds and worth saying so: the failure mode is a 401, not a charge.

## What it can do

### Actions

#### `payment_create` — Take payment

Take a payment through Square.

`POST /v2/payments` · **unsafe to replay** — a retried durable run does it TWICE

| Input | Required | What it is |
|---|---|---|
| `sourceId` | yes | A payment token from the Web Payments SDK, a saved card id, or CASH / EXTERNAL. Square calls it source_id. |
| `amount` | yes | In the currency's smallest unit — 1000 is $10.00. Square has no decimal amounts, exactly like Stripe. |
| `currency` | no | Three-letter ISO code. Square wants it UPPERCASE, where Stripe wants it lowercase — the same field, opposite conventions. |
| `locationId` | no | Which of the seller's locations the payment belongs to. Square scopes almost everything by location. |
| `customerId` | no | Customer |
| `referenceId` | no | Your own id for this payment. The usual way to find it again later. |
| `note` | no | Note |

## Run it before you have credentials

Every operation ships a **faker**, whether or not Square has a sandbox. Set a
node's mode to `fake` and it returns the shape Square actually publishes — the
same field names, deterministically — so you can wire the downstream nodes before
touching an account, a key, or a network.

## This repository is generated

`provider/` is the source. Everything under `packages/` is emitted from it and
**must not be hand-edited** — CI regenerates and diffs on every push, and the
next protocol sync destroys anything it finds. See [`AGENTS.md`](AGENTS.md).

## Two namespaces, which do not match on purpose

The repo is `github.com/Fancy-Friends/square`; the packages publish under
`particle-academy`. Nothing derives one from the other — the names come from
weaver's `friends.json` and nowhere else.

## Licence

MIT.
