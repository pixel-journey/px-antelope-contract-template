# Worked examples — template rules

Executed by `npm test` in this repo. Wasm SHAs below are **not** files in this repo. They are production runs in `wax-contract-compiler`.

## Ping counter

| Call | Result |
| --- | --- |
| `nextPings(null)` | `1` |
| `nextPings(4)` | `5` |
| `nextPings(4294967295)` | refused (uint32 max) |
| negative | refused |

Unsigned body: `client/ping-action.ts`. Building that object is not a broadcast.

Production mirror: `pxexample`, private compiler tree run 22, wasm prefix `dd1b7bf5526e…`. Not deployed.

## Notification hygiene

`shouldHandleNotify` is true only when this contract is the first receiver and the transfer is not outgoing from itself.

That helper is the wrong shape for a blend contract that must notice an incoming PXJ `transfer`. First-receiver checks and “ignore our own outgoing transfer” solve different bugs. See the vault learning-path exercise.

Production mirror: `pxnotify`, private compiler tree run 25, prefix `ab68a840ee26…`.

## Pause

| Actor | Pause | Unpause |
| --- | --- | --- |
| Admin | yes | yes |
| `eosio.msig` | no | yes |
| Anyone else | no | no |

Second pause while already paused stays paused (refused as a new pause). Unpause while live is refused.

Production mirror: `pxguard`, private compiler tree run 24, prefix `da54a7088823…`.

## What a fork should not copy blindly

Shared gates (names, bps, cooldown, nonce) belong in [px-invariant-kit](https://github.com/pixel-journey/px-invariant-kit), not as new files cloned out of this template into a one-check repo.
