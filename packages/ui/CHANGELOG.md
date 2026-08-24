# Changelog

All notable changes to `@particle-academy/square-ui`, `@particle-academy/square-js`,
`particle-academy/square-php` and `fancy-square`.

The four packages share one version, because they are generated from one
`provider/` definition and a version that meant something different in each
would be a version nobody could reason about.

## [0.2.0] — 2026-08-24

### Changed

- **`@particle-academy/square-ui` is now an OPTIONAL PEER dependency of `@particle-academy/square-js`, not a hard one.**

`./flow` needs it; nothing else does. It was a hard dependency, and because
`@particle-academy/square-ui` itself peer-depends on `fancy-flow` — which npm 7+ installs
automatically — `npm install @particle-academy/square-js` pulled the **entire flow engine**
onto disk for a consumer who only wanted to call the API. Roughly **18 MB
became 874 KB**, and the package works exactly as before:

```js
import { square… } from "@particle-academy/square-js";
// an injected transport, no flow engine anywhere
```

**This is breaking if you use `@particle-academy/square-js/flow`.** Add `@particle-academy/square-ui` to your own
dependencies — it was always being installed for you, and now it is declared.
Everything importing only the main entry point is unaffected.

The fix is on this edge rather than on `@particle-academy/square-ui` → `fancy-flow`: the ui package
genuinely requires fancy-flow, since it calls `defineConnectorKind`, and marking
that peer optional would be a lie about what it needs.

## [0.1.0] — 2026-08-21

First release. Provider six, and the direct contrast to Stripe.

### Added

- `payment_create` — take a payment. `POST /v2/payments`.
- A faker for it, so the node runs on a canvas with no Square account.

### Why Square, when Stripe is already here

The same domain, the same operation, the same money — and a different answer to
almost every mechanical question. That contrast is the reason it was chosen:

| | Stripe | Square |
|---|---|---|
| Sandbox | the **key** decides | a different **host** |
| Idempotency | a **header** | a required **body field** |
| Response | the object at the top level | wrapped under `payment` |
| Currency | lowercase | UPPERCASE |
| Body | form-encoded | JSON |

Every fact is read from Square's own OpenAPI document
(`square/connect-api-specification`), not from memory.

### `base-url` — the safest sandbox kind, and the first one used

`connect.squareup.com` and `connect.squareupsandbox.com` are genuinely
different places, with their own data and their own credentials. That makes
this the **safest** of the four sandbox kinds and it is worth saying why: a
sandbox token sent to the production host is **refused**, where Stripe's estate
is chosen by the key and a live key pointed at a node marked "sandbox" reaches
the real ledger and succeeds. The failure mode here is a 401, not a charge.

### The idempotency key is a body field, and that is not cosmetic

Square lists `idempotency_key` as REQUIRED alongside `source_id`. Every
provider before this one that supported idempotency took the key in a header,
so the generator had exactly one place to put one — and with only a header
available it would have had to either drop the key or send one Square does not
read. The first charges twice; the second charges twice and looks correct.

The key is now written into the body, is **not** forwarded to the connector
core (there is no header for it, and implying one would be worse than sending
nothing), and the action **refuses before sending** when none is supplied —
where Square would otherwise answer three frames later in its own words.

Derive it from the RUN and the STEP, never fresh. That is what turns "never
retry" into "retry safely".

### A 200 is not necessarily money taken

`CreatePaymentResponse` carries `errors` alongside `payment`. It is in the
output shape rather than left to be discovered.

[0.1.0]: https://github.com/Fancy-Friends/square/releases/tag/v0.1.0
[0.2.0]: https://github.com/Fancy-Friends/square/releases/tag/v0.2.0
