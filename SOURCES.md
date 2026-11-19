# Sources

| Source | Why |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/build/) | Contract build and action format |
| [eosio.contracts](https://github.com/eosio/eosio.contracts) | `eosio.token` transfer notify; `eosio.msig` as a recovery actor |
| [Antelope CDT](https://github.com/AntelopeIO/cdt) | `cdt-cpp` |
| [wax-contract-compiler](https://github.com/pixel-journey/wax-contract-compiler) | Where `pxexample`, `pxnotify`, and `pxguard` were actually compiled |

CDT tag used by that pipeline: `waxteam/cdt:v5.0.3wax02-v4.1.0`. The educational workflow repo pins a **different** tag and has not recorded a compile. See [px-ci-cdt-deterministic-compiler](https://github.com/pixel-journey/px-ci-cdt-deterministic-compiler). Do not answer "which image?" with one string.

## What the tests lock, and what they are not

- Ping cap is `2^32 - 1`. Asset labs use `2^62 - 1`. Do not share one constant.
- `shouldHandleNotify` uses **one** contract string. A vault that is not the token needs two names. [Hybrid blend](https://github.com/pixel-journey/px-blend-hybrid-ft-plus-nft).
- `canUnpause` returns a boolean. It does not clear `paused`, and it does not block `transfer`. The transfer gate is [pausable](https://github.com/pixel-journey/px-token-pausable-emergency-guard).
- The string `eosio.msig` is not a completed proposal.
- **PXJ precision is always 8** in domain labs. This template does not issue PXJ.

Checklist of facts later labs must not collapse: [SECURITY.md](SECURITY.md).

Curriculum: [LEARNING-PATH](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/LEARNING-PATH.md).
