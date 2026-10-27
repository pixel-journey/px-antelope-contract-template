# px-antelope-contract-template

Scaffold for a Pixel Journey Tier B quest. This repository is **not** one of the 210 catalog entries.

Copy it when a quest needs its own WASM. Tier A quests do not: they orchestrate `eosio.token`, `atomicassets`, `orng.wax`, or a DEX and ship only a WharfKit client.

## Tree

```
contracts/src/px_template.cpp
contracts/include/
contracts/ricardian/
tests/invariants.spec.ts
client/wharfkit-demo.ts
.github/workflows/px-contract-build.yml
```

## Rules

See `CONTRACT-VAULT-STANDARD.md` in [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault). Short version:

1. Check `get_first_receiver()` on every token notify. Return when `from == get_self()`.
2. Multiply in `__int128`, then divide. `MAX_AMOUNT` is `2^62 - 1`.
3. The contract does not pay RAM unless a deposit covers it.
4. Inline action names are constants.
5. Entropy is `requestrand` now and `randnotify` later. Legacy `receiverand` calls `require_auth(orng.wax)`.
6. `setassetdata` writes the full mutable map.
7. A sell tax must not change the quantity a DEX pool is notified for.
8. Pause leaves an `eosio.msig` path. `setpaused` is authorized by the contract account, so a 2-of-3 msig can still unpause.

## Compile

Pinned image `ghcr.io/antelopeio/cdt:4.1.0`. Do not install CDT on the runner. The on-chain account is chosen at deploy and is not this repo name.

Private while the vector suite is open. MIT when published.
