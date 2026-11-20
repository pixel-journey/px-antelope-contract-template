# Tips — the template's three small rules

Run `npm test` before reading EDUCATION answers. The C++ under `contracts/` is an uncompiled sketch.

## What this repo actually locks

| Rule | Fact |
| --- | --- |
| Ping | A missing row starts at **1**. `0xffffffff` throws `ping cap`. That cap is `2^32 - 1`, **not** the asset ceiling `2^62 - 1` |
| Names | `a-z`, `1-5`, and `.`, length 1–12, dot not first or last. A passing name is not `require_auth` |
| Notify | One `contract` string. True only when the handler **is** the token |
| Pause | Admin may set paused. `canUnpause` returns a boolean and does **not** clear the flag. A second pause does not throw |

## Do not copy these into a domain lab

- Do not paste `shouldHandleNotify` into a vault that is not the token contract. `pxblend` needs the token account and `self` as two names. [Hybrid blend](https://github.com/pixel-journey/px-blend-hybrid-ft-plus-nft).
- Do not treat template pause as a transfer gate. The real one throws `already paused` and refuses transfers: [pausable guard](https://github.com/pixel-journey/px-token-pausable-emergency-guard).
- Do not reuse `PING_CAP` as `MAX_AMOUNT`.
- Do not copy ping into every new repo. New labs copy the **layout** (README, EDUCATION, SECURITY, tests).

## Compiler honesty

The workflow file in this repo is not a recorded wasm. The educational CI repo has **two** image pins and zero recorded compiles: `px-ci-cdt-deterministic-compiler` (private; not this public course). Builds that actually exist live in `wax-contract-compiler` (private; not this public course).

## Common mistakes

1. Starting the counter at 0.
2. Using one helper for both `get_first_receiver()` and `get_self()` on a third-party escrow.
3. Assuming a paused template blocks `transfer`. Nothing here checks a transfer.
4. Calling the string `eosio.msig` a completed multisig proposal.
5. Quoting the educational CI tag as the tag that compiled `pxexample`.

## Related

[EDUCATION.md](EDUCATION.md) · [SECURITY.md](SECURITY.md) · `px-contract-examples-vault` (private; not this public course)
